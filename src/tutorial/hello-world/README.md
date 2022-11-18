# Hello, world!
注：このセクションは、['The Basics'](/tutorial/the-basics/)の続きです。もし、まだお読みになっていないようでしたら、続ける前にご覧になることをお勧めします。

---
['The Basics'](/tutorial/the-basics/)の中で、`"Hello, world!"`がハフにとってかなり高度な概念であることを述べました。というのも、EVMの中で文字列がどのようにエンコードされるかを理解しておく必要があるからです。

## Primer: ABI Encoding
文字列は動的な型であるため、`"Hello, world!"` (`0x48656c6c6f2c20776f726c6421`) の UTF-8 値を返すというような単純なものではありません。ABI規格では、動的型は3つの部分に分けてエンコードされ、それぞれが1ワード（32バイト）のメモリを使用します。

1. ダイナミックデータのオフセット。(ダイナミックデータ開始へのポインタ, uint256)

2. ダイナミックデータの長さ。(uint256)

3. ダイナミックデータの値です。（動的長さ）

各パーツは、文字列`"Hello, world!"`に対して以下のようになります。

```
Memory loc      Data
0x00            0000000000000000000000000000000000000000000000000000000000000020 // The location of the "Hello, world!" data
0x20            000000000000000000000000000000000000000000000000000000000000000d // The length of "Hello, world!" in bytes
0x40            48656c6c6f2c20776f726c642100000000000000000000000000000000000000 // Value "Hello, world!"
```
## Implementation
次の`MAIN`マクロは、このエンコードをわかりやすくステップアップするものです。

```

#define macro MAIN() = takes(0) returns(0) {
    // store dynamic offset of 0x20 at 0x00
    0x20                                     // [0x20]
    0x00                                     // [0x00, 0x20]
    mstore                                   // []

    // store string length of 0x0d at 0x20
    0x0d                                     // [0x0d]
    0x20                                     // [0x20, 0x0d]
    mstore                                   // []

    // store bytes for "Hello, world!" at 0x40
    __RIGHTPAD(0x48656c6c6f2c20776f726c6421) // ["Hello, world!"]
    0x40                                     // [0x40, "Hello, world!"]
    mstore                                   // []

    // return full 96 byte value
    0x60                                     // [0x60]
    0x00                                     // [0x00, 0x60]
    return                                   // []
}

```
この例では、[evm.codes playground](https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code='v20~0z~0d~2zws32t48656c6c6f2c20776f726c6421yyyyyyu~4z~60~uwRETURN'~wvz0wMSTOREwyuuuw%5Cnvs1tu00t%200xsPUSH%01stuvwyz~_)でどのようにメモリが設定され、何が返されるかをインタラクティブに見ることができます。

## Advanced topic - The Seaport method of returning strings
前の例では、3つの隣接するワード（それぞれ32バイト）がメモリに保存されていることに注意してください。1番目のワードはオフセットで、2番目のワードは長さです。すべての値がそうであるように、これら2つの単語は左詰めにされています。3番目のワードはバイトなので右詰めにされています。メモリスキーマでは、長さとバイトは隣り合っていることに注意してください。長さ "0d "はメモリロケーション0x3Fにあり、"Hello, world!"の最初のバイト0x48は0x40に格納されています。

長さ(`0x0d`)とバイト数(`0x48656c6c6f2c20776f726c6421`)をとって連結すると、次のようになる。`0x0d48656c6c6f2c20776f726c6421`となり、左詰めの値となる。

```
0x000000000000000000000000000000000000000d48656c6c6f2c20776f726c6421
```
ここで、2番目のワードを`0x20`から始めるのではなく、13バイト分オフセットすると（`0x20`の代わりに`0x2d`から始める）、`0d`が2番目のワードの右端（最下位）ビット（位置0x3F）に収まり、残りのバイトは3番目のワードの左端（最上位）バイト（位置0x40）からすぐに始まるように整列します。

これはハフではよくある手法で、[Seaport's \_name() function](https://github.com/ProjectOpenSea/seaport/blob/fb1c3bf4c25a32ae90f776652a8b2b07d5df52cf/contracts/Seaport.sol#L95-L108)でも話題になった。

ここでは、「TKN」という文字列を使った「Seaport」方式を図解しています。

![The "Seaport" method](../../.vuepress/public/Seaport.png)

