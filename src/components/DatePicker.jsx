import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

const CustomDatePicker = (props) => {
  const { name, label, control, error, selectedValue, setSelectedValue } =
    props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="relative">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              value={selectedValue}
              sx={{ width: 270 }}
              onChange={(value) => {
                const date = new Date(value.$d);
                onChange(date);
                setSelectedValue(date);
              }}
            />
          </LocalizationProvider>
          {error && (
            <div className="absolute text-xs text-warningRed left-2 mt-1">
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default CustomDatePicker;
