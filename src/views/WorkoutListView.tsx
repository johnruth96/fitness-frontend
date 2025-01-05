import React, {useMemo, useState} from 'react'
import {Page} from '../common/shared/Page'
import {WorkoutGrid} from '../WorkoutGrid'

import {reverseWorkoutAdd} from '../app/reverse'

export default () => {
    return (
        <Page title={'Workouts'} addUrl={reverseWorkoutAdd()}>
            <WorkoutGrid/>
        </Page>
    )
}
