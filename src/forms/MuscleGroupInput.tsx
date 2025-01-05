import React from 'react'
import {useGetMuscleGroupsQuery} from "../app/api";
import {CheckboxGroupInput, CheckboxGroupInputProps} from "./CheckboxGroupInput";


export default (props: Omit<CheckboxGroupInputProps, 'data'>) => {
    const {data, isLoading} = useGetMuscleGroupsQuery()

    if (data) {
        return <CheckboxGroupInput data={data} {...props}/>
    } else if (isLoading) {
        return <div>Loading ...</div>
    } else {
        return <div>Error</div>
    }
}