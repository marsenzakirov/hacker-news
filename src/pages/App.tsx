import React from "react";
import Dashboard from "./Dashboard";
import Header from "../components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import New from "./Article";
function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/article=:id" component={New} />
        </Switch>
    </Router>
  );
}

export default App;
