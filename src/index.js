import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { fireBase, FieldValue } from './lib/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ fireBase, FieldValue }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </FirebaseContext.Provider>,
);

