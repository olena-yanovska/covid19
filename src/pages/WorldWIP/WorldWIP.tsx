import { useEffect, useState } from 'react';
import { WorldWipCases, WorldWipData } from '../../types/types';
import { getWorldWipData } from '../../api/getData';
import { WorldWipChart } from '../../components/WorldWipChart/WorldWipChart';
import { WorldWipForm } from '../../components/WorldWipForm/WorldWipForm';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs, { Dayjs } from 'dayjs';

export const WorldWIP: React.FC = () => {
  const [worldWipData, setWorldWipData] = useState<WorldWipData[]>([]);
  const [selectedCase, setSelectedCase] = useState<string>(WorldWipCases.NewConfirmed);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultDateFrom: Dayjs = dayjs('2022-01-01');
  const [dateFrom, setDateFrom] = useState<Dayjs>(defaultDateFrom);

  const defaultDateTo: Dayjs = dayjs('2023-01-06');
  const [dateTo, setDateTo] = useState<Dayjs>(defaultDateTo);

  const baseUrl = 'https://api.covid19api.com/world';
  const fullUrl = baseUrl + '?from=' + dateFrom + '&to=' + dateTo;

  useEffect(() => {
    const getDataWorld = async () => {
      setIsLoading(true);
      try {
        const res = await getWorldWipData(fullUrl);

        if (res) {
          const sortedRes = res
            .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));

          setWorldWipData(sortedRes);
        }
      } catch (error) {
        console.log('error WorldWipData');
      } finally {
        setIsLoading(false);
      }
    };

    getDataWorld();
  }, [fullUrl]);

  const handleSubmit = (selectedCase: WorldWipCases) => {
    setSelectedCase(selectedCase);
  };

  return (
    <Box sx={{ width: '80%', padding: '50px' }}>
      <WorldWipForm
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <WorldWipChart
          worldWipData={worldWipData}
          selectedCase={selectedCase}
        />
      )}
    </Box>
  );
};
