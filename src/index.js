import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Test from './pages/Test';
import Choice from './pages/Choice';
import store from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Board from './pages/Board';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '/choice',
        element: <Choice />,
      },
      {
        path: '/board',
        element: <Board />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
