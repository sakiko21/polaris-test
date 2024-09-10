import { PolarisPracDB } from "../../db/polaris-test-db.js";

export async function adminMypage(req,res){
    console.log("===adminMypage start===");
    res.json({
        message: 'ログイン済みです',
        admin: req.admin,
    });
}




