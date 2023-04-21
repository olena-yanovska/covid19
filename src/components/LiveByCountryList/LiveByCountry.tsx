// import DatePicker from "react-datepicker";
import { LiveByCountryData } from '../../types/types';
import './LiveByCountryList.scss';

interface Props {
  liveByCountryData: LiveByCountryData[],
}

export const LiveByCountryList: React.FC<Props> = ({ liveByCountryData }) => {
  return (
    <div className='LiveByCountryList'>
      <ul>
        {liveByCountryData.map((item, index) => (
          <li key={index}>
            {String(item.Date).slice(0,10) + ' - ' + item.Province + ' - Confirmed cased: ' + item.Confirmed}
          </li>
        ))}
      </ul>
    </div>
  );
};
