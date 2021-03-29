import { combineReducers } from 'redux';

import symbolsReducer from './symbolsReducer';
import financeDataReducer from './financeDataReducer';


const rootReducer = combineReducers({
  stockSymbolsData: symbolsReducer,
  stockPerformaceData: financeDataReducer,
});

export default rootReducer;