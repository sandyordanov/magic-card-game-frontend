import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Account from './Pages/Account';
import Decks from './Pages/Decks';
import Shop from './Pages/Shop';
import CardsPage from './Pages/CardsPage';
import Home from './Pages/Home';
import UpdatePage from './Pages/admin/UpdatePage';
import RegisterForm from './Pages/account/Register';
import Login from './Pages/account/Login';



const router = createBrowserRouter([
  { path: '/', element: <Home /> }, 
  { path: '/shop', element: <Shop /> },
  { path: '/deck', element: <Decks /> },
  { path: '/play', element: <Decks /> },
  { path: '/cardsAdmin', element: <CardsPage /> },
  { path: '/register', element: <RegisterForm /> },
  { path: '/account', element: <Account /> },
  { path: '/updateCard', element: <UpdatePage /> },
  { path: '/login', element: <Login /> },

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
