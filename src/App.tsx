import './App.css';
import router from '@/routes';

import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <RecoilRoot>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </RecoilRoot>
  );
}

export default App;
