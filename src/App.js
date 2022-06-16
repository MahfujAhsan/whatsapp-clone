import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="app">
      <div className='app__body'>
        <Router>
          <Routes>
            <Route path='/' element={<Sidebar />} />
          </Routes>
          <Routes>
            <Route path='/rooms/:roomId' element={<Sidebar />} />
          </Routes>
          <Routes>
            <Route path='/rooms/:roomId' element={<Chat />} />
          </Routes>
          
        </Router>
      </div>
    </div>
  );
}

export default App;
