import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import * as React from 'react';

// Styled Select component for custom color
const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.dark,
  },
}));

export default function BasicSelect({ onChange }) {
  const [days, setDays] = React.useState(7); // Default to 30 days

  const handleChange = (event) => {
    const value = event.target.value;
    setDays(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Box sx={{ minWidth: 120, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="days-select-label">Days</InputLabel>
        <CustomSelect
          labelId="days-select-label"
          id="days-select"
          value={days}
          label="Days"
          onChange={handleChange}
        >
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={14}>14 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={90}>90 Days</MenuItem>
        </CustomSelect>
      </FormControl>
    </Box>
  );
}
