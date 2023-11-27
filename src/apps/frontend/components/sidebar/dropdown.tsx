import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [Type, setType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 220,paddingY:'7px' }}>
      <FormControl style={{width:'100%'}}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={'official'}>Official</MenuItem>
          <MenuItem value={'personal'}>Personal</MenuItem>
          <MenuItem value={'hobby'}>Hobby</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}