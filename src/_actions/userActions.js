import { userConstants } from '../_constants';
import { history } from '../_helpers';
// import { userService } from '../_services';
import { alertActions } from './alert.actions';
import axios from 'axios';
import { setEnvVariables, getOktaConfig } from '../config/EnvUtil';


export const getStockSymbols = () => {

    return (dispatch) => {
        let endpoint = setEnvVariables(window.location.hostname);
        dispatch(request());
        axios
            .get(endpoint.getsymbols,{
                headers: {
                    'Authorization':'1234',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                  }
            }
            ).then(response =>{
                dispatch(success(response));
                //dispatch(fetchAppointmentstSuccess(response,))
            })
            .catch(error => {
                dispatch(failure(error.message));
                //dispatch(fetchAppointmentsFailure(error.message))
            })
    }

    function request() { return { type: userConstants.GETSYMBOLS_REQUEST } }
    function success(response) { return { type: userConstants.GETSYMBOLS_SUCCESS, payload: response} }
    function failure(error) { return { type: userConstants.GETSYMBOLS_FAILURE, payload: error } }
}


export const getStockData = (symbol) => {

    return (dispatch) => {
        let endpoint = setEnvVariables(window.location.hostname);
        dispatch(request());
        axios
            .get(endpoint.getdata + '?stockSymbol=' + symbol,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                  }
            }
            ).then(response =>{
                dispatch(success(response));
                //dispatch(fetchAppointmentstSuccess(response,))
            })
            .catch(error => {
                dispatch(failure(error.message));
                //dispatch(fetchAppointmentsFailure(error.message))
            })
    }

    function request() { return { type: userConstants.GETSTOCKDATA_REQUEST } }
    function success(response) { return { type: userConstants.GETSTOCKDATA_SUCCESS, payload: response } }
    function failure(error) { return { type: userConstants.GETSTOCKDATA_FAILURE, payload: error } }
}


// export const getStockPrice = (symbol) => {
//     return dispatch => {
//         dispatch(request());

//         userService.getStockPrice(symbol)
//             .then(
//                 stockPrice => { 
//                     dispatch(success(stockPrice));
//                     //history.push('/');
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     //dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request() { return { type: userConstants.GETPRICE_SUCCESS } }
//     function success(stockPrice) { return { type: userConstants.GETPRICE_SUCCESS, stockPrice } }
//     function failure(error) { return { type: userConstants.GETPRICE_FAILURE, payload: error } }
// }