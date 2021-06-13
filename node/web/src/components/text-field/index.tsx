import { ChangeEvent } from 'react'

import { TextField as MuiTextField } from '@material-ui/core'

export interface TextFieldProps {
  label?: string;
  fullWidth?: boolean;
  marginTop?: number;
  marginBottom?: number;
  value?: any;
  onTextChange?: (
    newValue: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const TextField = ({
  label,
  fullWidth,
  marginBottom = 0,
  marginTop = 0,
  value,
  onTextChange
}: TextFieldProps) => {
  /**
   * Handles
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!onTextChange) {
      return
    }

    if (e.target.value) {
      onTextChange(e.target.value, e)
    }
  }

  /**
   * Returns
   */
  return (
    <MuiTextField
      label={label}
      fullWidth={fullWidth}
      style={{ marginTop, marginBottom }}
      value={value}
      onChange={handleChange}
    />
  )
}
