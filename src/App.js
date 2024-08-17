import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TypingTips from "./components/TypingTips";
import TypingWorld from "./pages/TypingWorld";

function App() {
  const location = useLocation();

  const shouldHideNavAndFooter =
    location.pathname === "/typing-world/basic" ||
    location.pathname === "/typing-world/advanced";

  return (
    <div className="App">
      {!shouldHideNavAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/typing-world/basic"
          element={<TypingWorld mode="basic" />}
        />
        <Route
          path="/typing-world/advanced"
          element={<TypingWorld mode="advanced" />}
        />
        <Route path="/typing-tips" element={<TypingTips />} />
      </Routes>

      {!shouldHideNavAndFooter && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
