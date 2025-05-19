import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Board from "./pages/Boards/_id";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";
import AccountVerification from "~/pages/Auth/AccountVerification";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path="/"
        element={
          // replace giá trị true để nó thay thế route /, route / sẽ ko còn nằm trong history của Browser
          <Navigate to="/boards/681e1d81c89fbb2a1b980d82" replace={true} />
        }
      />

      {/**Protected Routes (những routes chỉ cho truy cập sau khi đã login) */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* Board Details */}
        <Route path="/boards/:boardId" element={<Board />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* 404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
