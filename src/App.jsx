import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Routes/Routes/router'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster toastOptions={{ duration: "500" }}></Toaster>
    </>
  )
}

export default App
