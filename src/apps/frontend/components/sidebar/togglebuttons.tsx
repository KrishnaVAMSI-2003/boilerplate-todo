import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    console.log(event.target);
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
      <ToggleButton value="left" aria-label="left aligned" className='toggle__button'>
        All
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered" className='toggle__button'>
        Completed
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned" className='toggle__button'>
        Active
      </ToggleButton>
    </ToggleButtonGroup>
  );
}