import { WorldWipCases } from '../../types/types';

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
  setSelectedCase: React.Dispatch<React.SetStateAction<string>>,
  dateFrom: Dayjs,
  setDateFrom: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>,
  dateTo: Dayjs,
  setDateTo: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>,
}

export const WorldWipForm: React.FC<Props> = ({
  selectedCase,
  setSelectedCase,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  const handleSelectChange = (value: string) => {
    setSelectedCase(value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, marginBottom: '20px' }}>
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

        <DatePicker
          label="Date to"
          defaultValue={dayjs(dateTo)}
          value={dateTo}
          onChange={(newValue) => {
            if (newValue) {
              setDateTo(newValue);
            } else {
              setDateTo(dateFrom);
            }
          }}
        />
      </LocalizationProvider>

      <FormControl>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCase}
          onChange={(event: SelectChangeEvent<string>) => handleSelectChange(event.target.value as string)}
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
