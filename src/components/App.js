import { lazy, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "../App.css";
import { UserProvider } from "./Users/UserContext";

import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import UsersPicker from "./Users/UsersPicker";
import PageSpinner from "./UI/Spinner";
import ErrorBoundary from "./UI/ErrorBoundary";

const BookablesPage = lazy(() => import("./Bookables/BookablesPage"));
const BookingPage = lazy(() => import("./Booking/BookingPage"));
const UsersPage = lazy(() => import("./Users/UsersPage"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="App">
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt />
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen />
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <UsersPicker />
            </header>
            <ErrorBoundary
              fallback={
                <Fragment>
                  <h1>Something went wrong!</h1>
                  <p>Try reloading the page.</p>
                </Fragment>
              }
            >
              <Suspense fallback={<PageSpinner/>}>
                <Routes>
                  <Route path="/bookings" element={<BookingPage/>}/>
                  <Route path="/bookables/*" element={<BookablesPage/>}/>
                  <Route path="/users" element={<UsersPage/>}/>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}
