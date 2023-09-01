import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutoComplete = (props) => {
  const { name, control, options, label, error } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className={`relative ${error ? "mb-2" : ""}`}>
          <Autocomplete
            onChange={field.onChange}
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 270, height: 50 }}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
          {error && (
            <div className="absolute text-xs text-warningRed left-2 mt-2">
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default AutoComplete;
