import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { WorldWIP } from './pages/WorldWIP/WorldWIP';
import { LiveByCountry } from './pages/LiveByCountry/LiveByCountry';
import { About } from './pages/About/About';

import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <Header />
      <Box sx={{ maxWidth: '1280px', display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/world-wip" element={<WorldWIP />} />
          <Route path="/live-by-country" element={<LiveByCountry />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App;
