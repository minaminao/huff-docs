# Testing Huff with Foundry
Huffはコマンドラインツールでコンパイルできますが、Foundryを使用してコードをテストすることもできます。[Foundry](https://github.com/foundry-rs/foundry)は、Ethereumアプリケーション開発用の超高速、ポータブル、モジュラーなツールキットです。Foundryを使用すると、コントラクトを簡単にコンパイルし、コードの安全性を確認するための堅牢なユニットテストを記述することができます。これは、コードの自動安全性チェックがあまりないハフコントラクトでは特に重要です。

[foundry-huff](https://github.com/huff-language/foundry-huff)ライブラリを介して、両者を併用することができます。

## Utilizing Foundry-Huff
既存のFoundryプロジェクトがある場合は、実行することで必要な依存関係を簡単にインストールすることができます。

```shell
forge install huff-language/foundry-huff
```
また、契約をコンパイルするために、foundry-huffライブラリがあなたの環境にアクセスできるように、`foundry.toml`ファイルに次の行を追加する必要があります。

```shell
ffi = true
```
そして、`deploy`機能を使って、`HuffDeployer`コントラクトでハフコントラクトをコンパイルし、デプロイしてもらうことができます。以下は簡単な例です。

```javascript
import { HuffDeployer } from "foundry-huff/HuffDeployer.sol";

contract HuffDeploymentExample {
    function deploy() external returns(address) {
        return new HuffDeployer().deploy("MyContract");
    }
}
```
Foundryの使い方は、[Foundry Github Repository](https://github.com/foundry-rs/foundry/tree/master/forge)と[Foundry Book](https://book.getfoundry.sh/)をご覧ください。

## Using the Project Template
ゼロから新しいプロジェクトを立ち上げるなら、[project template](https://github.com/huff-language/huff-project-template)を使えばいいのです。

[https://docs.huff.sh/get-started/project-quickstart/](https://docs.huff.sh/get-started/project-quickstart/)のプロジェクト・テンプレートの使い方を確認します。

