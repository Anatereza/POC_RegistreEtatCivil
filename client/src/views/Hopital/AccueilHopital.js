import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
  } from "reactstrap";

class AccueilHopital extends Component {
    state = {  }
    render() { 
        return ( 
            <Container className="body-container">
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <h1 className="ml-4" style={{color:"gray"}}>ACCUEIL</h1>
                    </div>
                </Row>
                <Row style={{paddingTop:"100px"}}>
                <Col className="mr-1 ml-auto" md="2" sm="3">
                            <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/IconesAccueils/Ajouter.png")}
                            />
                            <p style ={{fontWeight:"bold"}} className="text-center ct-blue">Enregistrer une nouvelle naissance</p>
                        </Col>
                        <Col className="mr-auto ml-auto" md="2" sm="3">
                            <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/IconesAccueils/Rechercher.png")}
                            />
                            <p style ={{fontWeight:"bold"}} className="text-center ct-azure">Rechercher une naissance</p>
                        </Col>
                </Row>
            </Container>
         );
    }
}
 
export default AccueilHopital;