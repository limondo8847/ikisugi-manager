const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const dev = process.argv.includes('--dev') || process.env.NODE_ENV === 'development';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '2929', 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// 親ディレクトリにある data.json のパス
const DATA_FILE_PATH = path.join(__dirname, '..', 'data.json');

// data.json から市場データを安全に読み込み、必要なデータのみ抽出する関数
function readMarketData() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const rawData = JSON.parse(content);
      
      // balancesなどの個人情報を排除し、市場データと履歴のみを抽出
      return {
        market: rawData.market || { stocks: {}, crypto: {} },
        marketHistory: rawData.marketHistory || { stocks: {}, crypto: {} }
      };
    }
  } catch (error) {
    console.error('data.json の読み込み中にエラーが発生しました:', error);
  }
  return null;
}

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Socket.io サーバーの初期化
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // 開発用にすべてのオリジンを許可
      methods: ['GET', 'POST']
    }
  });

  // クライアント接続時の処理
  io.on('connection', (socket) => {
    console.log('クライアントが接続しました:', socket.id);
    
    // 接続時に現在の最新データを即座に送信
    const initialData = readMarketData();
    if (initialData) {
      socket.emit('market-data', initialData);
    }

    socket.on('disconnect', () => {
      console.log('クライアントが切断しました:', socket.id);
    });
  });

  // data.json の変更を監視
  let watchTimeout = null;
  fs.watch(DATA_FILE_PATH, (eventType, filename) => {
    if (filename && eventType === 'change') {
      // 短時間での連続発火を抑制するためデバウンス処理を実行
      if (watchTimeout) clearTimeout(watchTimeout);
      watchTimeout = setTimeout(() => {
        console.log('data.json の変更を検知しました。最新データを配信します...');
        const updatedData = readMarketData();
        if (updatedData) {
          io.emit('market-data', updatedData);
        }
      }, 100);
    }
  });

  httpServer.once('error', (err) => {
    console.error('サーバーエラー:', err);
    process.exit(1);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
