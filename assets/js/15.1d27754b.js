(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{443:function(t,e,r){"use strict";r.r(e);var a=r(66),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"huff-project-template"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#huff-project-template"}},[t._v("#")]),t._v(" Huff Project Template")]),t._v(" "),r("p",[t._v("Huff has a "),r("a",{attrs:{href:"https://github.com/huff-language/huff-project-template",target:"_blank",rel:"noopener noreferrer"}},[t._v("project template"),r("OutboundLink")],1),t._v(" to make it easier to get started writing Huff contracts!")]),t._v(" "),r("h2",{attrs:{id:"using-the-template"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#using-the-template"}},[t._v("#")]),t._v(" Using the Template")]),t._v(" "),r("p",[t._v("After navigating to https://github.com/huff-language/huff-project-template, you can click the "),r("a",{attrs:{href:"https://github.com/huff-language/huff-project-template/generate",target:"_blank",rel:"noopener noreferrer"}},[t._v("Use this template"),r("OutboundLink")],1),t._v(" button on the top right of the repository to create a new repository containing all of the template's code.")]),t._v(" "),r("p",[t._v("Once you've cloned and entered into your repository, you need to install the necessary dependencies. In order to do so, simply run:")]),t._v(" "),r("div",{staticClass:"language-bash extra-class"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[t._v("forge "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n")])])]),r("p",[t._v("Then, you can build and/or run tests with the following commands:")]),t._v(" "),r("div",{staticClass:"language-bash extra-class"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[t._v("forge build\nforge "),r("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),r("p",[t._v("Inside the template, there is a contract in the "),r("code",[t._v("src/")]),t._v(" directory (the default location for huff contracts) called "),r("code",[t._v("src/SimpleStore.huff")]),t._v(".  This contract demonstrates a simple contract to set and get values stored in the contract, with the functions being (as defined by the function annotations at the top of the contract):")]),t._v(" "),r("div",{staticClass:"language-solidity extra-class"},[r("pre",{pre:!0,attrs:{class:"language-solidity"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("setValue")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("uint256")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("getValue")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("view")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("returns")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("uint256")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),r("p",[t._v("Inside the "),r("code",[t._v("test/")]),t._v(" directory, there are tests for the "),r("code",[t._v("src/SimpleStore.huff")]),t._v(" contract in "),r("code",[t._v("test/SimpleStore.t.sol")]),t._v(". Since "),r("a",{attrs:{href:"https://github.com/foundry-rs/foundry",target:"_blank",rel:"noopener noreferrer"}},[t._v("Foundry"),r("OutboundLink")],1),t._v(" doesn't natively support compiling huff code, huff projects have to use the "),r("a",{attrs:{href:"https://github.com/huff-language/foundry-huff",target:"_blank",rel:"noopener noreferrer"}},[t._v("foundry-huff"),r("OutboundLink")],1),t._v(" library to be able to compile huff code using "),r("code",[t._v("forge")]),t._v(" commands.")]),t._v(" "),r("p",[r("em",[t._v("NOTE: In order to compile huff code, foundry-huff behind the scenes need the "),r("a",{attrs:{href:"https://github.com/huff-language/huff-rs",target:"_blank",rel:"noopener noreferrer"}},[t._v("huff compiler"),r("OutboundLink")],1),t._v(" to be installed.")])]),t._v(" "),r("p",[t._v("Returning back to our test contract "),r("code",[t._v("test/SimpleStore.t.sol")]),t._v(", we can run the following command to run all tests: "),r("code",[t._v("forge test")]),t._v(".")]),t._v(" "),r("h2",{attrs:{id:"other-template-features"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#other-template-features"}},[t._v("#")]),t._v(" Other Template Features")]),t._v(" "),r("p",[t._v("Once you have created a new repository from the "),r("a",{attrs:{href:"https://github.com/huff-language/huff-project-template",target:"_blank",rel:"noopener noreferrer"}},[t._v("project template"),r("OutboundLink")],1),t._v(", there are a few things to note before digging in and writing your huff contracts.")]),t._v(" "),r("p",[t._v("The "),r("a",{attrs:{href:"https://github.com/huff-language/huff-project-template/blob/main/foundry.toml",target:"_blank",rel:"noopener noreferrer"}},[t._v("foundry.toml"),r("OutboundLink")],1),t._v(" file located in the root of the project template, contains the configuration for using the "),r("code",[t._v("forge")]),t._v(" toolchain.")]),t._v(" "),r("p",[t._v("Inside "),r("a",{attrs:{href:"https://github.com/huff-language/huff-project-template/tree/main/.github/workflows",target:"_blank",rel:"noopener noreferrer"}},[t._v("./.github/workflows"),r("OutboundLink")],1),t._v(" there is a github action file that will run CI using the "),r("a",{attrs:{href:"https://github.com/foundry-rs/foundry-toolchain",target:"_blank",rel:"noopener noreferrer"}},[t._v("Foundry toolchain"),r("OutboundLink")],1),t._v(" and the "),r("a",{attrs:{href:"https://github.com/huff-language/huff-toolchain",target:"_blank",rel:"noopener noreferrer"}},[t._v("huff-toolchain"),r("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);e.default=n.exports}}]);