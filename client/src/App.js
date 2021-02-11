import React from "react";
import Nav from "./Nav";
import Mairie from "./Mairie";
import Hopital from "./Hopital";
import Prefecture from "./Prefecture";
import RechercherMembre from "./RechercherMembre";
import PageAdmin from "./PageAdmin";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomepagePublique from "views/HomepagePublique";
import HomepageCitoyen from "views/HomepageCitoyen";
import FichePersonne from "views/FichePersonne";
import VueVérificationIdentité from "views/VueVerificationIdentité";
import DemoFooter from "components/Footers/DemoFooter";
import Navbar from "components/Headers/Navbar";
import AccueilPrefecture from "views/Préfecture/AccueilPrefecture"
import AccueilMairie from "views/Mairie/AccueilMairie";
import AccueilHopital from "views/Hopital/AccueilHopital";
import EnregistrerNaissance from "views/Hopital/EnregistrerNaissance";
import ValiderIdentité from "views/Préfecture/ValiderIdentité"
import DeclarerMariage from "views/Mairie/DeclarerMariage";
import DeclarerMariageTest from "views/Mairie/DeclarerMariageTest";

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Switch>
          <Route path="/" exact component={PageAdmin} />
          <Route path="/hopital" component={Hopital} />
          <Route path="/mairie" component={Mairie} />
          <Route path="/prefecture" component={Prefecture} />
          <Route path="/rechercherMembre" component={RechercherMembre} />
          {/*<Route path="/home-citoyen" component={HomepageCitoyen} />*/}
          <Route path="/home-citoyen" render={(props) => <HomepageCitoyen {...props}/>}/>
          <Route path="/home" component={HomepagePublique} />
          <Route path="/fiche-personne" render={(props) => <FichePersonne {...props}/>}/>
          <Route path="/valider-identite" render={(props) => <ValiderIdentité {...props}/>}/>
          <Route path="/declarer-mariage" render={(props) => <DeclarerMariage {...props}/>}/>
          <Route path="/verification-id" component={VueVérificationIdentité} />
          <Route path="/home-prefecture" component={AccueilPrefecture} />
          <Route path="/home-mairie" component={AccueilMairie} />
          <Route path="/home-hopital" component={AccueilHopital} />
          <Route path="/hopital-naissance" component={EnregistrerNaissance} />


        </Switch>
      <DemoFooter/>
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
