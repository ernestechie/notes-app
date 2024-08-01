import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import Auth from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import CreateNote from './pages/Dashboard/CreateNote';
import DashboardHome from './pages/Dashboard/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,

    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'create-note',
        element: <CreateNote />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />;
    </AuthContextProvider>
  );
}
