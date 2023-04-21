import { useEffect, useState } from 'react';
import './ByCountry.scss';
import { LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';

export const ByCountry: React.FC = () => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);

  const url = 'https://api.covid19api.com/live/country/ukraine/status/confirmed/date/2022-09-01T13:13:30Z';

  const dateFrom = '2022-09-01';
  const country = 'Ukraine';

  useEffect(() => {
    const getDataCountry = async () => {
      try {
        const res = await getLiveByCountryData(url);

        if (res) {
          setLiveByCountryData(res);
        }
      } catch (error) {
        console.log('error liveByCountryData');
      }
    };

    getDataCountry();
  }, [liveByCountryData])

  return (
    <div className='by-country'>
      <h3>By Country Content</h3>
      <br/>
      <p>{'date from: ' + dateFrom}</p>
      <p>{'country: ' + country}</p>
      <p></p>
      <ul>
        {liveByCountryData.map((item) => (
          <li>{String(item.Date).slice(0,10) + ' - ' + item.Province + ' - Confirmed cased: ' + item.Confirmed}</li>
        ))}
      </ul>
    </div>
  );
};