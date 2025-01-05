import React from 'react'
import {Link, Outlet, useLocation} from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation'
import {BottomNavigationAction, Paper} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import {AuthProvider} from "./auth/AuthProvider";
import {reverseWorkoutAdd, reverseWorkoutList} from "./app/reverse";
import AddCircle from '@mui/icons-material/AddCircle'

const NAVIGATION = [
    {
        label: 'Home',
        icon: <HomeIcon/>,
        to: '/',
    },
    {
        label: 'Workouts',
        icon: <LibraryBooksIcon/>,
        to: reverseWorkoutList(),
    },
    {
        label: 'Neues Workout',
        icon: <AddCircle/>,
        to: reverseWorkoutAdd(),
    },
]

export const App = () => {
    const location = useLocation()

    return (
        <AuthProvider>
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2000,
                }}
                elevation={3}
            >
                <BottomNavigation value={location.pathname} showLabels>
                    {NAVIGATION.map((props) => (
                        <BottomNavigationAction
                            component={Link}
                            value={`/${props.to}`}
                            key={props.to}
                            {...props}
                        />
                    ))}
                </BottomNavigation>
            </Paper>

            <Outlet/>
        </AuthProvider>
    )
}

export default App
