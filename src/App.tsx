import router from '@/routes';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <RecoilRoot>
      <HelmetProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </HelmetProvider>
    </RecoilRoot>
  );
}

export default App;
