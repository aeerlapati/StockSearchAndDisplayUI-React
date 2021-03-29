import { userConstants } from '../_constants';

const iniState = {
  stocksData: '',
  loading: false,
  error:'',

}

const symbolsReducer = (state = iniState, action) => {
  switch (action.type) {
    case userConstants.GETSYMBOLS_REQUEST:
          state = iniState;
          return {
              ...state,
              loading: true
          }

      case userConstants.GETSYMBOLS_SUCCESS:
          state = iniState;
          return {
              ...state,
              stocksData: action.payload.data,
              loading: false,
              error:''
          }

          case userConstants.GETSYMBOLS_FAILURE:
            state = iniState;
          return {
              ...state,
              error: action.payload,
              loading: false
          }
                  
      default: return state
  }

}

export default symbolsReducer;