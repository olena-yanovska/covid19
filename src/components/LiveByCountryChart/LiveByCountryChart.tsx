import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { LiveByCountryCases, LiveByCountryData } from '../../types/types';
import './LiveByCountryChart.scss';

interface Props {
  liveByCountryData: LiveByCountryData[],
  selectedCase: LiveByCountryCases;
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
  // console.log(preparedData)

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        data={preparedData}
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
