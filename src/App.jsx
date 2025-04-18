import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/LoginPopup/lOGINpOPUP.JSX"
import Verify from "./pages/verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrders"
import Success from './pages/Success/Success'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App