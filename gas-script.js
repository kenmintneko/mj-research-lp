/**
 * Google Apps Script - MJリサーチ フォーム送信処理
 * 
 * 使用方法：
 * 1. Google Apps Script（https://script.google.com）を開く
 * 2. このコードを新規プロジェクトにコピー＆ペースト
 * 3. スプレッドシートIDを取得して、下記の SPREADSHEET_ID を設定
 * 4. 関数「doPost」を実行テスト
 * 5. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」を選択
 * 6. 実行者：自分、アクセス：全員を選択
 * 7. デプロイURLをコピーして、HTMLの GAS_ENDPOINT に設定
 */

// ========== 設定 ==========
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // スプレッドシートIDを設定
const SHEET_NAME = "フォーム送信記録"; // シート名

// ========== メイン処理 ==========
function doPost(e) {
  try {
    // POSTデータを解析
    const data = JSON.parse(e.postData.contents);
    
    // タイムスタンプを追加
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    
    // スプレッドシートにデータを追加
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // 初回実行時、ヘッダーを追加
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['タイムスタンプ', '名前', 'メールアドレス', '電話番号', 'ご相談内容', '現在の状況']);
    }
    
    // データを追加
    sheet.appendRow([
      timestamp,
      data.name || '匿名',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.situation || ''
    ]);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'フォーム送信完了' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * テスト用の関数（本番環境では不要）
 */
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'テスト太郎',
        email: 'test@example.com',
        phone: '090-1234-5678',
        message: 'テストメッセージです',
        situation: 'suspicion'
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
