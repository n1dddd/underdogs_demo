import HomePage from './pages/HomePage'
import "./scss/styles.scss"
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from "../src/context/AuthContext"
import ProductPage from './pages/ProductPage';


function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
