import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import booksReducer from './reducers/books/booksSlice'
import commentsSlice from './reducers/comments/commentsSlice';
import themeReducer from './reducers/theme/themeSlice';

const reducer = combineReducers({
      booksData: booksReducer,
      commentsData: commentsSlice,
      theme: themeReducer,
})

const store = configureStore({
  reducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
         <App />
    </Provider>
  </React.StrictMode>
);

