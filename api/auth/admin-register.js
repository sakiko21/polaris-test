import { PolarisPracDB } from "../../db/polaris-test-db.js";
import jwt from "jsonwebtoken";

export async function adminRegister(req,res){
    console.log("===adminRiegister start===");
    try{
        const body = req.body;
        console.log(body); 
        const {name, email, password} = body;
        //PolarisTutrialDBに管理者を作成する処理を追加
        const admin = await PolarisPracDB.createAdmin(name, email, password);
        console.log({admin});
        if(admin.error){
            return res.status(400).json({register:'fail', message:admin.error});
        }

        const token = jwt.sign({id:admin.id, name:admin.name}, process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        return res.status(200).json({register:'success', admin});
    }catch(error){
        console.log("===adminRegister error===");
        console.log(error);
        return res.status(500).json({register:'fail', message:error.message});
    }
}


