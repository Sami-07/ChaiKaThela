import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Catalogue from "./pages/catalogue/Catalogue"
import Contact from "./pages/contact/Contact"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"
import Cart from "./pages/cart/Cart"
import ThemeSelector from "./components/themeselector/ThemeSelector"
import Footer from "./components/footer/Footer"
import { useAuthContext } from "./hooks/useAuthContext"
import CustomRecipe from "./pages/customrecipe/CustomRecipe"
import OrderHistory from "./pages/orderhistory/OrderHistory"
import { useTheme } from "./hooks/useTheme"

export default function App() {
  const { authIsReady, user } = useAuthContext()
  const { color, backgroundColor, changeColor } = useTheme()

  return (
    // <div className="App" style={{backgroundColor : {color} === "brown" ? "FAEAB1" : ""}} >
    <div className="App">

      {authIsReady && (
        <BrowserRouter>

          <Navbar />

          <ThemeSelector />

          <Switch>

            <Route exact path="/">
              {!user && <Redirect to="/signup" />}
              {user && <Home />}
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/catalogue">
              {!user && <Redirect to="/signup" />}
              {user && <Catalogue />}
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>

            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>

            <Route path="/cart">
              {!user && <Redirect to="/signup" />}
              {user && <Cart />}
            </Route>

            <Route path="/brewtea">
              {!user && <Redirect to="/signup" />}
              {user && <CustomRecipe />}
            </Route>

            <Route path="/profile">
              {!user && <Redirect to="/signup" />}
              {user && <OrderHistory />}
            </Route>

          </Switch>

          <Footer />

        </BrowserRouter>
      )}
    </div>
  )
}


