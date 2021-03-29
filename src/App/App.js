import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Footer from '../../component/layout/Footer';
// import Header from '../../component/layout/Header';
import ErrorBoundary from '../error/ErrorBoundry';
// import '../../uisass.scss';
import DashBoard from '../Components/DashBoard';
import alertActions from '../_actions/alert.actions';
import { Copyright } from '@material-ui/icons';

const App = () => {


    return (
        <div>
             <h1 style={{marginTop:"20px", marginBottom:"20px", marginLeft:"20px", marginRight:"20px", fontFamily: "cursive", fontWeight:"bold",color:'#FFFFFF'}}></h1>
             <br></br>
            <ErrorBoundary>
                <Router>
                    <Switch>
                        console.log(path);
                        <Route path="/web/stocks">
                            <DashBoard/>
                        </Route>
                        {/* <Route path="/web/stocksData" exact>
                            <PharmacyandPrescriptionInfo/>
                        </Route>
                        <Route path="/web/UploadAndAttest" exact>
                            <UploadAndAttest/>
                        </Route> */}
                        <Route path="/">
                            <DashBoard/>
                        </Route>
                        <Route path="/web/">
                            <DashBoard/>
                        </Route>
                    </Switch>
                </Router>
            </ErrorBoundary>
             {/* <h4 style={{textAlign:'center'}}>Copyright @2020</h4> */}
        </div>

    );
}

// function mapState(state) {
//     const { alert } = state;
//     return { alert };
// }

// const actionCreators = {
//     // clearAlerts: alertActions.clear;
// };

// const connectedApp = connect(mapState, actionCreators)(App);
// export { connectedApp as App };
export default App;