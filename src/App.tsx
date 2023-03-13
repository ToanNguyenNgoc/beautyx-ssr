import React, { } from "react";
import "./App.css";
import RouterConfig from "./route/index";
import AppProvider from "./context/AppProvider";
import "./utils/protoType";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
    
    return (
        <div>
            <AppProvider>
                <RouterConfig />
            </AppProvider>
        </div>
    );
}

export default App;
