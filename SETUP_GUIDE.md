# スプレッドシート連携 セットアップガイド

## 📋 手順概要
1. Google Sheets で新規スプレッドシート作成
2. Google Apps Script でWeb Appをデプロイ
3. デプロイURLを index.html に設定

---

## ✅ ステップ1：Google Sheets でスプレッドシート作成

1. Google Drive を開く（https://drive.google.com）
2. 「+ 新規」→「Google Sheets」をクリック
3. シート名を「MJリサーチ フォーム送信記録」に変更
4. 右上のシートID部分をコピー
   - URLから `/spreadsheets/d/` の後に続く長い文字列がスプレッドシートID

---

## ✅ ステップ2：Google Apps Script でコード設定

### 2-1. 拡張機能 → App Scripts を開く
- スプレッドシートの右上メニュー「その他」→「Apps Script」

### 2-2. デフォルトコードを削除して、gas-script.js の内容をコピー
```javascript
// gas-script.js の内容をここにコピーしてください
```

### 2-3. SPREADSHEET_ID を設定
- gas-script.js の以下の行を編集：
```javascript
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // ← ここにスプレッドシートIDを貼り付け
```

### 2-4. テスト実行（オプション）
- 関数 `testDoPost` を選択
- 実行ボタンをクリック
- 初回は「このアプリは確認されていません」という警告が出ます
  - 「詳細」→「MJリサーチ(安全でないページ)に移動」をクリック
  - 許可を与える

---

## ✅ ステップ3：Web App としてデプロイ

### 3-1. 「デプロイ」ボタンをクリック

### 3-2. 「新しいデプロイ」をクリック

### 3-3. デプロイ設定：
- **タイプ：** ウェブアプリ
- **実行者：** 自分のメールアドレス
- **アクセス：** 全員 （重要！）

### 3-4. デプロイボタンをクリック

### 3-5. デプロイ URL をコピー
- 例：`https://script.google.com/macros/d/XXXXXXX/userweb`

---

## ✅ ステップ4：index.html にURL設定

index.html の以下の行を修正：

```javascript
const GAS_ENDPOINT = "YOUR_GAS_ENDPOINT_URL"; // ← ここにデプロイURLを貼り付け
```

**例：**
```javascript
const GAS_ENDPOINT = "https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j/userweb";
```

---

## 🧪 動作確認

1. HTML をブラウザで開く
2. フォームに入力
3. 「無料・匿名で相談する」ボタンをクリック
4. スプレッドシートにデータが追加されたら成功！

---

## 📝 シート構成

自動的に以下のカラムがスプレッドシートに作成されます：
- **タイムスタンプ** - 送信日時（JST）
- **名前** - お名前（匿名の場合）
- **メールアドレス** - 連絡先
- **電話番号** - 電話番号
- **ご相談内容** - 相談内容テキスト
- **現在の状況** - 選択項目

---

## ⚠️ トラブルシューティング

### エラー「GAS_ENDPOINT が設定されていません」
→ index.html の `GAS_ENDPOINT` にURLが正しく設定されているか確認

### スプレッドシートにデータが入らない
→ Google Apps Script のログを確認：
- Apps Script ページで「実行ログ」をクリック
- エラーメッセージを確認

### CORS エラーが出る
→ Google Apps Script のデプロイ設定で「アクセス：全員」に設定されているか確認

---

## 🔐 セキュリティ について

- フォームデータはJSONで送信
- Google Apps Script は公開エンドポイント（ただしPOST限定）
- スプレッドシートは個人の Google アカウントで管理
- 個人情報は暗号化・バックアップ推奨
