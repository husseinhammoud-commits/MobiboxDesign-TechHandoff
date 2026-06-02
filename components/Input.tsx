/**
 * Input — text/number/email/etc. wrapped over MUI's TextField.
 *
 * Standardizes:
 *   - Compact size (we don't use Material's default "large" 56px-tall inputs)
 *   - Label above (not floating) — feels lighter and matches our prototype
 *   - Optional `leftIcon` (search inputs) and `description` (helper text below)
 *
 * Usage:
 *   <Input label="Offer name" placeholder="e.g. Weekly Premium" />
 *   <Input label="Search" leftIcon={<SearchIcon />} value={q} onChange={…} />
 *   <Input label="Cap amount" type="number" description="Subscriptions per day" />
 *   <Input label="Operator" error="Operator is required" />
 */

import { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, FormLabel, Typography } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'label' | 'variant' | 'size' | 'error'> {
  label?:       string;
  description?: string;
  error?:       string;
  leftIcon?:    React.ReactNode;
  rightIcon?:   React.ReactNode;
  required?:    boolean;
}

export const Input = forwardRef<HTMLDivElement, InputProps>(function Input(
  { label, description, error, leftIcon, rightIcon, required, InputProps: inputProps, id, sx, ...rest },
  ref,
) {
  const fieldId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <Box sx={sx}>
      {label && (
        <FormLabel
          htmlFor={fieldId}
          sx={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'text.secondary', mb: 0.75 }}
        >
          {label}{required && <Box component="span" sx={{ color: 'error.main', ml: '2px' }}>*</Box>}
        </FormLabel>
      )}
      <TextField
        ref={ref}
        id={fieldId}
        size="small"
        variant="outlined"
        fullWidth
        error={Boolean(error)}
        helperText={error || description}
        InputProps={{
          ...inputProps,
          startAdornment: leftIcon ? <InputAdornment position="start">{leftIcon}</InputAdornment> : inputProps?.startAdornment,
          endAdornment:   rightIcon ? <InputAdornment position="end">{rightIcon}</InputAdornment>   : inputProps?.endAdornment,
        }}
        FormHelperTextProps={{
          sx: { fontSize: 12, mt: 0.5, ml: 0, color: error ? 'error.dark' : 'text.secondary' },
        }}
        {...rest}
      />
    </Box>
  );
});
