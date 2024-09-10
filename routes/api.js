import { adminRegister, adminLogin, adminMypage} from "../api/index.js";
import {adminAuthentication} from "../middleware/admin-authentication.js";

export function apiRouter(app){
    app.post('/api/auth/register',adminRegister);
    app.post('/api/auth/login', adminLogin);
    app.get('/api/auth/mypage', adminAuthentication, adminMypage);
}

