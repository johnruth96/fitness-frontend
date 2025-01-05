import React from 'react'
import {MenuItem, TextField,} from '@mui/material'
import {TextFieldProps} from '@mui/material/TextField/TextField'

export type SelectGroupInputProps = Omit<TextFieldProps, 'onChange'> & {
    data: Array<{ id: number, name: string }>
    value: string
    onChange: (value: string) => void
    allowEmpty?: boolean
    label?: string
}


export const SelectGroupInput = ({
                                     data,
                                     value,
                                     onChange,
                                     allowEmpty,
                                     label,
                                     ...props
                                 }: SelectGroupInputProps) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={(evt) => onChange(evt.target.value)}
            select
            {...props}
        >
            {(value === '' || allowEmpty) && (
                <MenuItem value="">
                    <em>---</em>
                </MenuItem>
            )}

            {data.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                    {item.name}
                </MenuItem>
            ))}
        </TextField>
    )
}