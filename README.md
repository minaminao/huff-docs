<img align="right" width="150" height="150" top="100" src="./src/.vuepress/public/huff.png">

# huff-docs • [![Netlify Status](https://api.netlify.com/api/v1/badges/ca51353d-d673-49b9-b07c-2547fdc9de9b/deploy-status)](https://app.netlify.com/sites/huffdocs/deploys) ![License](https://img.shields.io/github/license/huff-language/huff-docs) ![Version](https://img.shields.io/github/package-json/v/huff-language/huff-docs)
> [Huff](https://github.com/huff-language) 言語ドキュメントを[Vuepress](https://vuepress.vuejs.org/)で構築し、[docs.huff.sh](https://docs.huff.sh)で展開したもの。

## Usage
`yarn build`を実行して、vuepressサイトを構築します。

ローカルにサイトを実行する場合は、`yarn dev`を実行します。

[src/README.md](./src/README.md)では、サイトのトップページが定義されています。[src](./src/)の各サブディレクトリは、サイトのページを表します。

**New Pages**

新しいページを追加するには、ページの内容を[src](./src/)サブディレクトリに書き込む必要があります。これは`https://docs.huff.sh/<page-name>`でページをホストしますが、ナビバーに項目を作成しません。新しいページをナビバーに追加するには、[src/.vuepress/config.js](./src/.vuepress/config.js)にあるVuepress設定ファイルにエントリを追加する必要があります。

ページスタイルと総合サイトスタイルは、[src/.vuepress/styles/](./src/.vuepress/styles/)で定義することができます。

