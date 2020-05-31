import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import HomePage from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.HOME} component={HomePage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
