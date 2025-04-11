import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate(); // this can only be called as a callback function and not as a top level function, so we are using useEffect for that..

  //1. Load authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //2. If there is no authenticated user, redirect to the /login
  //we have to use useEffect in order to be able to use navigate
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3. While loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there IS an authenticated user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
