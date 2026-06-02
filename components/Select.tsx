/**
 * Select — dropdown with a clean shadcn-y chevron, matching our prototype.
 *
 * The chevron position + size + the option list styling are all sourced from
 * theme.ts so this wrapper stays thin. Options can be either strings or
 * { value, label } objects — pick whichever feels right at the call site.
 *
 * Usage:
 *   <Select label="Client" value={client} onChange={setClient} options={['Hexum', 'Edie Games', ...]} />
 *   <Select label="Status" options={[
 *     { value: 'online',  label: 'Online' },
 *     { value: 'offline', label: 'Offline' },
 *   ]} />
 */

import { forwardRef } from 'react';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Option = string | { value: string; label: React.ReactNode; disabled?: boolean };

export interface SelectProps extends Omit<MuiSelectProps, 'label' | 'variant' | 'size' | 'children'> {
  label?:       string;
  description?: string;
  options:      Option[];
  placeholder?: string;
  required?:    boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  { label, description, options, placeholder, required, value, sx, ...rest },
  ref,
) {
  const fieldId = label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined;

  return (
    <Box sx={sx}>
      {label && (
        <FormLabel htmlFor={fieldId} sx={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'text.secondary', mb: 0.75 }}>
          {label}{required && <Box component="span" sx={{ color: 'error.main', ml: '2px' }}>*</Box>}
        </FormLabel>
      )}
      <MuiSelect
        ref={ref}
        id={fieldId}
        size="small"
        variant="outlined"
        fullWidth
        IconComponent={ExpandMoreIcon}
        displayEmpty
        value={value ?? ''}
        renderValue={(v) => {
          if (!v) return <Box component="span" sx={{ color: 'text.disabled' }}>{placeholder || 'Select…'}</Box>;
          const opt = options.find(o => (typeof o === 'string' ? o : o.value) === v);
          return typeof opt === 'string' ? opt : opt?.label ?? String(v);
        }}
        sx={{ borderRadius: 1 }}
        MenuProps={{ PaperProps: { sx: { mt: 0.5 } } }}
        {...rest}
      >
        {options.map((opt) => {
          const value    = typeof opt === 'string' ? opt : opt.value;
          const label    = typeof opt === 'string' ? opt : opt.label;
          const disabled = typeof opt === 'string' ? false : Boolean(opt.disabled);
          return (
            <MenuItem key={value} value={value} disabled={disabled}>
              {label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </Box>
  );
});
