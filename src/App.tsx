/** @jsxImportSource @emotion/react */
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import { Suspense } from 'react';

function App() {
  return (
    <RecoilRoot>
      <HelmetProvider>
        <Suspense>
          <GlobalStyle />
          <RouterProvider router={router} />
        </Suspense>
      </HelmetProvider>
    </RecoilRoot>
  );
}

export default App;
