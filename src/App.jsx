import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Slides from "./pages/Slides"
import Wordle from "./pages/Wordle"

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}  />
            <Route path="/playground" element={<Wordle />}  />
            <Route path="/slides" element={<Slides />}  />
          </Route>
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
