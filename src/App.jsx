
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Account from './Pages/Account';
import Decks from './Pages/Decks';
import Shop from './Pages/Shop';
import CardsPage from './Pages/admin/CardsPage.jsx';
import Home from './Pages/Home';
import UpdatePage from './Pages/admin/UpdatePage';
import RegisterForm from './Pages/account/Register';
import Login from './Pages/account/Login';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


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
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
  );
}

export default App
