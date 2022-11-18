# Simple Storage
これまでの 2 つの例では、calldata からバイトを切り出し、メモリに格納し、値を返すということを検討してきました。次に、すべてのEVM開発者が恐れているパズルの欠けた部分、ストレージに取り組みます。

## Storage in Huff
Huffは`FREE_STORAGE_POINTER()`キーワードを使ってストレージ変数の追跡を抽象化しているので、ストレージを扱うのはそれほど複雑ではありません。以下にその例を示します。

```
#define constant STORAGE_SLOT0 = FREE_STORAGE_POINTER()
#define constant STORAGE_SLOT1 = FREE_STORAGE_POINTER()
#define constant STORAGE_SLOT2 = FREE_STORAGE_POINTER()
```
ストレージスロットは、コントラクトがその状態を保持する非常に大きな配列の単なるキーです。コンパイラはコンパイル時に`STORAGE_SLOT0`に`0`、`STORAGE_SLOT1`に`1`などの値を代入します。コード全体では、どの言語でも定数が使われるのと同じように、ストレージスロットを参照するだけです。

## Setting storage
まず、`FREE_STORAGE_POINTER()`キーワードを使用して、ストレージスロットを表す定数を定義します。

```
#define constant VALUE = FREE_STORAGE_POINTER()
```
`[VALUE]`のように角括弧で囲むことで、コード全体でこのスロットを参照することができます。以下の例では、スロット [VALUE] に値 5 を格納するマクロを例示しています。

```
#define macro SET_5() = takes(0) returns(0) {
    0x5             // [0x5] 
    [VALUE]         // [value_slot_pointer, 0x5]
    sstore          // []
}
```
インタラクティブにテストする [here](https://www.evm.codes/playground?unit=Wei&codeType=Bytecode&code='6005600055'_) ([VALUE]は0にハードコードされています)

## Reading from storage
これで、ストレージへの書き込み方法がわかったので、ストレージからの読み出しは簡単です。`sstore` を `sload` に置き換えるだけで、準備は完了です。これから、上の例を拡張して、ストレージへの書き込みと読み込みの両方を行うことにします。

```
#define macro SET_5_READ_5() = takes(0) returns(0) {
    0x5
    [VALUE]
    sstore

    [VALUE]
    sload
}
```
いいねーもう一度、[evm.codes](https://www.evm.codes/playground?unit=Wei&codeType=Bytecode&code='6005600055600054'_) でテストしてみましょう。`sload` 命令を実行した後、スタック上に 5 が再び現れることに注目してください。

## Simple Storage Implementation
これでストレージへの読み書きができるようになったので、remix の有名な SimpleStorage スターターコントラクトを試してみましょう。

まず、インターフェイスを作成しましょう。

```
#define function setValue(uint256) nonpayable returns ()
#define function getValue() nonpayable returns (uint256)
```
次に、ストレージスロットを定義します。

```
#define constant VALUE = FREE_STORAGE_POINTER()
```
さて、いよいよロジックです。addTwoの例で、`calldataload`オペコードを使って32バイトのチャンクでデータを読むことができたことを思い出してください。

```
#define macro SET_VALUE() = takes(0) returns(0) {
    // Read uint256 from calldata, remember to read from byte 4 to allow for the function selector! 
    0x04            // [0x04]
    calldataload    // [value]

    // Get pointer and store
    [VALUE]         // [value_ptr, value]
    sstore          // []
}
```
これまでの例題を終えて、Huff の書き方がわかってきたと思います。このパターンは、独自のコントラクトを書くときに、calldata から値を読み、メモリやストレージに値を格納するときに非常によく使われます。

次は、格納されている値の読み出しです。

```
#define macro GET_VALUE() = takes(0) returns(0) {
    // Read uint256 from storage
    [VALUE]         // [value_ptr]
    sload           // [value]

    // Store the return value in memory
    0x00            // [0x00, value]
    mstore          // []

    // Return the first 32 bytes of memory containing our uint256
    0x20            // [0x20]
    0x00            // [0x00, 0x20]
    return          // []
}
```
まず、先ほどの例と同様の手法で記憶値を読み取ります。戻り値をメモリに格納して準備します。そして、その値をメモリから返します。まとまってきましたね〜。

外部関数から新しいマクロを呼び出すには、ディスパッチャを作成する必要があります。

```
#define macro MAIN() = takes(0) returns(0) {
    
    // Get the function selector
    0x00 calldataload 0xe0 shr

    dup1 0x55241077 eq setValue jumpi // Compare function selector to setValue(uint256)
    dup1 0x20965255 eq getValue jumpi // Compare the function selector to getValue()

    // dispatch
    setValue:
        SET_VALUE()
    getValue:
        GET_VALUE()

    0x00 0x00 revert
}
```
今度は全部一緒に!

```
// Interface
#define function setValue(uint256) nonpayable returns ()
#define function getValue() nonpayable returns (uint256)

// Storage
#define constant VALUE = FREE_STORAGE_POINTER()

// External function macros

// setValue(uint256)
#define macro SET_VALUE() = takes(0) returns(0) {
    // Read uint256 from calldata, remember to read from byte 4 to allow for the function selector! 
    0x04            // [0x04]
    calldataload    // [value]

    // Get pointer and store
    [VALUE]         // [value_ptr, value]
    sstore          // []
}

// getValue()
#define macro GET_VALUE() = takes(0) returns(0) {
    // Read uint256 from storage
    [VALUE]         // [value_ptr]
    sload           // [value]

    // Store the return value in memory
    0x00            // [0x00, value]
    mstore          // []

    // Return the first 32 bytes of memory containing our uint256
    0x20            // [0x20]
    0x00            // [0x00, 0x20]
    return          // []
}

// Main
#define macro MAIN() = takes(0) returns(0) {
    // Get the function selector
    0x00 calldataload 0xe0 shr

    dup1 __FUNC_SIG(setValue) eq setValue jumpi // Compare function selector to setValue(uint256)
    dup1 __FUNC_SIG(getValue) eq getValue jumpi // Compare the function selector to getValue()

    // dispatch
    setValue:
        SET_VALUE()
    getValue:
        GET_VALUE()

    0x00 0x00 revert
}
```
おめでとうございます。あなたは、Huffでコントラクトを書くための殻を乗り越えたのです。次のステップとしては、addTwo, "Hello, World!", SimpleStorageでこれまでに学んだことを、[Foundry](https://docs.huff.sh/tutorial/huff-testing/)のようなテストフレームワークに取り入れることをお勧めします。それでは、ハッキングを楽しんでください。

