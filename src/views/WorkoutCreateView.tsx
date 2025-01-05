import React from 'react'
import WorkoutForm from '../forms/WorkoutForm'
import {Page} from '../common/shared/Page'
import {useNavigate} from 'react-router-dom'

import {reverseWorkoutDetail} from '../app/reverse'
import {useCreateWorkoutMutation} from "../app/api";
import {Workout} from '../app/types'

export default () => {
    const navigate = useNavigate()
    const [create, queryState] = useCreateWorkoutMutation()

    const handleSubmit = (payload: Partial<Workout>) => {
        create(payload)
            .unwrap()
            .then((data) => {
                navigate(reverseWorkoutDetail(data))
            })
    }

    const handleSubmitContinue = (payload: Partial<Workout>) => {
        create(payload)
    }

    return (
        <Page title={'Workout erstellen'} back>
            <WorkoutForm
                onSubmit={handleSubmit}
                onSubmitContinue={handleSubmitContinue}
                buttonCaption={'Erstellen'}
                {...queryState}
            />
        </Page>
    )
}
