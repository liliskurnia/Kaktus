import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
// import authReducer from './authReducer';
// import messageReducer from './messageReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer
  // auth: authReducer,
  // message: messageReducer
});

export default reducer;
