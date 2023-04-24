import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import CompaniesList from "./companies/CompaniesList";
import CompanyCard from "./companies/CompanyCard";
import JobsList from "./jobs/JobsList";
import JobCard from "./jobs/JobCard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserJobApplications from "./users/UserJobApplications";
import UserProfileEdit from "./users/UserProfileEdit";
import AuthContext from "./authContext";

function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || null
  );

  const updateUser = async ({ token, username }) => {
    setToken(token);
    setUsername(username);
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("username", JSON.stringify(username));
  }, [token, username]);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ username, token }}>
          {token ? <Navbar updateUser={updateUser} /> : null}
          <Routes>
            <Route path="/login" element={<Login updateUser={updateUser} />} />
            <Route
              path="/register"
              element={<Register updateUser={updateUser} />}
            />
            {token ? (
              <>
                <Route path="/jobly" element={<Homepage />} />
                <Route path="/companies" element={<CompaniesList />} />
                <Route path="/companies/:handle" element={<CompanyCard />} />
                <Route path="/jobs" element={<JobsList />} />
                <Route path="/jobs/:id" element={<JobCard />} />
                <Route
                  path="/users/:username/edit"
                  element={<UserProfileEdit />}
                />
                <Route
                  path="/users/:username/applications"
                  element={<UserJobApplications />}
                />
                <Route path="*" element={<Navigate to="/jobly" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
