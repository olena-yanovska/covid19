import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import { WorldWipCases, WorldWipData } from '../../types/types';
import './WorldWipList.scss';

interface Props {
  worldWipData: WorldWipData[],
  selectedCase: WorldWipCases,
}

export const WorldWipList: React.FC<Props> = ({ worldWipData,selectedCase }) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        data={worldWipData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={selectedCase} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};