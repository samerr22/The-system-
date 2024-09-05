import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Tab from "./pages/Table";
import Contarct from "./pages/contract";
import Contractupdate from "./pages/Contractupdate";
import Profile from "./pages/profile";
import Order from "./pages/order";
import View from "./pages/view";
import Edit from "./pages/Edit";
import Editview from "./pages/Editview";
import ClientContractDash from "./pages/ClientContractDash";
import CEdit from "./pages/CEdit";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/table" element={<Tab />} />
          <Route path="/clientT" element={<ClientContractDash />} />
          <Route path="/add" element={<Contarct/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/editview/:eId" element={<Editview />} />
          <Route path="/update/:upId" element={<Contractupdate />} />
          <Route path="/updatee/:viewId" element={<CEdit />} />
          <Route path="/view/:viewId" element={<View />} />
          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
