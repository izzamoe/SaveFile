import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './utils/router';
import { ReCaptchaProvider } from 'react-grecaptcha-v3';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReCaptchaProvider 
      siteKey={import.meta.env.VITE_GOOGLE_KEY}
      injectionDelay={10000}
      >
      <RouterProvider router={router} />
    </ReCaptchaProvider>
  </React.StrictMode>,
)
