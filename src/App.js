
import './App.css';
import { BuilderColorCode } from './components/builder';
import HomePage from './components/home'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' exact={true} element={<HomePage />}/>
          <Route path='/builder' exact={true} element={<BuilderColorCode />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
