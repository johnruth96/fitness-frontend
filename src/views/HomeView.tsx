import React from 'react'
import {Page} from '../common/shared/Page'

import {reverseWorkoutAdd} from '../app/reverse'
import {DateCalendar, PickersDay, PickersDayProps} from '@mui/x-date-pickers'
import {Dayjs} from 'dayjs'
import {SxProps} from '@mui/material'
import {useGetWorkoutDatesQuery} from '../app/api'

interface WorkoutDayProps extends PickersDayProps<Dayjs> {
    workoutDates?: string[]
    isLoading: boolean
}

const WorkoutDay = (props: WorkoutDayProps) => {
    const {workoutDates = [], isLoading, day, ...other} = props

    const isSelected = workoutDates.includes(day.format('YYYY-MM-DD'))

    const sx: SxProps = isSelected
        ? {
            bgcolor: 'success.light',
        }
        : {}

    return <PickersDay {...other} day={day} sx={sx}/>
}

export default () => {
    const {data, isLoading} = useGetWorkoutDatesQuery()

    console.log("dates", data)

    return (
        <Page title={'Fitness'} addUrl={reverseWorkoutAdd()} sx={{px: 0}}>
            <DateCalendar
                readOnly
                slots={{
                    day: WorkoutDay,
                }}
                slotProps={{
                    day: {
                        workoutDates: data,
                        isLoading,
                    },
                }}
            />
        </Page>
    )
}
