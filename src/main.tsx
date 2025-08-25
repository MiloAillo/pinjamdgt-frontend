import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./main.css"
import Mainscreen from './pages/home/mainscreen'
import Home from './pages/home/home'
import Pinjam from './pages/pinjam/pinjam'
import getUser from './loader/getUser'
import getItems from './loader/getItems'

const route = createBrowserRouter([
  {path: "/", element: <Home />, loader: getUser, id: "users",children: [
    {index: true, element: <Mainscreen />}
  ]},
  {loader: getItems, id: "items", children: [
    {path: "/pinjam/:paramId", loader:getUser, element: <Pinjam />}
  ]}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
