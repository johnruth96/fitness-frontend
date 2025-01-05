import React, {useEffect, useState} from 'react'
import {Workout} from '../app/types'
import ActivityInput from './ActivityInput'
import MuscleGroupInput from './MuscleGroupInput'
import ConditionInput from './ConditionInput'
import dayjs from 'dayjs'
import {Alert, Box, FormGroup, Stack, TextField, Typography} from '@mui/material'
import {SubmitButton} from './SubmitButton'
import {DateTimePicker, TimeField} from '@mui/x-date-pickers'
import {formatError} from '../common/ApiError'

export interface WorkoutFormProps {
    onSubmit: (value: Partial<Workout>) => void
    onSubmitContinue?: (value: Partial<Workout>) => void
    initial?: Workout
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    error?: any
    buttonCaption?: string
}

export default ({
                    onSubmit,
                    onSubmitContinue,
                    initial,
                    isError,
                    error,
                    buttonCaption = 'Speichern',
                    ...queryState
                }: WorkoutFormProps) => {
    const [name, setName] = useState('')
    const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(dayjs())
    const [app, setApp] = useState('')
    const [url, setUrl] = useState('')
    const [notes, setNotes] = useState('')
    const [distance, setDistance] = useState<string>('')
    const [duration, setDuration] = useState<dayjs.Dayjs | null>(null)
    const [activity, setActivity] = useState('')
    const [muscleGroups, setMuscleGroups] = useState<string[]>([])
    const [conditions, setConditions] = useState<string[]>([])

    /*
     * Set initial value
     */
    useEffect(() => {
        if (initial) setInitial(initial)
    }, [initial])

    const setInitial = (initial: Workout) => {
        setName(initial.name)
        setDateTime(dayjs(initial.date))
        setApp(initial.app)
        setUrl(initial.url)
        setNotes(initial.notes)
        setActivity(initial.activity.toString())
    }

    /*
     * Clear form after submission
     */
    useEffect(() => {
        if (queryState.isSuccess) {
            setName('')
            setApp('')
            setUrl('')
            setNotes('')
        }
    }, [queryState.isSuccess])

    const getPayload = () =>
        ({
            name,
            app,
            notes,
            url,
            distance: distance !== '' ? parseFloat(distance) : null,
            duration: duration?.format('HH:mm'),
            date: dateTime?.format('DD.MM.YYYY, HH:mm'),
            activity: activity === '' ? null : parseInt(activity),
            muscle_groups: muscleGroups.map((id) => parseInt(id)),
            conditions: conditions.map((id) => parseInt(id)),
        } as Partial<Workout>)

    return (
        <Box>
            <ActivityInput
                value={activity}
                onChange={setActivity}
                label={'Aktivität'}
                allowEmpty
            />

            <TextField
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                label={'Name (optional)'}
            />

            <TextField
                value={app}
                onChange={(evt) => setApp(evt.target.value)}
                label={'App (optional)'}
            />

            <TextField
                value={notes}
                onChange={(evt) => setNotes(evt.target.value)}
                label={'Bemerkungen (optional)'}
            />

            <TextField
                value={url}
                onChange={(evt) => setUrl(evt.target.value)}
                label={'URL (optional)'}
            />

            <TimeField
                value={duration}
                onChange={(evt) => setDuration(evt)}
                format={'HH:mm'}
                label={'Dauer (optional)'}
            />

            <TextField
                value={distance}
                onChange={(evt) => setDistance(evt.target.value)}
                label={'Distanz (optional)'}
            />

            <FormGroup sx={{mt: 3}}>
                <Typography variant={"caption"}>Muskelgruppen</Typography>
                <MuscleGroupInput
                    value={muscleGroups}
                    onChange={setMuscleGroups}
                    toggleAll
                />
            </FormGroup>

            <FormGroup sx={{mt: 3}}>
                <Typography variant={"caption"}>Konditionen</Typography>
                <ConditionInput
                    value={conditions}
                    onChange={setConditions}
                />
            </FormGroup>

            <DateTimePicker
                onChange={(evt) => setDateTime(evt)}
                value={dateTime}
                label={'Datum'}
            />

            {isError && (
                <Alert severity={'error'} sx={{mb: 1}}>
                    {formatError(error)}
                </Alert>
            )}

            <Stack direction={'row'} spacing={1}>
                <SubmitButton
                    isError={isError}
                    isLoading={queryState.isLoading}
                    isSuccess={queryState.isSuccess}
                    onClick={() => onSubmit(getPayload())}
                    fullWidth
                >
                    {buttonCaption}
                </SubmitButton>

                {onSubmitContinue && (
                    <SubmitButton
                        isError={isError}
                        isLoading={queryState.isLoading}
                        isSuccess={queryState.isSuccess}
                        onClick={() => onSubmitContinue(getPayload())}
                        fullWidth
                        variant={'text'}
                    >
                        {buttonCaption} und weiter
                    </SubmitButton>
                )}
            </Stack>
        </Box>
    )
}
