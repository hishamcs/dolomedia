
import UserListScreen from './screens/UserListScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/navBar/NavBar'
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rigthBar/RightBar';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Profile from './screens/Profile';
import PostListScreen from './screens/PostListScreen';
import ChatScreen from './screens/ChatScreen';
import { Toaster } from 'react-hot-toast';


function App() {

  const Layout = () => {
    return(
      <div className='theme-light'>
        <Navbar />
        <div style={{ display: "flex"}}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
    },
    {
      path: "/home",
      element: (<Layout />),
      children: [
        {
          path: "/home",
          element: <HomeScreen />,
        },
        {
          path: "/home/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/ad-home",
      element: <UserListScreen />,
    },
    {
      path: "/ad-home/posts/",
      element:<PostListScreen />,
    },
    {
      path:"/chat/",
      element:<ChatScreen />
    }
    
  ])

  
  return (
    <div>
      <RouterProvider router = {router}/>
      <Toaster position="top-center"reverseOrder={false}/>
    </div>
  )
}

export default App