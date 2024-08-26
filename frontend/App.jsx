import { AppProvider } from "@shopify/polaris";
import translation from "@shopify/polaris/locales/ja.json";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes.jsx";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "react-query";

function App() {
  // pagesディレクトリの中にあるjsxファイルを取得
  const pages = import.meta.globEager('./pages/**/*.[jt]sx');
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });
  return (
    <AppProvider i18n={translation}>
      <BrowserRouter>
      <QueryClientProvider client={client}>
        {/* react-router-domのコンポーネント、前に何を開いていたかわかるようにするため */}
        <Routes pages={pages} />
        {/* ルーティングの設定 */}
        </QueryClientProvider>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
