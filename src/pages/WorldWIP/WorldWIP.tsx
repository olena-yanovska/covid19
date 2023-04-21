import { useEffect, useState } from 'react';
import './WorldWIP.scss';
import { WorldWipData } from '../../types/types';
import { getWorldWipData } from '../../api/getData';

export const WorldWIP: React.FC = () => {
  const [worldWipData, setWorldWipData] = useState<WorldWipData[]>([]);

  const baseUrl = 'https://api.covid19api.com/world';
  const dateFrom = '2023-01-01';
  const dateTo = '2023-01-06';
  const fullUrl = baseUrl + '?from=' + dateFrom + '&to=' + dateTo;

  useEffect(() => {
    const getDataWorld = async () => {
      try {
        console.log('getDataWorld request')
        const res = await getWorldWipData(fullUrl);

        if (res) {
          setWorldWipData(res);
        }
      } catch (error) {
        console.log('error WorldWipData');
      }
    };

    getDataWorld();

    return () => {
      console.log('WorldWipData unmounted')
    }
  }, [worldWipData])

  return (
    <div className='world-wip'>
      <h3>WorldWIP Content</h3>
      <p>Date from: {dateFrom}</p>
      <p>Date to: {dateTo}</p>
      <br />
      <p>Case: Confirmed</p>

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