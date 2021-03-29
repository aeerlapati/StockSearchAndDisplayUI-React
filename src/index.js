import React from 'react';
import ReactDOM from 'react-dom';
import RootApp from './App/RootApp';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

ReactDOM.render(
    <RootApp/>,
    document.getElementById('root')
);

