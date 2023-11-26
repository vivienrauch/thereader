import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/bookclubevents" render={() => <h1>Book Club Events</h1>} />
              <Route exact path="/bookofthemonth" render={() => <h1>Book Of The Month</h1>} />
              <Route render={() => <p>Page Not Found</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App