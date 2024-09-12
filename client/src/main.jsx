import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import './index.css'

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import NoMatch from './pages/NoMatch.jsx'
//import TitlePage from './pages/TitlePage.jsx'
//import EnvironmentPage from './pages/EnvironmnetPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <HomePage />
      }, 
      // {
      //   path: '/login',
      //   element: <Login />
      // }, 
      {
        path: '/signup',
        element: <SignupPage />
      }, 
      // {
      //   path: '/success',  //TODO: Change Page
      //   element: <TitlePage />
      // }, 
      // {
      //   path: '/products/:id', //TODO: Change path later
      //   element: <EnvironmentPage /> 
      // }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
