# The Basics
## Installation
Huffを書き始める前に、コンパイラをインストールする必要があります。[getting started](https://docs.huff.sh/get-started/overview/)に移動して、手順に従ってインストールしてください。
完了したら、ここに戻って来てください!

## What you are going to learn?
他のプログラミング言語と違って、"Hello, world!" を返すハフコントラクトを作るのは、かなり高度なことです。ここでは、2つの数字を足すハフコントラクトを作る方法を学びます（その後、"Hello, world!）
エディタを開いて、`addTwo.huff`というファイルを作ってください。さあ、はじめましょう。

## Add Two
### ABI declaration
まずはじめに。SolidityやVyperのような高級言語から来た人は、「外部」または「公開」関数の定義に慣れていると思います。これらは、ABI (Application Binary Interface) を生成することによって、コントラクトと外部で対話することを可能にします。これは、外部ツールに対するコントラクトのエントリーポイントを記述するものです（これについては後で詳しく説明します）。この点ではHuffは全く同じで、ファイルの一番上のabiに表示される関数を宣言することができます。

```Huff
#define function addTwo(uint256, uint256) view returns(uint256)
```
先に進んで、上記の例を`addTwo.huff`の先頭に貼り付けてください。これは、2つの`uint256`入力を受け取り、1つの`uint256`を返す関数を宣言しています。

### The Main Macro
次に作成するのは、`MAIN macro`です。これはハフコントラクトの単一のエントリポイントとして機能します。コントラクトへのすべての呼び出しは(どのような関数を呼び出しているかに関わらず)、`MAIN` から始まることになります!この例では、calldata から 2 つの `uint256` を読み込み、その結果を返す `MAIN` 関数を定義する。

```Huff
#define macro MAIN() = takes(0) returns(0) {
    0x00 calldataload     // [number1] // load first 32 bytes onto the stack - number 1
    0x20 calldataload     // [number2] // load second 32 bytes onto the stack - number 2
    add                   // [number1+number2] // add number 1 and 2 and put the result onto the stack

    0x00 mstore           // place [number1 + number2] in memory
    0x20 0x00 return      // return the result
}
```
上の図を見ると、最初は戸惑うかもしれませんが、我慢してください。

MAIN 命令が `takes(0) returns(0)` で注釈されていることに気がつくでしょう。EVMはスタックベースの仮想マシン（参照：[Understanding the EVM](https://docs.huff.sh/tutorial/evm-basics/)）なので、すべてのマクロ宣言には、スタックから`take`するアイテムの数と完了時に`return`する量がアノテーションされています。契約に入るとき、スタックは空である。完了時にはスタックに何も残さないので、take と return は共に 0 になる。

先に、上記のマクロを`addTwo.huff`ファイルにコピーしておいてください。`huffc addTwo.huff --bytecode`を実行します。

おめでとうございます！最初の契約がまとまりましたね。

コンパイラのバイトコード出力は、コンソールに次のようにエコーされます `600f8060093d393df36000356020350160005260206000f3`.

このコントラクトコードをデプロイすると、先ほど作成したメインマクロのランタイムバイトコードが含まれます!上記のスニペットでは、最初の `f3` の後にあります (前のバイトコードはボイラープレートのコンストラクタのロジックです)。
つまり、次のようになります。`6000356020350160005260206000f3`
以下、この例では作成したものを分解しています。

```
 BYTECODE          MNEMONIC         STACK                 ACTION
 60 00          // PUSH1 0x00       // [0x00]
 35             // CALLDATALOAD     // [number1]          Store the first 32 bytes on the stack
 60 20          // PUSH1 0x20       // [0x20, number1]
 35             // CALLDATALOAD     // [number2, number1] Store the second 32 bytes on the stack
 01             // ADD              // [number2+number1]  Take two stack inputs and add the result
 60 00          // PUSH1 0x00       // [0x0, (n2+n1)]
 52             // MSTORE           // []                 Store (n2+n1) in the first 32 bytes of memory
 60 20          // PUSH1 0x20       // [0x20]
 60 00          // PUSH1 0x00       // [0x00, 0x20]
 f3             // RETURN           // []                 Return the first 32 bytes of memory
```
もし自分で実行したい場合は、このスニペットを[evm.codes](https://www.evm.codes/playground?unit=Wei&codeType=Bytecode&code='~3560203501~526020~f3'~6000%01~_)で対話的にチェックすることができます（calldata `0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002`を渡してRUNをクリックすると開始されます）。この calldata は数字 1 と 2 で、両方とも 32 バイトにパディングされています。このスニペットを実行すると、`0000000000000000000000000000000000000000000000000000000000000003`という戻り値が得られるはずです。これは期待通りです。`addTwo.huff`は1番と2番を足して3番を返すことに成功しました!もしあなたがアセンブリに慣れていないなら、個々の命令を視覚化することが学習に非常に役立つので、これを実行することを強くお勧めします。

次のセクションでは、2 + 3 の calldata が提供されたと仮定して、コントラクトの実行を説明する。uint256（32バイト）にエンコードすると、2は`0000000000000000000000000000000000000000000000000000000000000002`に、3は`0000000000000000000000000000000000000000000000000000000000000003`になる。

これを図にすると、下の表のようになります。

|Type|Value|As calldata|
|-|-|-|
|uint256|2|0000000000000000000000000000000000000000000000000000000000000002|
|uint256|3|0000000000000000000000000000000000000000000000000000000000000003|

この2つを組み合わせることで、以下のようなcalldataをコントラクトに送ることになる。

```
0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003
```
### Execution Walk Through
***Line 1:*** `0x00 calldataload`

この行は calldata の最初の 32 バイトをスタックに読み取ります。`calldataload` オペコードはスタックから calldata のオフセットを入力として受け取り、そのオフセットから 32 バイトをスタックに返します。

*Stack after operation:* `[2]`

---
***Line 2:*** `0x20 calldataload`

同様に、2行目ではcalldataの2番目の32バイトを読み込んでいます。16進数の`0x20`（32）をトリガーの`calldataload`に押し付けることで、このようになります。

*Stack after operation:* `[3,2]`

---
***Line 3:*** `add`

3 行目では、add オペコードを呼び出しています。これは、スタックから上位 2 つの項目を入力として受け取り、それら 2 つの数値の合計を返します。入力が `[3,2]` の場合、結果は `[5]` になります。

*Stack after operation* `[5]`

---
***Lines 4 and 5***
コントラクトの残りの部分は、結果を返すことに関係しています。EVMコントラクトは、現在の実行メモリフレーム内に格納されている値のみを返すことができます。これは、returnオペコードが2つの値を入力として受け取るためである。復帰を開始するメモリのオフセットと、復帰するメモリの長さです。
この場合、`return`オペコードは`[0x00, 0x20]`を消費する。つまり、0バイトから始まる32バイトのメモリを消費します。

これは、`0x00 mstore`が何のためにあるのかを説明しています。`mstore` はスタックから 2 つのアイテムを取り、`[location_in_memory, value]` とします。この例では`[0x00, 0x5]`があり、これは値5をメモリに格納します。

---
### Interacting with this contract externally
前述したように、EVMコントラクトは、どの関数を呼び出すべきかを決定するためにABIを使用します。現在、addTwoの実行と対話する人は、線形であり、1つの機能しか許可しません。ほとんどのコントラクトは、複数の関数を持ちたいと思うでしょう。これに対応するために、私たちは少し再構築する必要があるでしょう。

コントラクトのABI仕様では、コントラクトの呼び出しは、呼び出しに4バイト（関数セレクタ）を付加することによって、どの関数を呼び出したいかを選択することになっている。この4バイトは、関数のABI定義のケチャックの先頭からスライスされています。例えば、`addTwo(uint256,uint256)`のファンクションセレクタは`0x0f52d66e`になります（[`cast`](https://book.getfoundry.sh/cast/)の`sig`コマンドなどのコマンドラインツールや、[keccak256 online](https://emn178.github.io/online-tools/keccak_256.html)などのオンラインサイトで確認することができます）。もし、これらがどのようなものか興味があれば、[4 byte directory](https://www.4byte.directory/)に一般的な4バイトのファンクションセレクタのレジストリが掲載されています。

ファンクションセレクタを毎回計算するのは面倒なことです。そこで、huff には `__FUNC_SIG()` という組み込み関数が用意されています。ファイルの現在のスコープ内で関数インターフェイスが宣言されていれば、その関数セレクタを計算してインライン化してくれるのです。huffの組み込み関数についての詳細は[here](/get-started/huff-by-example/#func-sig-func-def-string)を参照してください。

#### Modifying our contract to accept external function calls
複数の関数の外部呼び出しを受け入れるには、`addTwo` のロジックを別のマクロに抽出する必要があります。次に、`MAIN` マクロを関数ディスパッチャに変換します。

```Huff
#define function addTwo(uint256,uint256) view returns(uint256)

#define macro MAIN() = takes(0) returns(0) {

    // Get the function selector
    0x00
    calldataload
    0xE0
    shr

    // Jump to the implementation of the ADD_TWO function if the calldata matches the function selector
    __FUNC_SIG(addTwo) eq addTwo jumpi

    addTwo:
        ADD_TWO()
}

#define macro ADD_TWO() = takes(0) returns(0) {
    0x04 calldataload     // load first 32 bytes onto the stack - number 1
    0x24 calldataload     // load second 32 bytes onto the stack - number 2
    add                   // add number 1 and 2 and put the result onto the stack

    0x00 mstore           // place the result in memory
    0x20 0x00 return      // return the result
}
```
最初に行う変更は、ADD_TWO マクロの中で行われます。これは calldata の値の前に 4 バイトの関数セレクタを付加するためです。

`MAIN` マクロが大きく変わりました。
最初の 4 行は、関数セレクタを calldata から切り離すことに関係しています。

1. `0x00` が `[0]` をスタックにプッシュ

2. `calldataload` は `[0]` を入力とし、最初の 32 バイトの calldata をスタックにプッシュする。

3. `0xE0` は `[224]` をスタックにプッシュします。このマジックナンバーは256ビット-32ビット(28バイト)を表しています。

4. この後shrを実行すると、calldataが28バイトシフトされ、関数セレクタがスタックに配置されます。

次の行は、スタック上の関数セレクタにマッチして、そのコードのある場所にジャンプします。ジャンプロジックの生成はすべてHuffが行ってくれます。

ADD_TWO()マクロのバイトコードは、メインマクロのADD_TWO()にインライン化されることになります。

これで、エーテルなどのライブラリや、他のコントラクトを呼び出すことができるようになるはずです

これで、ハフを始めるために必要な主要コンセプトと定型文のすべてを理解していただけたと思います

次は、「Hello, world！」という文字列を返すコントラクトを作ることで、より高度なHuffに飛び込んでいきましょう！（笑）。

