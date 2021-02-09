import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';

class Navbar extends Component {
    state = {  }
    render() { 
        return (
            <div className="navbar-perso">
                <Container>
                    <div className="container-navbar">
                        <ul className="menu-navbar">
                            <li className="element-menu-navbar">Etat civils</li>
                            <li className="element-menu-navbar">Elections</li>
                            <li className="element-menu-navbar">Papiers</li>
                            <li className="element-menu-navbar">Famille</li>
                        </ul>
                        <div className="connexion-navbar">
                            <span style={{textAlign:"center"}}>
                                <i style={{paddingRight:"30px"}}class="fa fa-user"></i>
                                Se connecter
                            </span>
                            
                        </div>
                    </div>
                </Container>
            </div>
          );
    }
}
 
export default Navbar;