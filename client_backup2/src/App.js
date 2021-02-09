import React from "react";
import Nav from "./Nav";
import Mairie from "./Mairie";
import Hopital from "./Hopital";
import Prefecture from "./Prefecture";
import PageAdmin from "./PageAdmin";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomepagePublique from "views/HomepagePublique"
import HomepageCitoyen from "views/HomepageCitoyen";
import FichePersonne from "views/FichePersonne";
import VueVérificationIdentité from "views/VueVerificationIdentité";

function App() {
  return (
    <Router>
      <div className="App">
      <Nav/>
        <Switch>
          <Route path="/" exact component={PageAdmin} />
          <Route path="/hopital" component={Hopital} />
          <Route path="/mairie" component={Mairie} />
          <Route path="/prefecture" component={Prefecture} />
          <Route path="/home-citoyen" component={HomepageCitoyen}/>
          <Route path="/home" component={HomepagePublique}/>
          <Route path="/fiche-personne" component={FichePersonne}/>
          <Route path="/verification-id" component={VueVérificationIdentité}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default App;
