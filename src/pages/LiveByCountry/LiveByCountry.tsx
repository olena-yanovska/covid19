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
};

const defaultSearchParams = {
  case: 'Confirmed',
  country: 'ukraine',
  dateFrom: '2022-01-01',
};

export const LiveByCountry: React.FC<Props> = ({ countries }) => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  const selectedCase = searchParams.get('case') || 'Confirmed';
  const selectedCountry = searchParams.get('country') || 'ukraine';
  const dateFrom = searchParams.get('dateFrom') || '2022-01-01';

  console.log('searchParams', searchParams)

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.toString() === '') {
  //     setSearchParams(defaultSearchParams);
  //   }
  // }, [setSearchParams]);

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

  return (
    <Box sx={{ width: '80%', padding: '40px 20px' }}>
      <LiveByCountryForm
        countries={countries}
        selectedCase={selectedCase}
        selectedCountry={selectedCountry}
        dateFrom={dateFrom}
        updateParams={updateParams}
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
