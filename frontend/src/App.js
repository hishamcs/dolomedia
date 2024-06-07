import UserListScreen from './screens/UserListScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Login from './screens/user/login/Login';
import Register from './screens/user/register/Register';
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/navBar/NavBar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rigthBar/RightBar';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Profile from './screens/Profile';
import PostListScreen from './screens/PostListScreen';
import ChatScreen from './screens/ChatScreen';
import { Toaster } from 'react-hot-toast';
import { ChatProvider } from './context/ChatContext';
import SinglePostScreen from './screens/SinglePostScreen';

function App() {
  const { userInfo } = useSelector((state) => state?.userLogin);
  // console.log('userInfo : ', userInfo)
  const Layout = () => {
    return (
      <div className='theme-light'>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    console.log('userInfo : ', userInfo);
    if (!userInfo) {
      return <Navigate to='/' />;
    }
    return children;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<HomeScreen />} />
            <Route path='profile/:id' element={<Profile />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/ad-home' element={<UserListScreen />} />
          <Route path='/ad-home/posts' element={<PostListScreen />} />
          <Route path='/posts/:id' element={<SinglePostScreen />} />
          <Route path='/chat' element={<ProtectedRoute><ChatProvider><ChatScreen /></ChatProvider></ProtectedRoute>} />
        </Routes>
      </Router>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
}

export default App;





// React router version 5
// ------------------------------------------------------------
// import UserListScreen from './screens/UserListScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import LoginScreen from './screens/LoginScreen';
// import Login from './screens/user/login/Login';
// import Register from './screens/user/register/Register';
// import HomeScreen from './screens/HomeScreen';
// import Navbar from './components/navBar/NavBar'
// import LeftBar from './components/leftBar/LeftBar';
// import RightBar from './components/rigthBar/RightBar';
// import { useSelector} from 'react-redux';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   Navigate
// } from "react-router-dom";
// import Profile from './screens/Profile';
// import PostListScreen from './screens/PostListScreen';
// import ChatScreen from './screens/ChatScreen';
// import { Toaster } from 'react-hot-toast';
// import { ChatProvider } from './context/ChatContext';
// import SinglePostScreen from './screens/SinglePostScreen';



// function App() {
//   const {userInfo} = useSelector(state=>state?.userLogin)
//   // console.log('userInfo : ', userInfo)
//   const Layout = () => {
//     return(
//       <div className='theme-light'>
//         <Navbar />
//         <div style={{ display: "flex"}}>
//           <LeftBar />
//           <div style={{ flex: 6 }}>
//             <Outlet />
//           </div>
//           <RightBar />
//         </div>
//       </div>
//     )
//   }
//   const ProtectedRoute = ({children}) => {
//     console.log('userInfo : ', userInfo)
//     if(!userInfo) {
//       return <Navigate to="/" />
//     }
//     return children
//   }
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       // element: <LoginScreen />,
//       element: <Login />,
//     },
//     {
//       path: "/home",
//       element: (
//                 <ProtectedRoute >
//                   <Layout />
//                 </ProtectedRoute>
//               ),
//       children: [
//         {
//           path: "/home",
//           element: <HomeScreen />,
//         },
//         {
//           path: "/home/profile/:id",
//           element: <Profile />,
//         },
//       ],
//     },
//     {
//       path: "/register",
//       // element: <RegisterScreen />,
//       element: <Register />,
//     },
//     {
//       path: "/ad-home",
//       element: <UserListScreen />,
//     },
//     {
//       path: "/ad-home/posts/",
//       element:<PostListScreen />,
//     },
//     {
//       path: "/posts/:id",
//       element: <SinglePostScreen />
//     },
//     {
//       path:"/chat/",
//       element:(<ProtectedRoute>
//                   <ChatProvider>

//                     <ChatScreen />
//                   </ChatProvider>
//               </ProtectedRoute>)
//     }
    
//   ])

  
//   return (
//     <>
//       <RouterProvider router = {router}/>
//       <Toaster position="top-center"reverseOrder={false}/>
//     </>
//   )
// }

// export default App