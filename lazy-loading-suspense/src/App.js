import React, { Suspense, lazy } from "react";
import "./App.css";

const Artists = React.lazy(() => import("./Artists"));
const Performers = lazy(() => import("./Performers"));

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Suspense
          fallback={
            <div className="lds-spinner">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          }
        >
          <Artists />
          <Performers />
        </Suspense>
      </div>
    );
  }
}

export default App;
