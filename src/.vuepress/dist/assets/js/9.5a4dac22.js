(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{443:function(t,e,a){"use strict";a.r(e);var n=a(66),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"getting-started"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[t._v("#")]),t._v(" Getting started")]),t._v(" "),a("p",[t._v("Huff is a low-level programming language designed for developing highly optimized smart contracts that run on the Ethereum Virtual Machine (EVM). Huff does not hide the inner workings of the EVM and instead exposes its programming stack to the developer for manual manipulation.")]),t._v(" "),a("p",[t._v("The "),a("a",{attrs:{href:"https://aztec.network/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Aztec Protocol"),a("OutboundLink")],1),t._v(" team created Huff to write "),a("a",{attrs:{href:"https://github.com/aztecprotocol/weierstrudel/tree/master/huff_modules",target:"_blank",rel:"noopener noreferrer"}},[t._v("Weierstrudel"),a("OutboundLink")],1),t._v(", an on-chain elliptical curve arithmetic library that requires incredibly optimized code that neither "),a("a",{attrs:{href:"https://docs.soliditylang.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Solidity"),a("OutboundLink")],1),t._v(" nor "),a("a",{attrs:{href:"https://docs.soliditylang.org/en/latest/yul.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Yul"),a("OutboundLink")],1),t._v(" could provide.")]),t._v(" "),a("p",[t._v("While EVM experts can use Huff to write highly-efficient smart contracts for use in production, it can also serve as a way for beginners to learn more about the EVM.")]),t._v(" "),a("p",[t._v("If you're looking for an in-depth tutorial on how to install, understand, and write Huff, check out the "),a("RouterLink",{attrs:{to:"/tutorial/overview/"}},[t._v("tutorial")]),t._v(".")],1),t._v(" "),a("h2",{attrs:{id:"command-line-quickstart"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#command-line-quickstart"}},[t._v("#")]),t._v(" Command-line quickstart")]),t._v(" "),a("p",[t._v("If you plan on using Huff from the command-line, use the "),a("code",[t._v("huffc")]),t._v(" package. "),a("code",[t._v("huffc")]),t._v(" can be installed using "),a("a",{attrs:{href:"https://docs.npmjs.com/downloading-and-installing-node-js-and-npm",target:"_blank",rel:"noopener noreferrer"}},[t._v("NPM"),a("OutboundLink")],1),t._v(". You'll also need "),a("a",{attrs:{href:"https://www.npmjs.com/package/ts-node#overview",target:"_blank",rel:"noopener noreferrer"}},[t._v("Typescript"),a("OutboundLink")],1),t._v(" and "),a("a",{attrs:{href:"https://www.npmjs.com/package/ts-node#overview",target:"_blank",rel:"noopener noreferrer"}},[t._v("TS-Code"),a("OutboundLink")],1),t._v(" installed.")]),t._v(" "),a("p",[t._v("Here's how to create the contract bytecode to output "),a("em",[t._v("Hello, World!")]),t._v(" in Huff.")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Install Huff globally using NPM:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -g huffc\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Create a file called "),a("code",[t._v("hello-world.huff")]),t._v(" and enter the following content:")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("#define "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("uint256"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("uint256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("returns")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("uint256"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n#define macro "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("MAIN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("takes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("returns")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Load our numbers from calldata and add them together.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x04")]),t._v(" calldataload "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [number1]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x24")]),t._v(" calldataload "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [number2]")]),t._v("\nadd               "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [number1+number2]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Return our new number.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x00")]),t._v(" mstore "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Store our number in memory.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x20")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x00")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Return it.")]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Use "),a("code",[t._v("huffc")]),t._v(" to compile the contract and output bytecode:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("huffc hello-world.huff --bytecode\n")])])]),a("p",[t._v("This will output something like:")]),t._v(" "),a("div",{staticClass:"language-plaintext extra-class"},[a("pre",{pre:!0,attrs:{class:"language-plaintext"}},[a("code",[t._v("6100168061000d6000396000f36c48656c6c6f2c20776f726c6421600052601a6000f3\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"hardhat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hardhat"}},[t._v("#")]),t._v(" Hardhat")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://hardhat.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Hardhat"),a("OutboundLink")],1),t._v(" is a development environment for compiling, deploying, testing, and debugging smart contracts. Hardhat lets you automatically compile your contracts, write and run unit tests, deploy to mainnet, and much more.")]),t._v(" "),a("p",[t._v("We highly recommend using Hardhat when working with Huff. It makes managing your contracts much easier and will save you lots of time. From this point forward, "),a("strong",[t._v("the rest of the documentation assumes that you are using Hardhat")]),t._v(".")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("Before we get started, you need to ensure you have the latest "),a("em",[t._v("Long-term support")]),t._v(" (LTS) version of Node.js installed. We recommend using "),a("a",{attrs:{href:"https://github.com/nvm-sh/nvm",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node Version Manager (NVM)"),a("OutboundLink")],1),t._v(" to easily switch between Node.js versions.")])]),t._v(" "),a("ol",[a("li",[a("p",[t._v("Create a new repository using the "),a("a",{attrs:{href:"https://github.com/huff-language/huff-project-template",target:"_blank",rel:"noopener noreferrer"}},[t._v("huff-language/huff-project-template"),a("OutboundLink")],1),t._v(" template on GitHub.")])]),t._v(" "),a("li",[a("p",[t._v("Clone your repository and install the packages:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("USERNAME"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("/"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("PROJECT_NAME"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("PROJECT_NAME"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Compile the contracts within this project:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("npx hardhat compile\n")])])]),a("p",[t._v("This command should output something like:")]),t._v(" "),a("div",{staticClass:"language-plaintext extra-class"},[a("pre",{pre:!0,attrs:{class:"language-plaintext"}},[a("code",[t._v("Nothing to compile\nPulling Huff version 0.0.17\nCompiling contracts/Number.huff\n")])])])]),t._v(" "),a("li",[a("p",[t._v("Run the tests to check that the contract does what it's designed to:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("npx hardhat "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),a("p",[t._v("This command should output something like:")]),t._v(" "),a("div",{staticClass:"language-plaintext extra-class"},[a("pre",{pre:!0,attrs:{class:"language-plaintext"}},[a("code",[t._v("Compiling contracts/Number.huff\n\nGreeter\n    ✓ Number is deployed\n    ✓ Number can be set\n\n[...]\n\n2 passing (312ms)\n")])])])])]),t._v(" "),a("p",[t._v("For more information on using Hardhat, "),a("a",{attrs:{href:"https://hardhat.org/getting-started/",target:"_blank",rel:"noopener noreferrer"}},[t._v("check out their documentation"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"troubleshooting-hardhat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting-hardhat"}},[t._v("#")]),t._v(" Troubleshooting Hardhat")]),t._v(" "),a("p",[t._v("If you run into issues with compiling and testing the contracts, it might be because you are running an incompatible version of Node.js with Hardhat. This quote is from the official Hardhat documentation:")]),t._v(" "),a("blockquote",[a("p",[t._v("Hardhat supports every currently maintained LTS Node.js version, up to two months after its end-of-life. After that period of time, we will stop testing against it, and print a warning when trying to use it. At that point, we will release a new minor version.")]),t._v(" "),a("p",[t._v("We recommend running Hardhat using the current LTS Node.js version. You can learn about it "),a("a",{attrs:{href:"https://nodejs.org/en/about/releases/",target:"_blank",rel:"noopener noreferrer"}},[t._v("here (opens new window)"),a("OutboundLink")],1),t._v(".")])])])}),[],!1,null,null,null);e.default=s.exports}}]);