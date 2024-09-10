import {InlineStack, BlockStack, Heading, Card, Page} from "@shopify/polaris";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage(){


    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/api/auth/mypage', {
                    method: 'GET',
                    credentials: 'include', // クッキーのトークンを送信するために必要
                });

                console.log("レスポンスのステータス:", response.status); // レスポンスステータスをログ出力




                if (response.ok) {
                    const data = await response.json();
                    console.log("受け取ったデータ:", data); 
                    setAdmin(data.admin); // ユーザー情報を保存
                } else {
                    navigate('/auth/login'); // ログインしていない場合はログインページへリダイレクト
                }
            } catch (error) {
                console.log("エラーが発生しました:", error);
                navigate('/auth/login')
            }
        };

        checkAuthStatus();
    }, [navigate]);

    if (!admin) {
        return <div>確認中...</div>; // ローディング中
    }



    return (
        <Page title="マイページ">
        <Card>
            <BlockStack gap="1600">
                <InlineStack gap="1000" wrap={false} align="center">
                 
                </InlineStack>
            </BlockStack>
        </Card>
    </Page>
    )
}