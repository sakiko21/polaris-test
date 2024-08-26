import {InlineStack, BlockStack, Button, Card, Page, ButtonGroup} from "@shopify/polaris";
export default function HomePage(){
    return (
        <Page>
        <Card>
            <BlockStack gap="1600">
                <InlineStack gap="1000" wrap={false} align="center">
                    <Button url="/auth/login">ログイン</Button>
                    <Button url="/auth/register" variant="primary">新規登録</Button>
                </InlineStack>
            </BlockStack>
        </Card>
    </Page>
    )
}