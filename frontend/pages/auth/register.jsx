import{Card, Form, FormLayout, Page, Text, TextField, Button} from "@shopify/polaris"
import {useNavigate} from "react-router-dom";  // useNavigateをインポート
import {useState} from "react";
//ステート管理をまとめて行うもの。
import {useField, useForm} from "@shopify/react-form";

export default function RegisterPage(){
    // const [nameValue, setNameValue] = useState("");
    // const [nameErrorMessage, setNameErrorMessage] = useState("お名前を入力してください");
   //name, email, password, passwordConfirmation のフォームを作成する
   const navigate = useNavigate(); // navigateを使用できるようにする

   const {
    fields: {name, email, password, passwordConfirmation},
    dirty,//変更されたらtrue(何か一つでも変更された時によく使うやつ)
    submit,//submitをするとsubmittingがtrueになる
    submitting,
    reset,
    makeClean//dirtyとsubmittingの中身をリセット
} = useForm({
    fields:{
        name:useField({
            value:'',
            validates:[//配列で制御する必要あり
                (name) => {
                    if (name.length < 1) {
                        return 'お名前を入力してください';
                    }
                }
            ],
        }),
        email:useField({
            value:'',
            validates:[
                (email) =>{
                    if (email.length < 1){
                        return 'メールアドレスを入力してください';
                    }
                },
                (email) =>{
                    if (!email.match(/.+@.+\..+/)){
                        return 'メールアドレスを入力してください';
                    }
                },
            ]
        }),
        password: useField({
            value:'',
            validates:[
                (password) => {
                    if (password.length < 1) {
                        return 'パスワードを入力してください';
                    }
                },
                (password) => {
                    if (password.length < 6) {
                        return 'パスワードは6文字以上で入力してください';
                    }
                },
            ],
        }),
        passwordConfirmation:useField({
            value:'',
            validates:[
                (passwordConfirmation) => {
                    if (passwordConfirmation.length<1){
                        return 'パスワードを入力してください'
                    }
                },
                (passwordConfirmation) => {
                    
                    if (passwordConfirmation != password.value){
                        console.log("passwordConfirmation:", passwordConfirmation, "、password.value:",password.value);
                        return 'パスワードが一致しません'
                    }
                }
            ],
        }),
    },
    async onSubmit(formDetails){
        // console.log('onSubmit called with:', formDetails); // これを追加
        // try{
        //     console.log('Before fetch'); // fetch の前に追加
        //     delete formDetails.passwordConfirmation;
        //     const streamData = await fetch('/api/auth/register',{
        //         method:'POST',
        //         headers:{
        //             'Content-Type': 'application/json',
        //         },
        //         body:JSON.stringify(formDetails),
        //     });
        //     console.log('After fetch'); // fetch の後に追加
        //     console.log({streamData});
        //     const response = await streamData.json();
        //     console.log({response});
        // }catch(error){
            
        //     console.error(error);
        // }
        delete formDetails.passwordConfirmation;
        const streamData = await fetch('/api/auth/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formDetails),
        });
        const response = await streamData.json();
        console.log({response});
        if(response.register == 'success'){
            alert('登録完了');
            navigate('/auth/mypage');  // 登録完了後にマイページへ遷移
            return {status: 'success'};
        }else{
            alert('登録が失敗しました');
            return {status: 'fail', message:error.message};
        }
    },
});
   
    return(
        <Page>
            <Card>
                <Text variant="headingLg">新規管理者登録</Text>
                <Form onSubmit={submit}>
                <FormLayout>
                    <TextField 
                        label="お名前"
                        type="text"
                        placeholder="例)山田太郎"
                        helpText="お名前を入力してください"
                        requiredIndicator
                        value={name.value}
                        onChange = {name.onChange}
                        error={name.error}
                    />
                    <TextField
                        label="メールアドレス"
                        type="email"
                        requiredIndicator//赤い米印のこと
                        value={email.value}
                        onChange={email.onChange}
                        error={email.error}
                    />
                    <TextField
                        label="パスワード"
                        type="password"
                        requiredIndicator
                        value={password.value}
                        onChange={password.onChange}
                        error={password.error}
                    />
                    <TextField
                        label="パスワードの確認"
                        type="password"
                        requiredIndicator
                        value={passwordConfirmation.value}
                        onChange={passwordConfirmation.onChange}
                        error={passwordConfirmation.error}
                    />    
                    <Button primary submit>新規登録</Button>
                </FormLayout>
                </Form>
            </Card>
        </Page>
    )
}

