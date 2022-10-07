import logo from './logo.svg';
import './App.css';
import { BuilderColorCode } from './builder-color';

import { Provider } from 'react-redux';
import { store } from "./store";

function App() {
  return (
    <div className="App">
       <Provider store={store}>
          <BuilderColorCode />
      </Provider>
    </div>
  );
}

export default App;
