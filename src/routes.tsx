import AuthGuard from "components/authentication/AuthGuard";
import GuestGuard from "components/authentication/GuestGuard";
import DashboardLayout from "components/Layouts/DashboardLayout";
import LoadingScreen from "components/LoadingScreen";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(lazy(() => import("./pages/authentication/Register")));
const ForgetPassword = Loadable(lazy(() => import("./pages/authentication/ForgetPassword")));

// Dashboard pages
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

// user profile
const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

// user management
const EmployeeList = Loadable(lazy(() => import("./pages/employees/EmployeeList")));
const UserGrid = Loadable(lazy(() => import("./pages/employees/EmployeeGrid")));
const AddNewUser = Loadable(lazy(() => import("./pages/employees/AddNewEmployee")));

// error
const Error = Loadable(lazy(() => import("./pages/404")));

// routes
const routes = [
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardSaaS />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "employees",
        element: <EmployeeList />,
      },
      {
        path: "employees/new",
        element: <AddNewUser />,
      },
      {
        path: "employees/:employee_id/edit",
        element: <AddNewUser />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
