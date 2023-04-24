import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { LiveByCountryData } from '../../types/types';

import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
  liveByCountryData: LiveByCountryData[],
  selectedCase: string;
  isLoading: boolean,
}

export const LiveByCountryChart: React.FC<Props> = ({ liveByCountryData, selectedCase, isLoading }) => {
  interface LiveByCountryData {
    [key: string]: any;
  }

  interface PreparedData {
    [key: string]: any;
  }

  const getPreparedData = (liveByCountryData: LiveByCountryData[]) => {
    const buffer: PreparedData = {};
    const prepared: any[] = [];

    for (const obj of liveByCountryData) {
      if (buffer[obj.Date]) {
        buffer[obj.Date] += obj[selectedCase];
      } else {
        buffer[obj.Date] = obj[selectedCase];
      }
    }

    for (const key in buffer) {
      const obj = {
        Date: key,
        [selectedCase]: buffer[key]
      }
      prepared.push(obj);
    }

    const clearedDate = prepared.map((obj) => {
      return {
        ...obj,
        "Date": String(obj.Date).slice(0, 10)
      }
    })

    return clearedDate;
  };

  const preparedData = getPreparedData(liveByCountryData);

  return (
    <>
      {liveByCountryData.length === 0 ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">No country data for the selected date range</Alert>
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
