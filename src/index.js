import { React, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { fireBase, FieldValue } from './lib/firebase';
import './styles/app.css';

function FireBaseWrapper() {
  const fireBaseProviderValue = useMemo(
    () => ({ firebase: fireBase, FieldValue }),
    [fireBase, FieldValue]
  );

  return (
    <FirebaseContext.Provider value={fireBaseProviderValue}>
      <App />
    </FirebaseContext.Provider>
  );
}

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// render
root.render(<FireBaseWrapper />);
