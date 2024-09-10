import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignUp from "./pages/signup/SignUp";
import UserOnboarding from "./pages/userOnboarding/UserOnboarding";
import Home from "./pages/home/Home";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CursorTrail from "./components/CursorTrail";

function App() {
  return (
    <Router>
      <CursorTrail />

      <AuthProvider>
        <Routes className="bodyContainer">
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/useronboarding"
            element={
              <ProtectedRoute>
                <UserOnboarding />
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
