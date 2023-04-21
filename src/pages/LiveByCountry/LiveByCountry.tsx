import { useEffect, useState } from 'react';
import './LiveByCountry.scss';
import { LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';
import { LiveByCountryList } from '../../components/LiveByCountryList/LiveByCountry';

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
  }, [])

  return (
    <div className='by-country'>
      <h3>Live by Country Content</h3>
      <p>{'date from: ' + dateFrom}</p>
      <p>{'country: ' + country}</p>

      <LiveByCountryList liveByCountryData={liveByCountryData} />

    </div>
  );
};