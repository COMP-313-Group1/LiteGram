import { React, StrictMode, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { fireBase, FieldValue } from './lib/firebase';

function FireBaseWrapper() {
  const fireBaseProviderValue = useMemo(
    () => ({ fireBase, FieldValue }),
    [fireBase, FieldValue]
  );

  return (
    <FirebaseContext.Provider value={fireBaseProviderValue}>
      <StrictMode>
        <App />
      </StrictMode>
    </FirebaseContext.Provider>
  );
}

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// render
root.render(<FireBaseWrapper />);
