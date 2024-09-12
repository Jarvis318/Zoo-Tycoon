import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import './index.css'

import App from './App.jsx'
import HomePage from './HomePage.jsx'
import SignupPage from './SignupPage.jsx'
import TitlePage from './TitlePage.jsx'
import EnvironmentPage from './EnvironmnetPage.jsx'

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
      }, {
        path: '/success',  //TODO: Change Page
        element: <TitlePage />
      }, {
        path: '/products/:id', //TODO: Change path later
        element: <EnvironmentPage /> 
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
