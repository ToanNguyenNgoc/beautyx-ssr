import "./App.css";
import RouterConfig from "./route/index";
import "./utils/protoType";
import "react-loading-skeleton/dist/skeleton.css";
import AppProvider from "context/AppProvider";
import { MessengerProvider } from "context"


function App() {
    return (
        <div>
            <AppProvider>
                <MessengerProvider>
                    <RouterConfig />
                </MessengerProvider>
            </AppProvider>
        </div>
    );
}

export default App;
