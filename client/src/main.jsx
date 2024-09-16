import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import './index.css'

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import NoMatch from './pages/NoMatch.jsx'
// import TitlePage from './pages/TitlePage.jsx'
import EnvironmentPage from './pages/EnvironmentPage.jsx'
import Leaderboard from './pages/Leaderboard.jsx';

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
      {
        path: '/login',
        element: <LoginPage />
      }, 
      {
        path: '/signup',
        element: <SignupPage />
      }, 
      {
        path: '/leaderboard',
        element: <Leaderboard />
      },
      // {
      //   path: '/success',  //TODO: Change Page
      //   element: <TitlePage />
      // }, 
      {
        path: '/environment/:id', //TODO: Change path later
        element: <EnvironmentPage /> 
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
