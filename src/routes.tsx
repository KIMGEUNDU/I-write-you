import { lazy } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const Main = lazy(() => import('pages/Main'));
const RootLayout = lazy(() => import('layout/RootLayout'));
const Login = lazy(() => import('pages/Login'));
const Join = lazy(() => import('pages/Join'));
const Hotel = lazy(() => import('pages/Hotel'));
const Sent = lazy(() => import('pages/Sent'));
const Received = lazy(() => import('pages/Received'));
const Read = lazy(() => import('@/pages/Read'));
const WriteInfo = lazy(() => import('pages/WriteInfo'));
const WriteLetter = lazy(() => import('pages/WriteLetter'));
const Friend = lazy(() => import('pages/Friend'));
const NonMember = lazy(() => import('pages/NonMember'));
const NotFound = lazy(() => import('pages/NotFound'));
const MyProfile = lazy(() => import('pages/MyProfile'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="Join" element={<Join />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="sent" element={<Sent />} />
      <Route path="received" element={<Received />} />
      <Route path="read/:id" element={<Read />} />
      <Route path="writeInfo" element={<WriteInfo />} />
      <Route path="writeLetter" element={<WriteLetter />} />
      <Route path="friend" element={<Friend />} />
      <Route path="nonMember/:id" element={<NonMember />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="myProfile" element={<MyProfile />} />
    </Route>
  )
);

export default router;
