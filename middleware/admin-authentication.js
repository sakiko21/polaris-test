import jwt from "jsonwebtoken";

export async function adminAuthentication(req,res,next){
    const token = req.cookies.admin_token;//クッキーに保存したトークンを取得。これにあたり、cookie-parserモジュールが必要
    if (!token){
        return res.status(401).send("トークンがありません");//トークンがない場合、401エラーを返す
    }
    try{
    const admin= jwt.verify(token, process.env.JWT_SECRET);//トークンを検証する。第一引数にはトークン、第二引数には秘密鍵
        console.log({admin});
        req.admin = admin;//リクエストオブジェクトにuserを追加。そこにペイロードのuserを格納
        next();//次の処理に移る
    } catch (error){
        console.log("JWTエラー:", error);
        return res.status(500).send(error.message);//エラーがある場合、401エラーを返す
    }
}
