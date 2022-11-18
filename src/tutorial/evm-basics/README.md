# Understanding the EVM
Ethereum Virtual Machine、略してEVMは、Ethereumの頭脳である。その名の通り計算エンジンであり、Microsoftの.NET Frameworkの仮想マシンや、Javaなど他のバイトコードコンパイルされたプログラミング言語のインタプリタに似ている。

EVMは、スマートコントラクトの展開と実行を制御するEthereumプロトコルの一部です。これは、数百万の実行可能なもの（コントラクト）を持つグローバルな分散型コンピュータに例えることができ、それぞれが独自の永久的なデータストアを備えています。

<p align="center"><img src="/evm.png" width="640px"/></p>

<figcaption align = "center"><b>Fig.1 - EVM from <i>Ethereum EVM Illustrated</i> by Takenobu T.</b></figcaption>

## Technical
> ***NOTE:*** このチュートリアルは、Solidity にある程度慣れていて、したがってコントラクト、ステート、外部呼び出しなど、Ethereum 開発の基本を理解していることを前提にしています...

### The Stack
EVMは、1024項目の深さを持つスタックマシンとして動作します。各アイテムは256ビットワード（32バイト）で、これは256ビット暗号との互換性から選択されました。EVMはスタックベースのVMであるため、通常、データを先頭にPUSHし、データをPOPし、ADDやMULなどの命令を先頭にあるいくつかの値に適用します。

<p align="center"><img src="https://i.imgur.com/q6iEY7Z.png" width="640px"/></p>

<figcaption align = "center"><b>Fig.2 - Push/Pop Example from <i> "Playdate with the EVM"</i> by Femboy Capital</b></figcaption>

以下は、スタックへのプッシュとスタックからのポップの例です。左側では、ある要素 `e` がスタックの一番上に押し出され、右側では `e` がそこから取り除かれる、つまり「ポップ」される様子を示しています。

`e` はスタックにプッシュされた最後の要素ですが (その前に a, b, c, d があります)、pop が発生すると最初に削除される要素であることに注意することが重要です。これは、スタックは **LIFO** (Last In, First Out) の原則に従っており、最後に追加された要素が、最初に削除される要素になるためです。

<p align="center"><img src="https://i.imgur.com/SYJBUBS.png" width="640px"/></p>

<figcaption align = "center"><b>Fig.3 - MUL Opcode Example from <i> "Playdate with the EVM"</i> by Femboy Capital</b></figcaption>

オペコードはしばしばスタック要素を入力として使用し、常に先頭の（最も最近追加された）要素を取 ります。上の例では、`a`、`b`、`c`、`d` からなるスタックから始めます。`MUL` オペコード（スタックの一番上にある 2 つの値を乗算する）を使用すると、`c` と `d` はスタックからポップされ、その積に置き換えられます。

### Memory and Calldata
EVMでは、メモリは拡張可能なバイトアドレスの1次元配列と考えることができます。最初は空っぽです。
読み出し、書き込み、拡張にガスがかかります。一方、Calldataは非常によく似ていますが、拡張や上書きができません。
拡張や上書きができません。これはトランザクションのペイロードに含まれ、コントラクトコールの入力として機能する。

256ビットロード＆ストア。

* メモリやcalldataからの読み込みは、常に与えられたポインタの後の最初の256ビット（32バイトまたは1ワード）をアクセスします。

* メモリへの格納は、常に与えられたポインタの後の最初の256ビット（32バイトまたは1ワード）にバイトを書き込みます。

メモリとcalldataは永続的ではなく、揮発性です。
忘れ去られる。

<p align="center"><img src="/memory.png" width="640px"/></p>

<figcaption align = "center"><b>Fig.4 - Memory from <i>Ethereum EVM Illustrated</i> by Takenobu T.</b></figcaption>

#### Mnenomic Example
```plaintext
PUSH2 0x1000 // [0x1000]
PUSH1 0x00   // [0x00, 0x1000]
MSTORE       // []
// Memory: 0x0000000000000000000000000000000000000000000000000000000000001000

PUSH1 0x05   // [0x05]
PUSH1 0x20   // [0x20, 0x05]
MSTORE       // []
// Memory: 0x00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000005

PUSH1 0x00
MLOAD        // [0x1000]
PUSH1 0x20
MLOAD        // [0x05, 0x1000]
```
### Storage
Ethereum上のすべてのコントラクトアカウントは、Key-Valueストア内にデータを永続的に保存することができます。コントラクトストレージ
トランザクションが実行された後、すべてのイーサリアムノードはそれに応じてコントラクトのストレージトライを更新しなければならないため、メモリよりも読み取りと書き込みに多くのコストがかかります。
それに応じてコントラクトのストレージトライを更新する必要があるためです。

メモリでやったような1次元の大きな配列を想像するのではなく、256bitのようなストレージを考えることができる→「256bit Map
256ビットマップのように考えることができます。32バイトのキーサイズにより、合計`2^256`個のストレージスロットが存在します。

<p align="center"><img src="/contract_acc.png" width="320px"/></p>

<figcaption align = "center"><b>Fig.5 - Contract Account from <i>Ethereum EVM Illustrated</i> by Takenobu T.</b></figcaption>

#### Mnenomic Example
```plaintext
PUSH32 0xdEaDbEeFdEaDbEeFdEaDbEeFdEaDbEeFdEaDbEeFdEaDbEeFdEaDbEeFdEaDbEeF // [dead_addr]
PUSH1 0x00                                                                // [0x00, dead_addr]
SSTORE                                                                    // []

PUSH32 0xC0FFEE0000000000000000000000000000000000000000000000000000000000 // [coffee_addr]
PUSH1 0x01                                                                // [0x01, coffee_addr]
SSTORE                                                                    // []

// Storage:
// 0x00 -> deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef
// 0x01 -> c0ffee0000000000000000000000000000000000000000000000000000000000

PUSH1 0x00
SLOAD                                                                     // [dead_addr]
PUSH1 0x01
SLOAD                                                                     // [coffee_addr, dead_addr]
```
---
EVMの詳細については、ドキュメントの[Resources](../../resources/overview/#other-resources)セクションを参照してください。

もし、この中に混乱するものがあっても、心配しないでください。EVMについての本を読めば基本はわかりますが、実際にアセンブリを書くことが、EVMのコツをつかむ一番の方法です（そして一番楽しいです）。それでは、簡単なプロジェクトを見てみましょう。

