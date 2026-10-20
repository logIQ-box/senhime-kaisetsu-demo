# senhime-kaisetsu-demo

千姫解説のテスト用リポジトリ。

GitHub Pages の公開元を、このリポジトリの `main` ブランチ（`/root`）に設定します。

ロゴ画像は `assets/images/logo.png`、解説PDFは `assets/documents/kaisetsu.pdf` に配置します。

ページは公開状態ごとに分かれています。

- `index.html`：PDFの有無を確認する入口
- `waiting.html`：公開予定の案内とロゴを表示するページ
- `kaisetsu.html`：解説PDFを表示するページ

`assets/documents/kaisetsu.pdf` がなければ `waiting.html`、あれば `kaisetsu.html` へ自動的に移動します。

```text
.
├── index.html
├── waiting.html
├── kaisetsu.html
└── assets
    ├── css/styles.css
    ├── js/router.js
    ├── js/pdf-renderer.js
    ├── images/logo.png
    └── documents/kaisetsu.pdf
```

コミット履歴に解説が含まれるため、このリポジトリは本番前に削除します。
