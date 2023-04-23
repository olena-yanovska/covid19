import { useEffect, useState } from 'react';
import { LiveByCountryCases, LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';
import { LiveByCountryChart } from '../../components/LiveByCountryChart/LiveByCountryChart';
import { LiveByCountryForm } from '../../components/LiveByCountryForm/LiveByCountryForm';
import { countries } from '../../api/countries';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const LiveByCountry: React.FC = () => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);
  const [selectedCase, setSelectedCase] = useState<string>('Confirmed');
  const [selectedCountry, setSelectedCountry] = useState<string>(countries.find(c => c.Country === 'Ukraine')!.Slug);

  useEffect(() => {
    function getFullUrl() {
      const baseUrl = 'https://api.covid19api.com/live/country/';
      const date = '2021-09-01';
      const fullUrl = `${baseUrl}${selectedCountry}` +
        `/status/${selectedCase.toLocaleLowerCase()}/date/${date}`;

      return fullUrl;
    };

    const fullUrl = getFullUrl();

    const getDataCountry = async () => {
      try {
        const res = await getLiveByCountryData(fullUrl);

        if (res) {
          setLiveByCountryData(res);
        }
      } catch (error) {
        console.log('error liveByCountryData');
      }
    };

    getDataCountry();
  }, [selectedCase, selectedCountry]);

  return (
    <Box sx={{ width: '70%', padding: '30px' }}>
      <LiveByCountryForm
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      {liveByCountryData.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Box>
      ) : (
        <LiveByCountryChart
          liveByCountryData={liveByCountryData}
          selectedCase={selectedCase}
        />
      )}
    </Box>
  );
};
