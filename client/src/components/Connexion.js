import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Connexion extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <div className="container-block-connexion">
                <div className="element-block-connexion">
                    <h2 style={{color:"#FBC658"}}>SE CONNECTER</h2>
                </div>
                <div className="element-block-connexion">
                    <div className="container-form-connexion">
                        <input placeholder="Identifiant" type="text" className="form-control element-form-connexion"></input>
                        <input placeholder="Mot de passe" type="text" className="form-control element-form-connexion"></input>
                        <Link to="/home-citoyen">
                            <button type="button" className="btn-round btn btn-info element-form-connexion">
                                Se connecter
                            </button>
                        </Link>
                    </div>
                </div> 
            </div>
            </>
         );
    }
}
 
export default Connexion;