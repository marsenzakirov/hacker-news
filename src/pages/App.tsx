import React from "react";
import Dashboard from "./Dashboard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import New from "./New";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/new=:id" component={New} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
