import React, {PropsWithChildren} from 'react'
import {ApiError} from '../ApiError'
import {CircularProgress} from "@mui/material";

interface QueryProviderProps extends PropsWithChildren {
    isLoading: boolean
    isSuccess: boolean
    error?: unknown
}

export const QueryProvider = ({
                                  isLoading,
                                  error,
                                  isSuccess,
                                  ...props
                              }: QueryProviderProps) => {
    if (isLoading) {
        return <CircularProgress/>
    } else if (isSuccess) {
        return <>{props.children}</>
    } else {
        return <ApiError error={error}/>
    }
}
