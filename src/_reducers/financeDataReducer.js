import { userConstants } from '../_constants';

const iniState = {
  data: '',
  loading: false,
  error:'',

}

const financeDataReducer = (state = iniState, action) => {
  switch (action.type) {
    case userConstants.GETSTOCKDATA_REQUEST:
          state = iniState;
          return {
              ...state,
              loading: true
          }

      case userConstants.GETSTOCKDATA_SUCCESS:
          state = iniState;
          return {
              ...state,
              data: action.payload.data,
              loading: false,
              error:''
          }

          case userConstants.GETSTOCKDATA_FAILURE:
            state = iniState;
          return {
              ...state,
              error: action.payload,
              loading: false
          }
                  
      default: return state
  }

}

export default financeDataReducer;