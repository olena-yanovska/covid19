import { LiveByCountryCases, WorldWipCases } from '../../types/types';
import './LiveByCountryForm.scss';

interface Props {
  onSubmit: (selectedCase: LiveByCountryCases) => void,
  selectedCase: LiveByCountryCases,
  setSelectedCase: React.Dispatch<React.SetStateAction<LiveByCountryCases>>,
}

export const LiveByCountryForm: React.FC<Props> = ({ 
  onSubmit, 
  selectedCase, 
  setSelectedCase 
}) => {

  const dateFrom = '2022-09-09';
  const country = 'Ukraine';

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as LiveByCountryCases;
    setSelectedCase(selectedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedCase);
  };

  return (
    <div>
      <h3>Live by Country Content</h3>
      <p>{'date from: ' + dateFrom}</p>
      <p>{'country: ' + country}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Select a case:
          <select value={selectedCase} onChange={handleSelectChange}>
            <option value={LiveByCountryCases.Confirmed}>Confirmed</option>
            <option value={LiveByCountryCases.Deaths}>Deaths</option>
            <option value={LiveByCountryCases.Recovered}>Recovered</option>
          </select>
        </label>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};
