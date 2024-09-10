//モジュールをインポート
import express from 'express';
import {join} from 'path';//ファイルとパスを結合するため、pathモジュールからjoinメソッドをインポート
import serveStatic from 'serve-static';//静的ファイルを提供するためのミドルウェア
import { readFileSync } from 'fs';//fsモジュールから、ファイルを同期的に読み込むためのメソッドをインポート
import { apiRouter } from './routes/index.js';
import { PolarisPracDB } from './db/polaris-test-db.js';
import cookieParser from 'cookie-parser';

//Expressアプリケーション設定
const app = express();
const PORT = process.env.PORT || 8080;
const STATIC_PATH = `${process.cwd()}/frontend/dist`;// 静的ファイルを提供するディレクトリのパスを指定。

PolarisPracDB.init();

app.use(express.json());
app.use(cookieParser());
apiRouter(app);


//静的ファイルの提供
app.use(serveStatic(STATIC_PATH,{index:false}));//指定されたディレクトリ（STATIC_PATH）から静的ファイルを提供。index: false とすることで、デフォルトの index.html を提供せず、ルートハンドリングを任意に設定できる（/about にアクセスしたらabout.htmlを返せる、みたいなイメージ）


//ルートハンドリング
app.use("/*", async (req,res,next) => {//指定されたルートが存在しないときはこちらのミドルウェアが処理引き継ぐ
    const index = readFileSync(join(STATIC_PATH, 'index.html'), 'utf-8');//index.htmlファイルを読み込みその内容を文字列として取得
    return res
        .status(200)
        .set('Content-Type', 'text/html')
        .send(index);
        //return以降の記載は、「index.htmlの内容をtext/htmlとしてクライアントに返す」ということ
});

//サーバーを起動
app.listen(PORT, () =>{
    console.log(`Polaris app ：http://localhost:${PORT}`);
})

