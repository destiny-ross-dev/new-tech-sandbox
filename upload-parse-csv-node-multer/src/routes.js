import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import FileView from "./FileView";

export const Main = (
  <Switch>
    <Route exact path="/" render={props => <Dashboard />} />
    <Route path="/file/:id" render={props => <FileView {...props} />} />
  </Switch>
);
