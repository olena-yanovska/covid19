import { useEffect, useState } from 'react';
import './WorldWIP.scss';
import { WorldWipData } from '../../types/types';
import { getWorldWipData } from '../../api/getData';
import { WorldWipList } from '../../components/WorldWipList/WorldWipList';

export const WorldWIP: React.FC = () => {
  const [worldWipData, setWorldWipData] = useState<WorldWipData[]>([]);

  const baseUrl = 'https://api.covid19api.com/world';
  const dateFrom = '2023-01-01';
  const dateTo = '2023-01-06';
  const fullUrl = baseUrl + '?from=' + dateFrom + '&to=' + dateTo;

  useEffect(() => {
    const getDataWorld = async () => {
      try {
        const res = await getWorldWipData(fullUrl);

        if (res) {
          const sortedRes = res.sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
          
          setWorldWipData(sortedRes);
        }
      } catch (error) {
        console.log('error WorldWipData');
      }
    };

    getDataWorld();
  }, [])

  return (
    <div className='world-wip'>
      <h3>WorldWIP Content</h3>
      <p>Date from: {dateFrom}</p>
      <p>Date to: {dateTo}</p>
      <br />
      <p>Case: Confirmed</p>

      <WorldWipList worldWipData={worldWipData} />
    </div>
  );
};
