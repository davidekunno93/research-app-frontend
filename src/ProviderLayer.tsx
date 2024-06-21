import App from "./App";
import DataProvider from "./context/DataProvider";

const ProviderLayer = () => {
    return (
        <DataProvider>
            <App />
        </DataProvider>
    )
}
export default ProviderLayer;