import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/superadmin/AdminDashboard';
import CreateEvent from './pages/superadmin/CreateEvent'
import EditEvent from './pages/superadmin/EditEvent';
import ViewEvents from './pages/superadmin/ViewEvents';
import Protected from './components/Protected';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <LoginPage/>,
      path: '/login'
    },
    {
      path: '/',
      element: (
        <Dashboard/>
        )
    },
    {
      path: '/create-event',
      element: (
        <Protected>
          <CreateEvent/>
        </Protected>
      )
    },
    {
      path: '/edit-event/:eventId',
      element: (
        <Protected>
          <EditEvent/>
        </Protected>
      )
    },
    {
      path: '/view-events',
      element: (
          <ViewEvents/>
      )
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
