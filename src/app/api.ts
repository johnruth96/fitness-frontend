import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_BASE} from "./config";
import {Condition, Activity, ListResponse, MuscleGroup, Workout} from "./types";
import {getAccessToken} from '../auth/token';


export const fitnessApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE,
        prepareHeaders: (headers, {}) => {
            const accessToken = getAccessToken()

            if (accessToken !== null) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

        },
    }),
    tagTypes: ["Workout", "Condition", "MuscleGroup", "Activity"],
    endpoints: (builder) => ({
        getWorkouts: builder.query<
            ListResponse<Workout>,
            ({
                page?: number
                page_size?: number
            } & Record<string, string | number>)
            | undefined
        >({
            query: (props) => {
                if (props) {
                    const params = new URLSearchParams(props)
                    return `workouts/?${params}`
                }
                return 'workouts/'
            },
            providesTags: [{type: "Workout", id: 'LIST'}],
        }),
        createWorkout: builder.mutation<Workout, Partial<Workout>>({
            query: (payload) => ({
                url: "workouts/",
                method: "POST",
                body: payload
            }),
            invalidatesTags: [{type: 'Workout', id: 'LIST'}],
        }),
        // TODO: Simplify / use getWorkout endpoint
        getWorkoutDates: builder.query<string, void>({
            query: () => 'workouts/dates/',
            providesTags: [{type: 'Workout', id: 'LIST'}],
        }),
        getWorkout: builder.query<Workout, number>({
            query: (id) => `workouts/${id}/`,
            providesTags: (result, _, arg) =>
                result ? [{type: "Workout", id: arg}] : ["Workout"],
        }),
        deleteWorkout: builder.mutation<void, number>({
            query: (id) => ({
                url: `/workouts/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: [{type: "Workout", id: "LIST"}],
        }),
        getActivities: builder.query<Activity[], void>({
            query: (id) => `activities/`,
            providesTags: [{type: "Activity", id: 'LIST'}],
        }),
        getConditions: builder.query<Condition[], void>({
            query: (id) => `conditions/`,
            providesTags: [{type: "Condition", id: 'LIST'}],
        }),
        getMuscleGroups: builder.query<MuscleGroup[], void>({
            query: (id) => `muscle-groups/`,
            providesTags: [{type: "MuscleGroup", id: 'LIST'}],
        }),
    }),
})

export const {
    useGetWorkoutDatesQuery,
    useGetWorkoutQuery,
    useGetWorkoutsQuery,
    useCreateWorkoutMutation,
    useGetActivitiesQuery,
    useGetConditionsQuery,
    useGetMuscleGroupsQuery,
} = fitnessApi
