import {
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip
} from 'recharts';
import { WorldWipData } from '../../types/types';
import './WorldWipList.scss';

interface Props {
  worldWipData: WorldWipData[],
}

export const WorldWipList: React.FC<Props> = ({ worldWipData }) => {
  return (
    <div className='LiveByCountryList'>
      <ul>
        {worldWipData.map((item, index) => (
          <li key={index}>
            Date: {String(item.Date).slice(0, 10)} - Confirmed cases: {item.NewConfirmed}
          </li>
        ))}
      </ul>

      <LineChart
        width={600}
        height={300}
        data={worldWipData}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
      >
        <Line 
          type="monotone"
          dataKey="NewConfirmed"
          stroke="#8884d8"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};