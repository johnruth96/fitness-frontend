import { Workout } from './types'

export const reverseWorkoutDetail = (workout: Workout) => {
    return `/workouts/${workout.id}/`
}

export const reverseWorkoutUpdate = (workout: Workout) => {
    return `/workouts/${workout.id}/update/`
}

export const reverseWorkoutList = () => {
    return `/workouts/`
}

export const reverseWorkoutAdd = () => {
    return `/workouts/add/`
}
