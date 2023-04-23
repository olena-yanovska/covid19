import { useEffect, useState } from 'react';
import './LiveByCountry.scss';
import { LiveByCountryCases, LiveByCountryData } from '../../types/types';
import { getLiveByCountryData } from '../../api/getData';
import { LiveByCountryChart } from '../../components/LiveByCountryChart/LiveByCountryChart';
import { LiveByCountryForm } from '../../components/LiveByCountryForm/LiveByCountryForm';

export const LiveByCountry: React.FC = () => {
  const [liveByCountryData, setLiveByCountryData] = useState<LiveByCountryData[]>([]);
  const [selectedCase, setSelectedCase] = useState<LiveByCountryCases>(LiveByCountryCases.Confirmed);

  const url = 'https://api.covid19api.com/live/country/ukraine/status/confirmed/date/2021-09-01T13:13:30Z';


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
  }, []);

  const handleSubmit = (selectedCase: LiveByCountryCases) => {
    console.log(`Selected LiveByCountry case: ${selectedCase}`);
    setSelectedCase(selectedCase);
  }

  return (
    <div className='by-country'>
      <LiveByCountryForm 
        onSubmit={handleSubmit} 
        selectedCase={selectedCase} 
        setSelectedCase={setSelectedCase} 
      />

      <LiveByCountryChart 
        liveByCountryData={liveByCountryData} 
        selectedCase={selectedCase}
      />
    </div>
  );
};
