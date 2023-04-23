import { useEffect, useState } from 'react';
import { WorldWipCases, WorldWipData } from '../../types/types';
import { getWorldWipData } from '../../api/getData';
import { WorldWipChart } from '../../components/WorldWipChart/WorldWipChart';
import { WorldWipForm } from '../../components/WorldWipForm/WorldWipForm';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const WorldWIP: React.FC = () => {
  const [worldWipData, setWorldWipData] = useState<WorldWipData[]>([]);
  const [selectedCase, setSelectedCase] = useState<string>(WorldWipCases.NewConfirmed);

  const baseUrl = 'https://api.covid19api.com/world';
  const dateFrom = '2021-01-01';
  const dateTo = '2023-01-06';
  const fullUrl = baseUrl + '?from=' + dateFrom + '&to=' + dateTo;

  useEffect(() => {
    const getDataWorld = async () => {
      try {
        const res = await getWorldWipData(fullUrl);

        if (res) {
          const sortedRes = res
            .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));

          setWorldWipData(sortedRes);
        }
      } catch (error) {
        console.log('error WorldWipData');
      }
    };

    getDataWorld();
  }, []);

  const handleSubmit = (selectedCase: WorldWipCases) => {
    setSelectedCase(selectedCase);
  };

  return (
    <Box sx={{ width: '70%', padding: '30px' }}>
      <WorldWipForm
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
      />
      {worldWipData.length === 0 ? (
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
