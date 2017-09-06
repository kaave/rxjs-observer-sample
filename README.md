# FRAME LUNCH scaffold for frontend development

## Requierment

* macOS: >= `10.12`
    * or Ubuntu `16.04`
* Node: >= `v6.9`
* yarn: >= `0.24.5`
    * or npm >= `3.10.10`

### Optionals

## How to use

```bash
# install npm packages
yarn
# start watch & development server
yarn start
# create production files
yarn build
# check JavaScript types
yarn typecheck
# check codes quality
yarn lint
# check build files
yarn build:check
```

## Important Technology

### Node.js manager

* [ndenv](https://github.com/riywo/ndenv)

### Package manager

* [yarn (recommend)](https://yarnpkg.com/)
* [npm](https://www.npmjs.com/)

### Task runner

* [Gulp](http://gulpjs.com/)

### Build tools

#### JavaScript

* [Webpack](https://webpack.github.io/)
* [babel](https://babeljs.io/)
    * [babel-preset-flow](https://github.com/babel/babel/tree/master/packages/babel-preset-flow)
    * [babel-preset-env](https://github.com/babel/babel-preset-env)
    * [babel-plugin-transform-object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread)

JSから以下のファイルをすることが可能なため、ケースバイケースで使用すると良

- 画像ファイル(`jpg`, `gif`, `png`, `svg`) svgはテキストとして、それ以外はinline化される
- プレーンテキスト(`txt`, `log`)
- JSON(`json`)
- CSS(`css`)

#### CSS

* [PostCSS](http://postcss.org/)
    * [autoprefixer](https://github.com/postcss/autoprefixer)
    * [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
    * [postcss-fixes](https://github.com/mattdimu/postcss-fixes)

* [ECSS](http://ecss.io/)

※CSSでのurl指定はinline化される。

#### html

* [EJS](http://www.embeddedjs.com/)

ビルド時にオプション値 `/site-config.json` が読み込まれるので適宜利用する

### Code checker

#### JavaScript

* [flow](https://flow.org/)
* [ESLint](http://eslint.org/)
    * [eslint-config-framelunch](https://github.com/framelunch/eslint-config-framelunch)

#### CSS

* [stylelint](https://stylelint.io/)
    * [stylelint-config-framelunch](https://github.com/framelunch/stylelint-config-framelunch)

## Directory Layout

```text
.
|- /.github/                # GitHub用issue, PRテンプレ
|- /assets/                 # 静的リソース build時にそのままrootに展開されます
|- /build/                  # yarn buildコマンドで生成されるコンパイル済みファイル
|- /flow-typed/             # flowtype用型ファイル(自動生成ディレクトリ)
|- /node_modules/           # 3rd-party libraries and utilities for nodeJs
|- /src
|    |- /assets/            # JSから直接importする静的リソース
|    |- /components/        # WEBコンポーネント
|    |- /scripts/           # Javascriptのエントリーディレクトリ
|    |- /styles/            # CSSのエントリーディレクトリ
|    |- /views/             # EJSのエントリーディレクトリ
|    |- site-config.json    # EJSビルド時に渡されるオプション値 metaタグなどに使うこと想定
|- /tools/                  # ビルドツール関連
|    |- /gulp/              # gulpタスクを記述したjs。タスクごとに1ファイルとする
|    |- /webpack/           # webpackビルド設定
|    |- /config.js          # ビルド関係設定ファイル
|- .eslintignore            # eslintから除外するファイル
|- .eslintrc                # eslint設定ファイル
|- .flowconfig              # flowtype設定ファイル
|- .gitattributes           # git設定 yarn.lockをバイナリ扱いなど
|- .gitignore               # git管理対象外を記述
|- .node-version            # ndenv用のバージョン指定
|- .stylelintrc             # stylelint設定ファイル
|- gulpfile.js              # gulp実行ファイル
|- package.json             # The list of 3rd party libraries for nodeJs
|- README.md                # README
|- yarn.lock                # yarn用利用npmsバージョン管理ファイル
```

## Settings
- ProjectのSettingでsrcディレクトリをrootに設定する
- assetは必ず絶対パスで記述する