import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface ListResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

export interface DjangoFormError {
    status: number
    data: Record<string, string[]>
}

export interface DjangoRestFrameworkError {
    detail?: string
    __all__?: string
}

export type APIError = FetchBaseQueryError | (SerializedError & { data: DjangoRestFrameworkError }) | DjangoFormError

export interface Discipline {
    id: number
    name: string
}

export interface Condition {
    id: number
    name: string
}

export interface MuscleGroup {
    id: number
    name: string
}

export enum GoalPeriods {
    Weekly = 'w',
}

export interface Goal {
    id: number
    date_created: string
    string: Condition['id']

    condition: Condition['id']
    muscle_group: MuscleGroup['id']

    period: GoalPeriods
    num_workouts: number
}

export interface Workout {
    id: number
    date: string
    name: string
    url: string
    app: string
    notes: string

    distance: number
    duration: number

    date_created: string

    discipline: Discipline['id']
    conditions: Condition['id'][]
    muscle_groups: Condition['id'][]

    discipline_str: string
    conditions_str: string[]
    muscle_groups_str: string[]
}
