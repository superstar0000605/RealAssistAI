import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "./layout";
import Chat from "./pages/chat";
import CreateChat from "./pages/chat/CreateChat";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
            path: "/",
            element: <Chat />
        },
        {
            path:"/:id",
            element: <Chat />
        },
        {
          path: "create",
          element: <CreateChat/>,
        },
        {
          path: "account",
          element: <h1>Account</h1>,
        },
        {
          path: "contact-us",
          element: <h1>Contact Us</h1>,
        },
      ],
    },
  ]);

  export default router;