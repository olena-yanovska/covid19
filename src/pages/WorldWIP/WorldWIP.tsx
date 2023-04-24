import { useEffect, useState } from 'react';
import { WorldWipCases, WorldWipData } from '../../types/types';
import { getWorldWipData } from '../../api/getData';
import { WorldWipChart } from '../../components/WorldWipChart/WorldWipChart';
import { WorldWipForm } from '../../components/WorldWipForm/WorldWipForm';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'react-router-dom';

export const WorldWIP: React.FC = () => {
  const [worldWipData, setWorldWipData] = useState<WorldWipData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams({
    case: WorldWipCases.NewConfirmed,
    dateFrom: '2022-01-01',
    dateTo: '2023-01-06',
  });
  const selectedCase = searchParams.get('case') || '';
  const dateFrom1= searchParams.get('dateFrom') || '';
  const dateTo1= searchParams.get('dateTo') || '';

  const baseUrl = 'https://api.covid19api.com/world';
  const fullUrl = baseUrl + '?from=' + dateFrom1 + '&to=' + dateTo1;

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

  function updateParams(params: { [key: string]: string | '' }) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });

    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ width: '80%', padding: '50px' }}>
      <WorldWipForm
        selectedCase={selectedCase}
        dateFrom={dateFrom1}
        dateTo={dateTo1}
        updateParams={updateParams}
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
