import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCountries } from './api/getData';
import { Country } from './types/types';
import './App.scss';

import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { WorldWIP } from './pages/WorldWIP/WorldWIP';
import { LiveByCountry } from './pages/LiveByCountry/LiveByCountry';
import { About } from './pages/About/About';

import Box from '@mui/material/Box';

function App() {
  const [countries, setCountries] = useState<Country[]>(JSON.parse(sessionStorage.getItem('countries') as string) || []);

  useEffect(() => {
    const getCountryList = async () => {
      try {
        let res;
        const storedCountries = sessionStorage.getItem('countries');

        if (storedCountries) {
          res = JSON.parse(storedCountries);
        } else {
          res = await getCountries();
        }
  
        if (res) {
          const arrayRes = Object.values(res);
          const sortedRes: any[] = arrayRes.sort((a: any, b: any) => a.Slug.localeCompare(b.Slug));
          
          setCountries(sortedRes);
          sessionStorage.setItem('countries', JSON.stringify(sortedRes));
        }
      } catch (error) {
        console.log('error with loading Countries');
      }
    };
  
    getCountryList();
  }, []);

  return (
    <div className="App">
      <Header />
      <Box sx={{ maxWidth: '1280px', display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to='/about' replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/world-wip" element={<WorldWIP />} />
          <Route path="/live-by-country" element={<LiveByCountry countries={countries} />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App;
