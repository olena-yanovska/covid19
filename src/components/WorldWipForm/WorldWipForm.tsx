import { WorldWipCases } from '../../types/types';
import './WorldWipForm.scss';

interface Props {
  onSubmit: (selectedCase: WorldWipCases) => void,
  selectedCase: WorldWipCases,
  setSelectedCase: React.Dispatch<React.SetStateAction<WorldWipCases>>,
}

export const WorldWipForm: React.FC<Props> = ({ 
  onSubmit, 
  selectedCase, 
  setSelectedCase 
}) => {

  const dateFrom = '2021-01-01';
  const dateTo = '2023-01-06';

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as WorldWipCases;
    setSelectedCase(selectedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedCase);
  };

  return (
    <div className='worldWipForm'>
      <h3>WorldWIP Content</h3>
      <p>Date from: {dateFrom}</p>
      <p>Date to: {dateTo}</p>
      <br />

      <form onSubmit={handleSubmit}>
        <label>
          Select a case:
          <select value={selectedCase} onChange={handleSelectChange}>
            <option value={WorldWipCases.NewConfirmed}>New Confirmed</option>
            <option value={WorldWipCases.NewDeaths}>New Deaths</option>
            <option value={WorldWipCases.TotalDeaths}>Total Deaths</option>
            <option value={WorldWipCases.NewRecovered}>New Recovered</option>
            <option value={WorldWipCases.TotalRecovered}>Total Recovered</option>
          </select>
        </label>
      </form>
    </div>
  );
};
