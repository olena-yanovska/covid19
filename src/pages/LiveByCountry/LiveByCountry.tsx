import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';
import { LiveByCountryChart } from '../../components/LiveByCountryChart/LiveByCountryChart';
import { LiveByCountryForm } from '../../components/LiveByCountryForm/LiveByCountryForm';
import { countries } from '../../api/countries';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs, { Dayjs } from 'dayjs';

export const LiveByCountry: React.FC = () => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultDateFrom: Dayjs = dayjs('2022-01-01');
  const [dateFrom, setDateFrom] = useState<Dayjs>(defaultDateFrom);

  const [searchParams, setSearchParams] = useSearchParams({
    case: 'Confirmed',
    country: 'ukraine',
  });
  const selectedCase = searchParams.get('case') || '';
  const selectedCountry = searchParams.get('country') || '';

  useEffect(() => {
    function getFullUrl() {
      const baseUrl = 'https://api.covid19api.com/live/country/';
      const fullUrl = `${baseUrl}${selectedCountry}` +
        `/status/${selectedCase.toLocaleLowerCase()}/date/${dateFrom}`;

        console.log('full url', fullUrl)

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

  return (
    <Box sx={{ width: '80%', padding: '50px' }}>
      <LiveByCountryForm
        selectedCase={selectedCase}
        selectedCountry={selectedCountry}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
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
