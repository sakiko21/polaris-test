import { adminRegister } from "../api/index.js";

export function apiRouter(app){
    app.post('api/auth/register',adminRegister);
}