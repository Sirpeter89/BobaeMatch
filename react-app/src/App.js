import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import HomePage from "./components/SplashPage/Home";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import PreferencePage from "./components/PreferencesPage/PreferencesPage";
import EditProfilePage from "./components/EditProfilePage/EditProfilePage";
import EditPreferencePage from "./components/EditPreferencesPage/EditPreferencesPage";
import FindBobaes from "./components/FindBobaesPage/FindBobaes";
import MatchPage from "./components/MatchPage/MatchPage";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  let homeOrProfile;
  if (user){
    homeOrProfile = <ProfilePage />
  } else {
    homeOrProfile = <HomePage />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/" exact={true} >
          {homeOrProfile}
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/preferences" exact={true} >
          <PreferencePage />
        </ProtectedRoute>
        <ProtectedRoute path="/editProfile" exact={true} >
          <EditProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/editPreferences" exact={true} >
          <EditPreferencePage/>
        </ProtectedRoute>
        <ProtectedRoute path="/findBobaes" exact={true} >
          <FindBobaes />
        </ProtectedRoute>
        <ProtectedRoute path="/matches" exact={true} >
          <MatchPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
