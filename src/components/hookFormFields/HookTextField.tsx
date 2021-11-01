import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const HookTextField = ({
  name = "",
  required = false,
  errorMessage = "This is required",
  label = "",
  form = {},
  type = "text",
  onChange = () => null,
  fullWidth = true,
  ...other
}) => {
  const {
    formState: { errors },
    control,
  } = form;

  return (
    <Controller
      render={({ field }) => (
        <TextField
          id={name}
          type={type}
          label={label}
          value={field.value}
          onChange={(e) => {
            onChange?.(e);
            field.onChange(e);
          }}
          inputRef={field.ref}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
          InputLabelProps={{ shrink: !!field.value }}
          fullWidth={fullWidth}
          {...other}
        />
      )}
      name={name}
      control={control}
      rules={{ required: !!required }}
      {...other}
    />
  );
};

export default HookTextField;
