import { countries } from '../../api/countries';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  selectedCase: string,
  setSelectedCase: any,
  selectedCountry: string,
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>,
  dateFrom: Dayjs,
  setDateFrom: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>,
}

export const LiveByCountryForm: React.FC<Props> = ({
  selectedCase,
  setSelectedCase,
  selectedCountry,
  setSelectedCountry,
  dateFrom,
  setDateFrom,
}) => {
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date from"
          defaultValue={dayjs(dateFrom)}
          value={dateFrom}
          onChange={(newValue) => {
            if (newValue) {
              setDateFrom(newValue);
            } else {
              setDateFrom(dateFrom);
            }
          }}
        />
      </LocalizationProvider>

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
