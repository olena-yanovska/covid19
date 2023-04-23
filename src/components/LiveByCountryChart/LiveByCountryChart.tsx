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


interface Props {
  liveByCountryData: LiveByCountryData[],
  selectedCase: string;
}

export const LiveByCountryChart: React.FC<Props> = ({ liveByCountryData, selectedCase }) => {
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

    return prepared;
  };

  const preparedData = getPreparedData(liveByCountryData);

  return (
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
  );
};
