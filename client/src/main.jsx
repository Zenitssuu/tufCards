import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { store } from './store/store.js'
import {AllCards, Dashboard, Home,Login} from "./Pages/index.js"

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'/all-posts',
        element:<AllCards/>
      },      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
