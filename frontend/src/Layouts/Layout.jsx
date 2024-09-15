import Navbar from './Navbar';
import { Outlet } from 'react-router-dom'; // Import Outlet

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>{<Outlet />}</main>
    </>
  );
};

export default Layout;
