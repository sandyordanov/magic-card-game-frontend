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
import Lobby from "./Pages/Lobby.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/shop', element: <ProtectedRoute roles={['PLAYER']}><Shop /></ProtectedRoute> },
  { path: '/deck', element: <ProtectedRoute roles={['PLAYER']}><Decks /></ProtectedRoute> },
  { path: '/play', element: <Lobby /> },
  { path: '/cardsAdmin', element: <ProtectedRoute roles={['ADMIN']}><CardsPage /></ProtectedRoute> },
  { path: '/register', element: <RegisterForm /> },
  { path: '/account', element: <ProtectedRoute roles={['PLAYER']}><Account /></ProtectedRoute> },
  { path: '/updateCard', element: <ProtectedRoute roles={['ADMIN']}><UpdatePage /></ProtectedRoute> },
  { path: '/login', element: <Login /> },
  { path: '/lobby', element: <Lobby /> },
]);

function App() {

  return (
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
  );
}

export default App;
