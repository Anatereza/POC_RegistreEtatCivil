import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Connexion extends Component {
    state = {
        login: "DupondPierre",
        pwd: ""        
    };

   
    handleClick(){
        console.log("=== handleClick ===")
        console.log(this.state)
        this.history.push({
            pathname:'home-citoyen',
            state: this.state
        });
    }

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
                        {/*<button onClick={this.handleClick()} type="button" className="btn-round btn btn-info element-form-connexion">
                                Se connecter
                        </button>*/}                        
                        {<Link to={{
                            pathname: '/home-citoyen',
                            aboutConnexion: {
                                connexion : this.state.login
                            }
                            }}>
                            <button  type="button" className="btn-round btn btn-info element-form-connexion">
                                Se connecter
                            </button>
                        </Link>}                        
                    </div>
                </div> 
            </div>
            </>
         );
    }
}
 
export default Connexion;