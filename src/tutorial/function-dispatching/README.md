# Function Dispatching
関数ディスパッチは、Huff の契約にとって基本的なものです。Solidity や Vyper とは異なり、Huff は関数のディスパッチを抽象化しません。この節では、他の言語ではディスパッチがどのように行われるのか、そして Huff ではどのように行うのかを説明します。

## What is the problem?
evmでは、コントラクトはメッセージを送信することによって対話します。ABI標準は、これらのメッセージをエンコードするための標準的な方法として存在し、関数への入力がどのようにエンコードされるべきかを扱います。この厳格なルールにより、コントラクトは互いに理解しあえるのです。また、ABI標準は、メッセージがどの関数と相互作用するつもりなのかをコントラクトに伝えます。これは、メッセージの最初に4バイトのセレクタをエンコードすることで行われます。この4バイトのセレクタは、関数の署名文字列の`keccak`の最初の4バイトです。例えば、"myFunction(address,uint256) "という文字列のkeccak256ハッシュは`0x451c00ddd225deee9948ba5eca26042a5ea1cc0980e5a5fb0a057f90567af5e0`である。つまり、最初の4バイトの`0x451c00dd`がSolidityが関数のシグネチャとして使用するものです。Solidity でインターフェースを書いたことがある人は、現在のコントラクトに、外国のコントラクトの 4 バイトのセレクタを生成する機能を提供しているだけだということに気づかないかもしれません。

この後は、線形ディスパッチと二分探索ディスパッチの2種類のディスパッチについて詳しく説明します。

## Linear Dispatching
上記を読んで、あるいは以前に Huff のコントラクトを読んで、ディスパッチを実行する最もシンプルな方法は - 線形ルックアップであるという直感を身につけたかもしれません。この方法は、calldata メッセージから関数セレクタを抽出し、それをコントラクト内の他の関数と総当り的に比較します。

以下の例は、標準的なERC20トークンに対する線形ディスパッチャの外観を示したものです。

```huff

// Interface
#define function allowance(address,address) view returns (uint256)
#define function approve(address,uint256) nonpayable returns ()
#define function balanceOf(address) view returns (uint256)
#define function DOMAIN_SEPARATOR() view returns (bytes32)
#define function nonces(address) view returns (uint256)
#define function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) nonpayable returns ()
#define function totalSupply() view returns (uint256)
#define function transfer(address,uint256) nonpayable returns ()
#define function transferFrom(address,address,uint256) nonpayable returns ()
#define function decimals() nonpayable returns (uint256)
#define function name() nonpayable returns (string)
#define function symbol() nonpayable returns (string)

// Function Dispatching
#define macro MAIN() = takes (1) returns (1) {
    // Identify which function is being called.
    0x00 calldataload 0xE0 shr          // [func_sig]

    dup1 __FUNC_SIG(permit)             eq permitJump           jumpi
    dup1 __FUNC_SIG(nonces)             eq noncesJump           jumpi

    dup1 __FUNC_SIG(name)               eq nameJump             jumpi
    dup1 __FUNC_SIG(symbol)             eq symbolJump           jumpi
    dup1 __FUNC_SIG(decimals)           eq decimalsJump         jumpi
    dup1 __FUNC_SIG(DOMAIN_SEPARATOR)   eq domainSeparatorJump  jumpi

    dup1 __FUNC_SIG(totalSupply)        eq totalSupplyJump      jumpi
    dup1 __FUNC_SIG(balanceOf)          eq balanceOfJump        jumpi
    dup1 __FUNC_SIG(allowance)          eq allowanceJump        jumpi

    dup1 __FUNC_SIG(transfer)           eq transferJump         jumpi
    dup1 __FUNC_SIG(transferFrom)       eq transferFromJump     jumpi
    dup1 __FUNC_SIG(approve)            eq approveJump          jumpi

    // Revert if no match is found.
    0x00 dup1 revert

    allowanceJump:
        ALLOWANCE()
    approveJump:
        APPROVE()
    balanceOfJump:
        BALANCE_OF()
    decimalsJump:
        DECIMALS()
    domainSeparatorJump:
        DOMAIN_SEPARATOR()
    nameJump:
        NAME()
    noncesJump:
        NONCES()
    permitJump:
        PERMIT()
    symbolJump:
        SYMBOL()
    totalSupplyJump:
        TOTAL_SUPPLY()
    transferFromJump:
        TRANSFER_FROM()
    transferJump:
        TRANSFER()
}
```
ハフコントラクトのほぼすべてで使用する、非常に重要なコードがあります。

```huff
0x00 calldataload 0xE0 shr
```
これは4バイトのファンクションセレクタをスタックにロードします。`0x00 calldataload` は 0 から始まる 32 バイトをスタックにロードします（calldata が 32 バイト未満の場合、ゼロで右詰めされます）。`0xE0 shr` は calldata を 224 ビット右シフトし、スタックに 24 ビット（4 バイト）残します。

これはかなり単純なアプローチに見えますが、ほとんどの契約では、これが最も効果的であることが多いのです。これはひとつの大きな `if` `else if` チェーンなので、チェーンの先頭に「ホットファンクション」を配置することで最適化することができます。前方にある関数は呼び出しにかかるガス量が少なくなりますが、関数がチェーンの末端に近づくにつれ、本当に高くつくので注意が必要です。

この方法は素朴に見えますが、VyperやSolidity*が線形ディスパッチを実装する方法と全く同じです。もし、より安く呼び出したいのであれば、コントラクトの上位に移動させればいいだけです。

\* Solidity は、コントラクトに含まれる関数が 4 つ以下の場合にのみ、このメソッドを実装します。

実装マクロの後に続く一連のジャンプラベルは何を意味するのか、不思議に思うかもしれません。良いメンタルモデルは、コントラクトの全体が MAIN マクロの中に存在することです。マクロが MAIN 内で参照されていない場合、または MAIN 内で呼び出されるマクロの中にネストされている場合、そのマクロはコントラクトに含まれないことになります。実際には、上記のコントラクトをコンパイルすると、次のようになります。

```
0x[dispatcher]<allowanceJumpLabel>[ALLOWANCE MACRO]<approveJumpLabel>[APPROVE MACRO]<balanceOfJump>[BALANCE_OF MACRO] ... <transferFromLabel>[TRANSFER_FROM MACRO]<transferJump>[TRANSFER MACRO]
```
Huffでは、すべてのマクロが1つの長いバイトコード文字列にインライン化されます(これはVyperとSolidityにも当てはまります!)。この性質上、トップレベルのマクロはすべて何らかのエスケープコード(`return`, `stop`, `revert`)で終了させることが重要である。これをしないと、マクロ *WILL* は、リターン条件が見つかるまで、次にインライン化されたマクロを実行し続けます。

例えば、こんな感じです。

```huff
#define function returnOne() public returns(uint256)
#define function returnTwo() public returns(uint256)

/// @notice returns the value one
#define macro RETURN_ONE() = {
    0x01 0x00 mstore
    0x20 0x00 return
}

/// @notice places the value 2 onto the stack
#define macro RETURN_TWO() = {
    0x02
}

#define macro MAIN() = {
    0x00 calldataload 0xE0 shr

    // Dispatcher
    dup1 __FUNC_SIG(returnOne) eq returnOneJump jumpi
    dup1 __FUNC_SIG(returnTwo) eq returnTwoJump jumpi

    // Macros
    returnTwo:
        RETURN_TWO()
    returnOne:
        RETURN_ONE()
}
```
上記のマクロでは、どのようなメッセージが送られてきても、常に値1を返します。マクロ `RETURN_TWO` は終了しないので、`RETURN_ONE` の実行にロールオーバーされ、値 1 を返して終了します。有効でない関数のシグネチャから保護するためのガードがないため、たとえディスパッチャの何もマッチしないメッセージであっても、値1を返します。

有効な関数セレクタが見つからない場合の対処法として、ディスパッチャとマクロのジャンプラベルの間に`0x00 0x00 revert`を挿入して、次のようにします。

```huff
#define macro MAIN() = {
    0x00 calldataload 0xE0 shr

    dup1 __FUNC_SIG(returnOne) eq returnOneJump jumpi
    dup1 __FUNC_SIG(returnTwo) eq returnTwoJump jumpi

    0x00 0x00 revert

    returnTwo:
        RETURN_TWO()
    returnOne:
        RETURN_ONE()
}
```
ハフ契約書を書くときは、この動作に注意してください。特に管理機能を扱うときは、`SET_OWNER()`マクロに遭遇すると、誰でもあなたの契約書をコントロールできるようになる可能性があります。ハフの「継承」パターンで使われるマクロ呼び出しロジックを飛び越える、より高度な方法がありますが、それは別のセクションで説明します。

## Binary Search Dispatching
関数ディスパッチングのもう一つの方法は、正しいセレクタを見つけるためにバイナリサーチを行うことです。これは、ディスパッチコストをより予測しやすく、安定させることができるため、 多くの関数を持つコントラクトに最適です (`if esle` チェーンのすべての分岐をチェックする必要はありません)。この方法では、関数セレクタをケチャック順に並べ、目的の関数に到達するまで、いくつかのジャンプポイントを軸に回転させます。ジャンプポイントの数は自由です。ジャンプポイントを増やせば増やすほど、ジャンプの値段は安定しますが、比較のためのガソリン代に注意が必要です。一般に、各スプリットには16〜18バイトのコードが追加されます（各ピボットポイントからジャンプがあることを忘れないでください）。

この方法を実行するには、関数セレクタを手作業で計算し、順番を決める必要があります。しかし、心配はいりません。これはスクリプトで簡単に行うことができます。

ここでは、バイナリ検索ディスパッチの実装例を示します。

```huff

// Define Interface
#define function allowance(address,address) view returns (uint256)
#define function approve(address,uint256) nonpayable returns ()
#define function balanceOf(address) view returns (uint256)
#define function DOMAIN_SEPARATOR() view returns (bytes32)
#define function nonces(address) view returns (uint256)
#define function permit(address,address,uint256,uint256,uint8,bytes32,bytes32) nonpayable returns ()
#define function totalSupply() view returns (uint256)
#define function transfer(address,uint256) nonpayable returns ()
#define function transferFrom(address,address,uint256) nonpayable returns ()
#define function decimals() nonpayable returns (uint256)
#define function name() nonpayable returns (string)
#define function symbol() nonpayable returns (string)

// Function Dispatching
#define macro MAIN() = takes (1) returns (1) {
    // Identify which function is being called.
    // [func sig]
    0x00 calldataload 0xE0 shr

    // The function selector of the pivot (number of selectors / 2)
    dup1 __FUNC_SIG(balanceOf) lt pivot0 jumpi

        // pivot 2
        dup1 __FUNC_SIG(totalSupply) lt pivot00 jumpi

            // 1
            dup1 __FUNC_SIG(name)               eq nameJump             jumpi

            // 2
            dup1 __FUNC_SIG(approve)            eq approveJump          jumpi

            // 3
            dup1 __FUNC_SIG(totalSupply)        eq totalSupplyJump      jumpi

            not_found jump

        pivot00:

            // 4
            dup1 __FUNC_SIG(transferFrom)       eq transferFromJump     jumpi

            // 5
            dup1 __FUNC_SIG(decimals)           eq decimalsJump         jumpi

            // 6
            dup1 __FUNC_SIG(DOMAIN_SEPARATOR)   eq domainSeparatorJump  jumpi

            not_found jump

    pivot0:

        dup1 __FUNC_SIG(symbol) lt pivot11 jumpi


            // 7
            dup1 __FUNC_SIG(balanceOf)          eq balanceOfJump        jumpi

            // 8
            dup1 __FUNC_SIG(nonces)             eq noncesJump           jumpi

            // 9
            dup1 __FUNC_SIG(symbol)             eq symbolJump           jumpi

            not_found jump

        pivot11:

            // 10
            dup1 __FUNC_SIG(transfer)           eq transferJump         jumpi

            // 11
            dup1  __FUNC_SIG(permit)             eq permitJump           jumpi

            // 12
            dup1 __FUNC_SIG(allowance)          eq allowanceJump        jumpi

    not_found:

    // Revert if no match is found.
    0x00 dup1 revert

    allowanceJump:
        ALLOWANCE()
    approveJump:
        APPROVE()
    balanceOfJump:
        BALANCE_OF()
    decimalsJump:
        DECIMALS()
    domainSeparatorJump:
        DOMAIN_SEPARATOR()
    nameJump:
        NAME()
    noncesJump:
        NONCES()
    permitJump:
        PERMIT()
    symbolJump:
        SYMBOL()
    totalSupplyJump:
        TOTAL_SUPPLY()
    transferFromJump:
        TRANSFER_FROM()
    transferJump:
        TRANSFER()
}
```
## Fallback functions
solidityでは、fallbackとreceiveという2つの特殊な関数があります。どちらもハフで実装するのは比較的簡単です。

フォールバックを実装するには、ディスパッチロジックの末尾にマクロを配置するだけです。例えば、次のフォールバック関数は常に値1を返します。

```huff
#define macro FALLBACK() = {
    0x01 0x00 mstore
    0x20 0x00 return
}
```
フォールバックとしてこれを実装するには、スイッチケースを使い切った後にこれを投げるだけでよい。

```huff
#define macro MAIN() = takes (1) returns (1) {
    // Identify which function is being called.
    // [func sig]
    0x00 calldataload 0xE0 shr

    dup1 __FUNC_SIG(permit)             eq permitJump           jumpi

    ...

    dup1 __FUNC_SIG(approve)            eq approveJump          jumpi

    FALLBACK()

   permitJump:
        PERMIT()

    ...

    approveJump:
        APPROVE()
}
```
フォールバックマクロとレシーブマクロの両方を実装したい場合は、以下のようにすることができます。

```huff
#define macro MAIN() = takes (1) returns (1) {
    // Identify which function is being called.
    // [func sig]
    0x00 calldataload 0xE0 shr

    dup1 __FUNC_SIG(permit)             eq permitJump           jumpi

    ...

    dup1 __FUNC_SIG(approve)            eq approveJump          jumpi

    # Jump into the receive function if msg.value is not zero
    callvalue receive jumpi

    FALLBACK()

    receive:
        RECEIVE()

    permitJump:
        PERMIT()

    ...

    approveJump:
        APPROVE()
}
```
