import { countries } from '../../api/countries';
import { LiveByCountryCases } from '../../types/types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  selectedCase: string,
  setSelectedCase: any,
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

  const handleSelectCase = (value: string) => {
    setSelectedCase(value);
  };

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
    console.log('set selected country')
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <p>{'date from: ' + dateFrom}</p>

      <FormControl>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          onChange={(event: SelectChangeEvent<string>) => handleSelectCountry(event.target.value as string)}
        >
          {sortedCountries.map((country) => (
            <MenuItem key={country.Slug} value={country.Slug}>{country.Country}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <Select
          labelId="case-select-label"
          id="case-select"
          value={selectedCase}
          onChange={(event: SelectChangeEvent<string>) => handleSelectCase(event.target.value)}
        >
          <MenuItem value='Confirmed'>Confirmed</MenuItem>
          <MenuItem value='Deaths'>Deaths</MenuItem>
          <MenuItem value='Recovered'>Recovered</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
