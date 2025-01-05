import React from 'react'
import { Page } from '../common/shared/Page'
import { Alert } from '@mui/material'

export default () => {
    return (
        <Page title={'Bearbeiten'} back>
            <Alert severity={'warning'}>Feature noch nicht verfügbar</Alert>
        </Page>
    )
}
