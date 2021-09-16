import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'; 
import { applyMiddleware, createStore } from 'redux'; // middleware 연결
import promiseMiddleWare from 'redux-promise'; // redux-store 에 Promise를 보낼 수 있는 middleWare 
import ReduxThunk from 'redux-thunk'; // redux-store 에 Function 을 보낼 수 있는 middleWare

// Main Root Reducer
import rootReducer from './_reducers';
const createStoreWithMiddleWare = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore); 

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={createStoreWithMiddleWare(rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);