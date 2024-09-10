import {TextField, FormLayout,Text ,Form, Button, Card, Page} from "@shopify/polaris";
import {useField, useForm} from "@shopify/react-form";
import {useNavigate} from "react-router-dom";  // useNavigateをインポート


export default function LoginPage(){
    const navigate = useNavigate(); // navigateを使用できるようにする
    const{
        fields: {email, password},
        submit,
        submitting,
        reset,
        makeClean//dirtyとsubmittingの中身をリセット 
    } =useForm({
        fields: {
            email: useField({
                value: '',
                validates:[
                    (email) => {
                        if (email.length < 1) {
                          return 'メールアドレスを入力してください';
                        }
                      },
                      (email) => {
                        if (!email.match(/.+@.+\..+/)) {
                          return '有効なメールアドレスを入力してください';
                        }
                      },
                ],
            }),
            password: useField({
                value: '',
                validates: [
                (password) => {
                    if (password.length < 1) {
                    return 'パスワードを入力してください';
                    }
                },
                ],
            }),
        },
        async onSubmit(formDetails){
            try{
            const streamData = await fetch('/api/auth/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDetails),
            });
            if (!streamData.ok) {
                if (streamData.status === 401) {
                    alert('パスワードが正しくありません');
                    return { status: 'fail', errors: [{ message: 'パスワードが正しくありません' }] };
                } else if (streamData.status === 404) {
                    alert('メールアドレスが見つかりません');
                    return { status: 'fail', errors: [{ message: 'メールアドレスが見つかりません' }] };
                } else {
                    alert('サーバーエラーが発生しました');
                    return { status: 'fail', errors: [{ message: 'サーバーエラーが発生しました' }] };
                }
            }

            const response = await streamData.json();
            console.log({response});

            if (response.login === 'success') {
                alert('ログイン成功');
                navigate('/auth/mypage');  // 登録完了後にマイページへ遷移
                return { status: 'success' };
            } else {
                return { status: 'fail', message: response.message };
            }
        } catch (error) {
            console.log("Fetch error:", error);
            return { status: 'fail', message: 'An error occurred during login' };
        
        }}
    });






    return (
        <Page>
            <Card>
                <Text variant="headingLg">ログイン</Text>
                <Form onSubmit = {submit}>
                <FormLayout>
                     <TextField
                        label="メールアドレス"
                        type="email"
                        value={email.value}
                        onChange={email.onChange}
                        error={email.error}
                    />
                    <TextField
                        label="パスワード"
                        type="password"
                        value={password.value}
                        onChange={password.onChange}
                        error={password.error}
                    />
                    <Button primary submit>ログイン</Button>
                    <Button url="/auth/register" variant="primary">新規登録</Button>  
                </FormLayout>
                </Form>
            </Card>
        </Page>
    )
}


