import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './Components/home/Home';
import HomeMenu from './Components/user-interface/HomeMenu';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='menu' element={<HomeMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
