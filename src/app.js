import React, { Component, Suspense, lazy } from "react";
import { HashRouter, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Suspense fallback={renderLoader()}>
        <HashRouter></HashRouter>
      </Suspense>
    );
  }
}

const renderLoader = () => <div>Loading...</div>;
