import "./App.css";
import { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connectSocket } from "./assets/socket";
import { SocketProvider } from "./components/SocketProvider";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

import {
  Landing,
  SignUp,
  UserOnboarding,
  Home,
  Feed,
  CreatePoll,
  Profile,
  PollDetails,
  NotFound,
} from "./components/LazyComponents";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = connectSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <SocketProvider socket={socket}>
          <Suspense fallback={<Loading />}>
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
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home>
                      <Feed />
                    </Home>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-a-poll"
                element={
                  <ProtectedRoute>
                    <Home>
                      <CreatePoll />
                    </Home>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:username"
                element={
                  <ProtectedRoute>
                    <Home>
                      <Profile />
                    </Home>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/poll/:pollId"
                element={
                  <ProtectedRoute>
                    <Home>
                      <PollDetails />
                    </Home>
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
