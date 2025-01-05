import React from 'react'
import {useGetConditionsQuery} from "../app/api";
import {CheckboxGroupInput, CheckboxGroupInputProps} from "./CheckboxGroupInput";


export default (props: Omit<CheckboxGroupInputProps, 'data'>) => {
    const {data, isLoading} = useGetConditionsQuery()

    if (data) {
        return <CheckboxGroupInput data={data} {...props}/>
    } else if (isLoading) {
        return <div>Loading ...</div>
    } else {
        return <div>Error</div>
    }
}

