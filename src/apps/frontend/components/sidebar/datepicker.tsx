import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddTaskParams } from '../../types/task.types';

type DatePickerValueProps = {
  setTask: React.Dispatch<React.SetStateAction<AddTaskParams>>
}

export default function DatePickerValue(props: DatePickerValueProps) {
  const { setTask } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Due Date"
          value={dayjs(new Date)}
          onChange={(newValue) => setTask(prev => ({...prev, dueDate: newValue?.toDate()}))}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}