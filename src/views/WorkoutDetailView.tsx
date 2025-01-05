import React, {PropsWithChildren} from 'react'
import {Workout} from '../app/types'
import {Page} from '../common/shared/Page'

import {reverseWorkoutUpdate} from '../app/reverse'
import {Box, Typography} from '@mui/material'
import dayjs from 'dayjs'
import {useParams} from "react-router-dom";
import {QueryProvider} from "../common/framework/QueryProvider";
import {useGetWorkoutQuery} from "../app/api";

interface PropertyProps extends PropsWithChildren {
    label: string
    value?: string | number
}

const Property = ({label, value, children}: PropertyProps) => (
    <Box sx={{mb: 2}}>
        <Typography variant={'caption'} color={'text.secondary'}>
            {label}
        </Typography>
        {value && <Typography>{value}</Typography>}
        {children}
    </Box>
)

interface WorkoutDetailViewProps {
    object: Workout
}

const WorkoutDetailView = ({object}: WorkoutDetailViewProps) => {
    return (
        <Page
            title={object.name}
            back
            updateUrl={reverseWorkoutUpdate(object)}
            deleteModel={{model: 'Workout', id: object.id}}
        >
            <Property label={'Name'} value={object.name}/>

            <Property label={'Sportart'} value={object.discipline_str}/>

            <Property
                label={'Datum'}
                value={dayjs(object.date).format('dddd, DD.MM.YYYY, HH:MM')}
            />

            <Property label={'Konditionen'}>
                {object.conditions_str.map((condition) => (
                    <Typography key={condition}>{condition}</Typography>
                ))}
            </Property>

            <Property label={'Muskelgruppen'}>
                {object.muscle_groups_str.map((mg) => (
                    <Typography key={mg}>{mg}</Typography>
                ))}
            </Property>

            {object.url && <Property label={'URL'} value={object.url}/>}

            {object.app && <Property label={'App'} value={object.app}/>}

            {object.distance && (
                <Property label={'Distanz'} value={object.distance}/>
            )}

            {object.duration && (
                <Property label={'Dauer'} value={object.duration}/>
            )}

            {object.notes && (
                <Property label={'Bemerkungen'} value={object.notes}/>
            )}
        </Page>
    )
}

export default () => {
    const {id} = useParams()
    const {data, ...hookResult} = useGetWorkoutQuery(parseInt(id!))

    return (
        <QueryProvider {...hookResult}>
            <WorkoutDetailView object={data!}/>
        </QueryProvider>
    )
}
