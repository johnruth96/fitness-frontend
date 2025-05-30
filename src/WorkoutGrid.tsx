import {Activity, Workout} from './app/types'
import React, {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {DataGrid, GridCellParams, GridColDef, GridFilterModel,} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import {useGetActivitiesQuery, useGetWorkoutsQuery} from './app/api'
import {GridPaginationModel} from '@mui/x-data-grid/models/gridPaginationProps'
import {Link} from '@mui/material'

import {reverseWorkoutDetail} from './app/reverse'

type WorkoutRowModel = Omit<Workout, 'date'> & { date: Date }

const NameCell = ({row, value}: GridCellParams<WorkoutRowModel>) => {
    const navigate = useNavigate()
    return (
        <Link
            onClick={() => navigate(reverseWorkoutDetail(row))}
            sx={{cursor: 'pointer'}}
        >
            {value}
        </Link>
    )
}
const getColumns = (activities: Activity[]): GridColDef<WorkoutRowModel>[] => {
    return [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: NameCell,
        },
        {
            field: 'date',
            headerName: 'Datum',
            type: 'date',
            flex: 1,
            valueFormatter: (value) => dayjs(value).format('DD.MM.YYYY'),
        },
        {
            field: 'activity',
            headerName: 'Sportart',
            flex: 1,
            type: 'singleSelect',
            valueOptions: activities.map((d) => ({
                value: d.id,
                label: d.name,
            })),
        },
    ]
}

export const WorkoutGrid = ({}) => {
    const {data: activities, ...activityQueryStatus} =
        useGetActivitiesQuery()

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    })

    const [queryOptions, setQueryOptions] = React.useState<Record<string, string>>({})

    const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
        if (filterModel.items.length === 0) {
            setQueryOptions({})
        } else {
            setQueryOptions({filterModel: JSON.stringify(filterModel)})
        }
    }, [])

    const {data, isFetching} = useGetWorkoutsQuery({
        page: paginationModel.page + 1,
        page_size: paginationModel.pageSize,
        ...queryOptions,
    })

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPaginationModel(model)
    }

    const rows = useMemo(() => {
        if (data) {
            return data.results.map(workout => ({
                ...workout,
                date: new Date(workout.date),
            }))
        } else {
            return []
        }
    }, [data])

    const columns = useMemo(() => {
        return activities ? getColumns(activities) : []
    }, [activities])

    return (
        <DataGrid
            columns={columns}
            rows={rows}
            rowCount={data?.count ?? 0}
            density={'compact'}
            loading={isFetching || activityQueryStatus.isLoading}
            paginationMode={'server'}
            onPaginationModelChange={handlePaginationModelChange}
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10, 25]}
            filterMode={'server'}
            onFilterModelChange={onFilterChange}
        />
    )
}
