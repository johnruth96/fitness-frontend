import {createBrowserRouter, createHashRouter} from 'react-router-dom'
import App from '../App'
import React from 'react'
import WorkoutListView from "../views/WorkoutListView";
import WorkoutCreateView from "../views/WorkoutCreateView";
import WorkoutDetailView from "../views/WorkoutDetailView";
import WorkoutUpdateView from "../views/WorkoutUpdateView";
import HomeView from '../views/HomeView';


export const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <HomeView/>,
                index: true,
            },
            {
                path: 'workouts/',
                element: <WorkoutListView/>,
            },
            {
                path: 'workouts/add/',
                element: <WorkoutCreateView/>,
            },
            {
                path: 'workouts/:id/',
                element: <WorkoutDetailView/>,
            },
            {
                path: 'workouts/:id/update/',
                element: <WorkoutUpdateView/>,
            },
        ],
    },
]

const router =
    'standalone' in window.navigator && window.navigator.standalone
        ? createHashRouter(routes)
        : createBrowserRouter(routes)

export default router
