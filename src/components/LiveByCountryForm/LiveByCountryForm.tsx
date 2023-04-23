import { countries } from '../../api/countries';
import { LiveByCountryCases } from '../../types/types';
import './LiveByCountryForm.scss';

interface Props {
  selectedCase: LiveByCountryCases,
  setSelectedCase: React.Dispatch<React.SetStateAction<LiveByCountryCases>>,
  selectedCountry: string,
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>,
}

export const LiveByCountryForm: React.FC<Props> = ({
  selectedCase,
  setSelectedCase,
  selectedCountry,
  setSelectedCountry,
}) => {

  const dateFrom = '2022-09-09';
  const sortedCountries = countries
    .sort((a, b) => a.Slug.localeCompare(b.Country));

  const handleSelectCase = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as LiveByCountryCases;
    setSelectedCase(selectedValue);
  };

  const handleSelectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    console.log('set selected country')
  };

  return (
    <div className='liveByCountryForm'>
      <h3>Live by Country Content</h3>
      <p>{'date from: ' + dateFrom}</p>

      <form >
        <div>
          <label>
            Select a country:
            <select value={selectedCountry} onChange={handleSelectCountry}>
              {sortedCountries.map((country) => (
                <option key={country.Slug} value={country.Slug}>{country.Country}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Select a case:
          <select value={selectedCase} onChange={handleSelectCase}>
            <option value={LiveByCountryCases.Confirmed}>Confirmed</option>
            <option value={LiveByCountryCases.Deaths}>Deaths</option>
            <option value={LiveByCountryCases.Recovered}>Recovered</option>
          </select>
        </label>
      </form>
    </div>
  );
};
