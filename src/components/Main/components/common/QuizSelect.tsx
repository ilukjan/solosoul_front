import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

// import select_icon from '../../assets/svg/select_icon.svg';

function QuizSelect({
  value,
  values,
  onChange,
  label,
}: {
  value: number | string;
  values: Array<{ value: number | string; label: number | string }>;
  onChange: (e: SelectChangeEvent<string | number>) => void;
  label: string;
}) {
  return (
    <FormControl
      fullWidth
      sx={{
        '& .MuiFormLabel-root': {
          color: '#717889',
          fontFamily: 'sfpro400',
          fontSize: '20px',
          paddingLeft: '5px',
        },
        '& .MuiInputLabel-shrink': {
          display: 'none',
        },
        '& .MuiSelect-select': {
          paddingRight: '5px !important',
        },
        '& fieldset': {
          border: 'none',
        },
      }}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        variant="outlined"
        value={value}
        onChange={onChange}
        // IconComponent={() => <img style={{ pointerEvents: 'none' }} src={select_icon} alt="select"></img>}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: 'none',
          paddingRight: '20px',
          paddingLeft: '10px',
          height: '66px',
          color: '#01091C',
          fontFamily: 'sfpro700',
          fontSize: '20px',
        }}
      >
        {values.map((selectValue, index) => (
          <MenuItem key={selectValue.value} value={selectValue.value}>
            {selectValue.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default QuizSelect;
