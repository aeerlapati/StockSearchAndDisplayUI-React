import React from 'react';
import {Provider} from "react-redux";

import App from './App';
import {store} from "../_helpers/store";
import {setEnvVariables} from "../config/EnvUtil";


const RootApp = () => {
    let endpoint = setEnvVariables(window.location.hostname);
    // console.log(endpoint.reCaptchaKey);

    return (
            <Provider store={store}>
                <App/>
            </Provider>

    );
}

export default RootApp;