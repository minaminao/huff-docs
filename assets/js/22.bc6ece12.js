(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{451:function(t,e,a){"use strict";a.r(e);var r=a(66),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"testing-huff-with-foundry"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#testing-huff-with-foundry"}},[t._v("#")]),t._v(" Testing Huff with Foundry")]),t._v(" "),a("p",[t._v("Huffはコマンドラインツールでコンパイルできますが、Foundryを使用してコードをテストすることもできます。"),a("a",{attrs:{href:"https://github.com/foundry-rs/foundry",target:"_blank",rel:"noopener noreferrer"}},[t._v("Foundry"),a("OutboundLink")],1),t._v("は、Ethereumアプリケーション開発用の超高速、ポータブル、モジュラーなツールキットです。Foundryを使用すると、コントラクトを簡単にコンパイルし、コードの安全性を確認するための堅牢なユニットテストを記述することができます。これは、コードの自動安全性チェックがあまりないハフコントラクトでは特に重要です。")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/huff-language/foundry-huff",target:"_blank",rel:"noopener noreferrer"}},[t._v("foundry-huff"),a("OutboundLink")],1),t._v("ライブラリを介して、両者を併用することができます。")]),t._v(" "),a("h2",{attrs:{id:"utilizing-foundry-huff"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#utilizing-foundry-huff"}},[t._v("#")]),t._v(" Utilizing Foundry-Huff")]),t._v(" "),a("p",[t._v("既存のFoundryプロジェクトがある場合は、実行することで必要な依存関係を簡単にインストールすることができます。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("forge "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" huff-language/foundry-huff\n")])])]),a("p",[t._v("また、契約をコンパイルするために、foundry-huffライブラリがあなたの環境にアクセスできるように、"),a("code",[t._v("foundry.toml")]),t._v("ファイルに次の行を追加する必要があります。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("ffi "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n")])])]),a("p",[t._v("そして、"),a("code",[t._v("deploy")]),t._v("機能を使って、"),a("code",[t._v("HuffDeployer")]),t._v("コントラクトでハフコントラクトをコンパイルし、デプロイしてもらうことができます。以下は簡単な例です。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" HuffDeployer "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"foundry-huff/HuffDeployer.sol"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\ncontract HuffDeploymentExample "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deploy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" external "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("returns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("address")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HuffDeployer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deploy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MyContract"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Foundryの使い方は、"),a("a",{attrs:{href:"https://github.com/foundry-rs/foundry/tree/master/forge",target:"_blank",rel:"noopener noreferrer"}},[t._v("Foundry Github Repository"),a("OutboundLink")],1),t._v("と"),a("a",{attrs:{href:"https://book.getfoundry.sh/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Foundry Book"),a("OutboundLink")],1),t._v("をご覧ください。")]),t._v(" "),a("h2",{attrs:{id:"using-the-project-template"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-the-project-template"}},[t._v("#")]),t._v(" Using the Project Template")]),t._v(" "),a("p",[t._v("ゼロから新しいプロジェクトを立ち上げるなら、"),a("a",{attrs:{href:"https://github.com/huff-language/huff-project-template",target:"_blank",rel:"noopener noreferrer"}},[t._v("project template"),a("OutboundLink")],1),t._v("を使えばいいのです。")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.huff.sh/get-started/project-quickstart/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.huff.sh/get-started/project-quickstart/"),a("OutboundLink")],1),t._v("のプロジェクト・テンプレートの使い方を確認します。")])])}),[],!1,null,null,null);e.default=s.exports}}]);