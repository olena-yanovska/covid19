import { useEffect, useState } from 'react';
import { LiveByCountryCases, LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';
import { LiveByCountryChart } from '../../components/LiveByCountryChart/LiveByCountryChart';
import { LiveByCountryForm } from '../../components/LiveByCountryForm/LiveByCountryForm';
import { countries } from '../../api/countries';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs, { Dayjs } from 'dayjs';

export const LiveByCountry: React.FC = () => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);
  const [selectedCase, setSelectedCase] = useState<string>('Confirmed');
  const [selectedCountry, setSelectedCountry] = useState<string>(countries.find(c => c.Country === 'Ukraine')!.Slug);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultDateFrom: Dayjs = dayjs('2022-01-01');
  const [dateFrom, setDateFrom] = useState<Dayjs>(defaultDateFrom);

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

  return (
    <Box sx={{ width: '80%', padding: '50px' }}>
      <LiveByCountryForm
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
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
