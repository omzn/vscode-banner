# vscode-banner README

カーソル位置にある単語をFigletを使ってバナー化し，直前の行にコメントとして表示します．

## Features

あくまで，「カーソル位置にある単語」を「1行上にコメントとして表示する」だけです．
ソースコードのどの場所でも実行できますので，関数名以外のものをバナー化して挿入することもできます．

デフォルトでは，コメントはC/C++形式になっています．
設定から，コメント開始記号と終了記号を指定できます．

## Requirements

figletをインストールしてください．
macOSではhomebrewでインストールできます．
設定で，figletのパスを指定するか，パスの通った場所にインストールしておいてください．

## Extension Settings

vscode-banner configurationに設定が3つあります．

* `extension.bannerCommand (Banner Command)`: バナーを生成するコマンドをオプション込みで指定します．デフォルトは`figlet -l -w 240 -f univers `です．
* `extension.commentBegin (Comment Begin)`: コメント行の開始シンボルです．
* `extension.commentEnd (Comment End)`: コメント行の終了シンボルです．

## Known Issues

あくまで，「カーソル位置にある単語」を「1行上にコメントとして表示する」だけです．

## Release Notes

### 0.0.1

Twitterでちょっと好評だったので，公開．

## Author

@omzn: (Osamu Mizuno)
