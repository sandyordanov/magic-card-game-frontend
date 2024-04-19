import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Account from './Pages/Account';
import Decks from './Pages/Decks';
import Shop from './Pages/Shop';
import CardsPage from './Pages/CardsPage';
import Home from './Pages/Home';



const router = createBrowserRouter([
  { path: '/', element: <div>Hello world!</div> }, // Root route
  { path: '/home', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/deck', element: <Decks /> },
  { path: '/play', element: <Decks /> },
  { path: '/home', element: <Home /> },
  { path: '/cardsAdmin', element: <CardsPage /> },
  { path: '/account', element: <Account /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
