import { startOfDay } from 'date-fns'
import { TextField } from '@material-ui/core'
import { useMemo, ChangeEvent } from 'react'

export interface DateFieldProps {
  label?: string;
  fullWidth?: boolean;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  required?: boolean;
  value?: Date;
  onDateChange?: (
    newValue: Date,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const DateField = ({
  label,
  fullWidth,
  marginBottom = 0,
  marginTop = 0,
  marginRight = 0,
  required,
  value,
  onDateChange
}: DateFieldProps) => {
  /**
   * Memos
   */
  const VALUE = useMemo(() => {
    if (!value) {
      return ''
    }

    let date = String(value.getDate())
    if (date.length === 1) {
      date = `0${date}`
    }
    let month = String(value.getMonth() + 1)
    if (month.length === 1) {
      month = `0${month}`
    }
    const year = value.getFullYear()

    return `${year}-${month}-${date}`
  }, [value])

  /**
   * Handles
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!onDateChange) {
      return
    }

    const [year, month, date] = e.target.value.split('-')

    onDateChange(
      startOfDay(new Date(Number(year), Number(month) - 1, Number(date))),
      e
    )
  }

  /**
   * Returns
   */
  return (
    <TextField
      required={required}
      type="date"
      label={label}
      fullWidth={fullWidth}
      style={{ marginTop, marginBottom, marginRight }}
      value={VALUE}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true
      }}
    />
  )
}
