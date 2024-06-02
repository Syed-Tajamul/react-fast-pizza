import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart, Menu, CreateOrder, Home } from "./Pages";
import AppLayout from "./Components/AppLayout";
import { loader as menuLoader } from "./Pages/Menu";
import { loader as orderLoader } from "./Pages/Order";
import Error from "./Components/Error";
import { action as createorderaction } from "./Pages/CreateOrder";
import Order from "./Pages/Order";
export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createorderaction,
        },
        {
          path: "/order/:id",
          element: <Order />,
          loader: orderLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
