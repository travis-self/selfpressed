import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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