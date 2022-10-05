import React, { } from "react";
import "./App.css";
import RouterConfig from "./route/index";
import AppProvider from "./context/AppProvider";
//import BlurModal from './components/BlurModal/index'
import "react-loading-skeleton/dist/skeleton.css";
// import { requestForToken, onMessageListener } from "./firebase"

function App() {
    // requestForToken()
    // onMessageListener()
    //     .then((payload) => {
    //         console.log(payload)
    //     })
    // .catch((err) => console.log('failed: ', err));
    return (
        <div>
            <AppProvider>
                <RouterConfig />
            </AppProvider>
        </div>
    );
}

export default App;
