import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { statusFiltersEnum, timelineFiltersEnum } from '../../types/task.types';
import { useTasks } from '../../contexts/tasks.provider';

type ToggleButtonsProps = {
  filtersArray: statusFiltersEnum[] | timelineFiltersEnum[],
  buttonsfor?: 'status' | 'timeline'
}

export default function ToggleButtons(props: ToggleButtonsProps) {
  const { filtersArray, buttonsfor } = props;

  const { setFilters } = useTasks();

  const [alignment, setAlignment] = React.useState<string | null>(filtersArray[0]);

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setFilters(prev => ({...prev, [buttonsfor as string]: newAlignment as statusFiltersEnum | timelineFiltersEnum}));
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color='primary'
      className='togglebuttons--container'
    >
      <ToggleButton value={filtersArray[0]} aria-label="left aligned" className='toggle__button'>
        {filtersArray[0]}
      </ToggleButton>
      <ToggleButton value={filtersArray[1]} aria-label="centered" className='toggle__button'>
        {filtersArray[1]}
      </ToggleButton>
      <ToggleButton value={filtersArray[2]} aria-label="right aligned" className='toggle__button'>
        {filtersArray[2]}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}