import React, { Component } from 'react';
import InfoPersonne from "components/InfoPersonne"
import InputDynamique from "components/InputDynamique"
import {
    Container,
    Row,
    Col,
  } from "reactstrap";
import getPerson from 'services/getPerson';


class FichePersonne extends Component {
    state = {
      }

    constructor(props) {
        super(props)
    }

    getPerson(){
        return getPerson()
    }

    render() {
        return (
        <>  
            <Container>
                <Row className="text-center" style={{paddingTop:"50px"}}>
                    <i class="fa fa-arrow-left mr-10 fa-3x" style={{}}></i> 
                    <h1 style={{color:"gray"}}>FICHE PERSONNE</h1>
                </Row>
                <InputDynamique etat="Default"></InputDynamique>
                <Row style={{paddingTop:"50px"}}>
                    <Col>
                        <img alt="..." src={require("assets/img/icon_homepage_citizen.jpg")}/> 
                    </Col>
                </Row>
                <Row style={{paddingTop:"100px"}}>        
                    <InfoPersonne data={this.getPerson()}></InfoPersonne>
                </Row>
            </Container>
        </>
        );
    }
}
 
export default FichePersonne;