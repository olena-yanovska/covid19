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
            Date: {String(item.Date).slice(0,10)} - Confirmed cases: {item.NewConfirmed}
          </li>
        ))}
      </ul>
    </div>
  );
};