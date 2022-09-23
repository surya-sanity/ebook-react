import "./App.css";
import Login from "./screens/Authentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/Authentication/SignUp";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AuthVerify from "./components/AuthVerify";
import HomeWrapper from "./screens/HomeWrapper";
import NavBar from "./components/NavBar";
import CartScreen from "./screens/CartScreen";
import WalletScreen from "./screens/WalletScreen";
import MyBooks from "./screens/MyBooks";
import ReadBook from "./screens/ReadBook";
import AllUsers from "./screens/Admin/AllUsers";
import AdminDash from "./screens/Admin/AdminDash";
import ManageBookScreen from "./screens/Admin/ManageBook";
import AdminAllBooks from "./screens/Admin/AdminAllBooks";
import AllCartItems from "./screens/Admin/AllCartItems";
import AllUserBooks from "./screens/Admin/AllUserBooks";

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<NavBar />}>
          <Route path="/home" element={<HomeWrapper />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/wallet" element={<WalletScreen />} />
          <Route path="/adminDash" element={<AdminDash />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allBooks" element={<AdminAllBooks />} />
          <Route path="/allCartItems" element={<AllCartItems />} />
          <Route path="/allUserBooks" element={<AllUserBooks />} />
          <Route path="/myBooks" element={<MyBooks />} />
          <Route path="/read/:bookId" element={<ReadBook />} />
          <Route path="/book" element={<ManageBookScreen />}>
            <Route path=":id" element={<ManageBookScreen />} />
          </Route>
        </Route>
      </Routes>
      <AuthVerify />
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
