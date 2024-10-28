import { Navigate } from "react-router";

export const Root: React.FC = () => {
  // TODO: check user and redirect to it's main page
  return <Navigate to="/teacher" replace={true} />;
};
