import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

import CityList from "./components/CityList";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import User from "./components/User";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

// to reduce the bundle size use lazy() and <Suspense/>
const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* to display a spinner while components chunks are being retrieved from the server */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                {/* like redirect */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
                <Route path="user" element={<User />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
