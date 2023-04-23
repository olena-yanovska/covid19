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

interface Props {
  worldWipData: WorldWipData[],
  selectedCase: string,
}

export const WorldWipChart: React.FC<Props> = ({ worldWipData, selectedCase }) => {
  return (
    <Box sx={{
      width: '100%',
      height: '350px',
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={worldWipData}
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
