import React from 'react'
import {Checkbox, FormControlLabel, FormGroup, FormGroupProps,} from '@mui/material'

interface Item {
    id: number
    name: string
}

export type CheckboxGroupInputProps = Omit<FormGroupProps, 'onChange'> & {
    data: Item[]
    value: string[]
    onChange: (value: string[]) => void
    toggleAll?: boolean
}

export const CheckboxGroupInput = ({
                                       data,
                                       value,
                                       onChange,
                                       toggleAll,
                                   }: CheckboxGroupInputProps) => {
    const isChecked = (obj: Item) => value.includes(obj.id.toString())
    const onClick = (obj: Item) => {
        if (isChecked(obj))
            onChange(value.filter((v) => v !== obj.id.toString()))
        else onChange([...value, obj.id.toString()])
    }

    const areAllChecked = () => data.every(isChecked)
    const onToggleClick = () => {
        onChange(areAllChecked() ? [] : data.map((obj) => obj.id.toString()))
    }

    return (
        <FormGroup>
            {toggleAll && (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={areAllChecked()}
                            onChange={onToggleClick}
                        />
                    }
                    label={'Alle'}
                />
            )}

            {data.map((obj) => (
                <FormControlLabel
                    key={obj.id}
                    control={
                        <Checkbox
                            checked={isChecked(obj)}
                            onChange={() => onClick(obj)}
                        />
                    }
                    label={obj.name}
                />
            ))}
        </FormGroup>
    )
}