import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Country, LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';
import { LiveByCountryChart } from '../../components/LiveByCountryChart/LiveByCountryChart';
import { LiveByCountryForm } from '../../components/LiveByCountryForm/LiveByCountryForm';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  countries: Country[],
}

export const LiveByCountry: React.FC<Props> = ({ countries }) => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams({
    case: 'Confirmed',
    country: sessionStorage.getItem('selectedCountry') || 'ukraine',
    dateFrom: '2022-01-01',
  });
  const selectedCase = searchParams.get('case') || '';
  const selectedCountry = searchParams.get('country') || '';
  const dateFrom = searchParams.get('dateFrom') || '';

  useEffect(() => {
    function getFullUrl() {
      const baseUrl = 'https://api.covid19api.com/live/country/';
      const fullUrl = `${baseUrl}${selectedCountry}` +
        `/status/${selectedCase.toLocaleLowerCase()}/date/${dateFrom}`;

      return fullUrl;
    };

    const fullUrl = getFullUrl();

    const getDataCountry = async () => {
      setIsLoading(true);

      try {
        const res = await getLiveByCountryData(fullUrl);

        if (res) {
          setLiveByCountryData(res);
          console.log('liveByCountryData', liveByCountryData)
        }
      } catch (error) {
        console.log('error liveByCountryData');
      } finally {
        setIsLoading(false);
      }
    };

    getDataCountry();
  }, [selectedCase, selectedCountry, dateFrom]);

  function updateParams(params: { [key: string]: string | '' }) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });

    setSearchParams(searchParams);
  };

  function updateSessionStorage(value: string) {
    sessionStorage.setItem('selectedCountry', value);
    updateParams({ country: value });
  };

  return (
    <Box sx={{ width: '80%', padding: '40px 20px' }}>
      <LiveByCountryForm
        countries={countries}
        selectedCase={selectedCase}
        selectedCountry={selectedCountry}
        dateFrom={dateFrom}
        updateParams={updateParams}
        updateSessionStorage={updateSessionStorage}
        
      />

      {isLoading ? (
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
