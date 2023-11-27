import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AddTaskParams } from '../../types/task.types';

type DropdownProps = {
  setTask: React.Dispatch<React.SetStateAction<AddTaskParams>>
}

export default function BasicSelect(props: DropdownProps) {
  const { setTask } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setTask(prev => ({...prev, taskType: event.target.value as AddTaskParams['taskType']}));
  };

  return (
    <Box sx={{ minWidth: 220,paddingY:'7px' }}>
      <FormControl style={{width:'100%'}}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={'official'}
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