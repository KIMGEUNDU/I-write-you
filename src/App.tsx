/** @jsxImportSource @emotion/react */
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import { Suspense, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Session } from '@supabase/supabase-js';
import Main from './pages/Main';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <RecoilRoot>
      <HelmetProvider>
        <Suspense>
          <GlobalStyle />
          {session ? (
            <RouterProvider router={router} />
          ) : (
            <>
              <Main />
            </>
          )}
        </Suspense>
      </HelmetProvider>
    </RecoilRoot>
  );
}

export default App;
