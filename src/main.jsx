import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter, createRoutesFromElements, RouterProvider,
  Route
} from 'react-router-dom'
import './main.scss'
import Layout from './components/Layout'
import Home, { loader as homeLoader } from './pages/Home'
import Details, { loader as detailsLoader } from './pages/Details'


const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path=':code' element={<Details />} loader={detailsLoader} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>,
)
