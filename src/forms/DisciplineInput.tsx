import React from 'react'
import {useGetDisciplinesQuery} from "../app/api";
import {SelectGroupInput, SelectGroupInputProps} from "./SelectGroupInput";


export default (props: Omit<SelectGroupInputProps, 'data'>) => {
    const {data, isLoading} = useGetDisciplinesQuery()

    if (data) {
        return <SelectGroupInput data={data} {...props}/>
    } else if (isLoading) {
        return <div>Loading ...</div>
    } else {
        return <div>Error</div>
    }
}

