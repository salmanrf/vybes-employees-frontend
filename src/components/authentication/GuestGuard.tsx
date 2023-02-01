import useAuth from "hooks/useAuth";
import { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";

// component props interface
interface GuestGuardProps {
  children: ReactNode;
}
const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
