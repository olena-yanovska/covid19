import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Country } from '../../types/types';
import dayjs from 'dayjs';

interface Props {
  countries: Country[],
  selectedCase: string,
  selectedCountry: string,
  dateFrom: string,
  updateParams: (params: { [key: string]: string }) => void,
  updateSessionStorage: (value: string) => void,
}

export const LiveByCountryForm: React.FC<Props> = ({
  countries,
  selectedCase,
  selectedCountry,
  dateFrom,
  updateParams,
  updateSessionStorage,
}) => {
  
  function changeDate(newValue: string) {
    if (newValue) {
      const formattedDate = dayjs(newValue).format('YYYY-MM-DD');

      updateParams({ dateFrom: formattedDate });
    } else {
      updateParams({ dateFrom: String(dateFrom) });
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, marginBottom: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date from"
            defaultValue={dayjs(dateFrom)}
            value={dayjs(dateFrom)}
            onChange={(value) => changeDate(String(value))}
          />
        </LocalizationProvider>

        <FormControl>
          <Select
            value={selectedCountry}
            onChange={(event: SelectChangeEvent<string>) => updateSessionStorage(event.target.value as string)}
          >
            {countries.map((country) => (
              <MenuItem key={country.Slug} value={country.Slug}>
                {country.Country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            labelId="case-select-label"
            id="case-select"
            value={selectedCase}
            onChange={(event: SelectChangeEvent<string>) =>updateParams({ case: event.target.value })}
          >
            <MenuItem value='Confirmed'>Confirmed</MenuItem>
            <MenuItem value='Deaths'>Deaths</MenuItem>
            <MenuItem value='Recovered'>Recovered</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack sx={{ width: '100%', marginBottom: '10px' }} spacing={2}>
        <Alert severity="info">
          Please note that country statistics are available for dates from June 25, 2021 to September 9, 2022.
        </Alert>
      </Stack>
    </>
  );
};
