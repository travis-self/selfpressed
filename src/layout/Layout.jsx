import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <main className={`pt-20 px-10 relative dark:text-white wrapper`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}