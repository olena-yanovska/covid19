import { WorldWipCases } from '../../types/types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Props {
  selectedCase: string,
  dateFrom: string,
  dateTo: string,
  updateParams: (params: {[key: string]: string})=> void,
}

export const WorldWipForm: React.FC<Props> = ({
  selectedCase,
  dateFrom,
  dateTo,
  updateParams,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 3, marginBottom: '20px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date from"
          defaultValue={dayjs(dateFrom)}
          value={dayjs(dateFrom)}
          onChange={(newValue) => {
            if (newValue) {
              const formattedDate = dayjs(newValue).format('YYYY-MM-DD');

              updateParams({ dateFrom: formattedDate });
            } else {
              updateParams({ dateFrom: String(dateFrom) });
            }
          }}
        />

        <DatePicker
          label="Date to"
          defaultValue={dayjs(dateTo)}
          value={dayjs(dateTo)}
          onChange={(newValue) => {
            if (newValue) {
              const formattedDate = dayjs(newValue).format('YYYY-MM-DD');

              updateParams({ dateTo: formattedDate });
            } else {
              updateParams({ dateTo: String(dateTo) });
            }
          }}
        />
      </LocalizationProvider>

      <FormControl>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCase}
          onChange={(event: SelectChangeEvent<string>) => 
            updateParams({ case: event.target.value as string })}
        >
          <MenuItem value={WorldWipCases.NewConfirmed}>New Confirmed</MenuItem>
          <MenuItem value={WorldWipCases.NewDeaths}>New Deaths</MenuItem>
          <MenuItem value={WorldWipCases.TotalDeaths}>Total Deaths</MenuItem>
          <MenuItem value={WorldWipCases.NewRecovered}>New Recovered</MenuItem>
          <MenuItem value={WorldWipCases.TotalRecovered}>Total Recovered</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
