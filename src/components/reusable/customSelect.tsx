import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type CustomSelectProps = {
  id: string;
  label: string;
  value: string;
  onSelect: (value: string) => void;
  values: string[];
};

const CustomSelect = ({
  id,
  label,
  value,
  onSelect,
  values,
}: CustomSelectProps) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          id={id}
          value={value}
          label={label}
          sx={{ minWidth: 120 }}
          onChange={(event: SelectChangeEvent) => {
            onSelect(event.target.value as string);
          }}
        >
          <MenuItem key={"clear"} value={undefined}>
            NONE
          </MenuItem>
          {values.map((item: string) => (
            <MenuItem key={item} value={item.toUpperCase()}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
