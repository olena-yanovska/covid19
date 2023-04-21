import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { WorldWIP } from './pages/WorldWIP/WorldWIP';
import { ByCountry } from './pages/LiveByCountry/LiveByCountry';
import { About } from './pages/About/About';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-wrapper'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/world-wip" element={<WorldWIP />} />
          <Route path="/live-by-country" element={<ByCountry />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
