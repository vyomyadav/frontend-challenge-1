import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import { UploadPage } from './pages/UploadPage';
import { PublicMrfPage } from './pages/PublicMrfPage';

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <UploadPage />,
      },
      {
        path: '/mrf',
        element: <PublicMrfPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
