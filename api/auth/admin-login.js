import { PolarisPracDB } from "../../db/polaris-test-db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function adminLogin(req,res){
    console.log("===adminLogin start===");
    try{
        const body = req.body;
        console.log(body); 
        const {email, password} = body;
        const admin = await PolarisPracDB.getAdminByEmail(email, password);
        console.log({admin});
        if (!admin) {
            return res.status(404).json({ error: 'Adminが見つかりません' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch){
            return res.status(401).json({error:'パスワードが正しくありません'});
        }

        const token = jwt.sign({id: admin.id, name:admin.name}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('admin_token', token,{
            httpOnly: true,  // JavaScriptからアクセスできないようにする
            secure: process.env.NODE_ENV === 'production',  // 本番環境ではHTTPSを使う
            maxAge: 3600000  // 1時間の有効期限
        });

        return res.status(200).json({admin, login:'success', message:'ログイン成功'});
        
    } catch(error){
        console.log("===adminLogin error===");
        console.log(error);
        return res.status(500).json({error: "サーバーエラー"});
    }
}


