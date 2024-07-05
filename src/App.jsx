import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import AdminDashboard from "./_root/pages/adminDashboard/AdminDashboard";
import StoreOwnerDashboard from "./_root/pages/storeOwnerDashboard/StoreOwnerDashboard";
import Dashboard from "./_root/pages/userDashbord/Dashboard";
import RootLayout from "./_root/RootLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <main className='bg-black text-white'>
      <Toaster richColors={true} expand={true} position='top-right' />
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>
        {/* Private Routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          {user?.role === "admin" && (
            <Route index element={<AdminDashboard />} />
          )}
          {user?.role === "store_owner" && (
            <Route index element={<StoreOwnerDashboard />} />
          )}
          {user?.role === "normal" && <Route index element={<Dashboard />} />}
        </Route>
      </Routes>
    </main>
  );
};

export default App;
