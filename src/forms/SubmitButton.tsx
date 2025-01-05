import React from 'react'
import {Button, ButtonProps} from '@mui/material'

interface SubmitButton extends ButtonProps {
    isSuccess?: boolean
    isError?: boolean
    isLoading?: boolean
}

export const SubmitButton = ({
                                 isSuccess,
                                 isError,
                                 isLoading,
                                 onClick,
                                 children,
                                 ...props
                             }: SubmitButton) => {
    return (
        <Button
            color={isSuccess ? 'success' : isError ? 'error' : 'primary'}
            onClick={onClick}
            disabled={isLoading}
            variant={'contained'}
            {...props}
        >
            {children}
        </Button>
    )
}
