import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from "./client";
import Profile from "./components/Profile";
import ProfileTest from "./components/ProfileTest";
import AnimalList from "./components/AnimalList";

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Router>
            <Route exact={true} path="/" component={ProfileTest} />
            <Route path="/ex" component={Profile} />
            <Route path="/pets" component={AnimalList} />
          </Router>
          {/* <Profile />
          <h1>test</h1>
          <ProfileTest/> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
