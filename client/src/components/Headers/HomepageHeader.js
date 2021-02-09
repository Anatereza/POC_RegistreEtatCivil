import React, { Component } from 'react';
import { Button, Container } from "reactstrap";
import "assets/css/paper-kit.css"
import {
    Row,
    Col,
  } from "reactstrap";
class HomepageHeader extends Component {
    state = {  }
    render() { 
        return (
            <>
            <div className="page-header">
                <Container>
                    <div className="container-logo-header">
                        <div className="element-logo-header"> 
                        <img alt="..." src={require("assets/img/logo_cote_ivoire.png")} />
                        </div>
                        <div className="element-logo-header"> 
                                <div style={{fontWeight:"bold"}, {color:"#fbc658"}}>WWW.GOUV.CI/ETATSCIVILS <br/></div>
                                <div style={{color:"#66615b"}}>LE PORTAIL DES ACTES D’ÉTATS CIVILS <br/></div>
                                <div style={{color:"#66615b"}}>DE LA CÔTE D’IVOIRE <br/></div>
                        </div>
                        <div className="element-logo-header"> 
                            <img style={{width:"150px"}} alt="..." src={require("assets/img/question.png")} />
                        </div>
                    </div>
                    
                </Container>
            </div>
            </>
          );
    }
}
 
export default HomepageHeader;