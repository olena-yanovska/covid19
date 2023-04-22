import { useEffect, useState } from 'react';
import './WorldWIP.scss';
import { WorldWipCases, WorldWipData } from '../../types/types';
import { getWorldWipData } from '../../api/getData';
import { WorldWipList } from '../../components/WorldWipList/WorldWipList';
import { WorldWipForm } from '../../components/WorldWipForm/WorldWipForm';

export const WorldWIP: React.FC = () => {
  const [worldWipData, setWorldWipData] = useState<WorldWipData[]>([]);
  const [selectedCase, setSelectedCase] = useState<WorldWipCases>(WorldWipCases.NewConfirmed);

  const baseUrl = 'https://api.covid19api.com/world';
  const dateFrom = '2021-01-01';
  const dateTo = '2023-01-06';
  const fullUrl = baseUrl + '?from=' + dateFrom + '&to=' + dateTo;

  useEffect(() => {
    const getDataWorld = async () => {
      try {
        const res = await getWorldWipData(fullUrl);

        if (res) {
          const sortedRes = res
            .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
          
          setWorldWipData(sortedRes);
        }
      } catch (error) {
        console.log('error WorldWipData');
      }
    };

    getDataWorld();
  }, []);

  const handleSubmit = (selectedCase: WorldWipCases) => {
    console.log(`Selected case: ${selectedCase}`);
    setSelectedCase(selectedCase);
  };

  return (
    <div className='world-wip'>
      <WorldWipForm 
        onSubmit={handleSubmit} 
        selectedCase={selectedCase} 
        setSelectedCase={setSelectedCase} 
      />
      <br/>
      <WorldWipList 
        worldWipData={worldWipData} 
        selectedCase={selectedCase} 
      />
    </div>
  );
};
