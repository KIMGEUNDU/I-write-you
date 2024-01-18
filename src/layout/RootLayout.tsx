/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { commonWidth } from '@/style/mq';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main css={commonWidth}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
