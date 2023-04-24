import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import { WorldWipData } from '../../types/types';
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
  worldWipData: WorldWipData[],
  selectedCase: string,
}

export const WorldWipChart: React.FC<Props> = ({ worldWipData, selectedCase }) => {
  const getPreparedData = (worldWipData: WorldWipData[]) => {
    const clearedDate = worldWipData.map((obj) => {
      return {
        ...obj,
        "Date": String(obj.Date).slice(0, 10)
      }
    })

    return clearedDate;
  };

  const preparedData = getPreparedData(worldWipData);

  return (
    <>
      {preparedData.length === 0 ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">
            Something went wrong. Try to refresh a page or change date ranges.
          </Alert>
        </Stack>
      ) : (
        <Box sx={{
          width: '100%',
          height: '350px',
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={preparedData}
              margin={{
                top: 40,
                left: 20,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={selectedCase} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  );
};
