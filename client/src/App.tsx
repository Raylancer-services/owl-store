import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import HomePage from "./pages/Dashboard/Home";
import AuthGuard from "./guard/AuthGuard";
import YourOrder from "./pages/Dashboard/Orders";
import Billings from "./pages/Dashboard/Billings";
import MerchantDashboard from "./pages/merchant/Dashboard";
import Withdraw from "../src/pages/merchant/withdraw/withdraw";
import TotalCards from "./pages/merchant/TotalCards";
import SignupSeller from "./pages/merchant/Auth/Signup";
import Seller from "./guard/Seller";
import Checkout from "./pages/Dashboard/Checkout";
import Wallet from "./pages/Dashboard/Wallet";
import Payment from "./pages/Dashboard/Payment";
import News from "./pages/Dashboard/News";
import Tickets from "./pages/Dashboard/Tickets";
import Rules from "./pages/Dashboard/Rules";
function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          
          <Routes>
            <Route path="/" element={<AuthGuard />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/orders" element={<YourOrder />} />
              <Route path="/billings" element={<Billings />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/news" element={<News />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/rules" element={<Rules />} />
            </Route>
            <Route path="/" element={<Seller />}>
              <Route
                path="/merchant-dashboard"
                element={<MerchantDashboard />}
              />
              <Route path="/merchant-withdraw" element={<Withdraw />} />
              <Route path="/total-cards" element={<TotalCards />} />
            </Route>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/register-seller" element={<SignupSeller />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
