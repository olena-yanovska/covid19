import { WorldWipCases } from '../../types/types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  selectedCase: string,
  setSelectedCase: React.Dispatch<React.SetStateAction<string>>,
}

export const WorldWipForm: React.FC<Props> = ({
  selectedCase,
  setSelectedCase
}) => {

  const dateFrom = '2021-01-01';
  const dateTo = '2023-01-06';

  const handleSelectChange = (value: string) => {
    setSelectedCase(value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
       <p>Date from: {dateFrom}</p>
       <p>Date to: {dateTo}</p>

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
