import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddTaskParams, Task } from '../../types/task.types';

type DatePickerValueProps = {
  defaultDate: Date;
  setTask: React.Dispatch<React.SetStateAction<AddTaskParams | Task>>
}

export default function DatePickerValue(props: DatePickerValueProps) {
  const { defaultDate, setTask } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Due Date"
          value={dayjs(defaultDate)}
          onChange={(newValue) => setTask(prev => ({...prev, dueDate: newValue?.toDate()}))}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}