import './App.css';
import { Routes, Route } from 'react-router-dom';
import EditPage from './pages/EditPage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<EditPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
