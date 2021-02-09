import React, { Component } from 'react';
import ComponentVérificationID from "components/ComponentVérificationID"
import {
    Container,
    Row,
    Col,
  } from "reactstrap";

class VueVérificationIdentité extends Component {
    state = {  }
    render() { 
        return (
            <Container>
                <Row style={{height:"100px"}}></Row>
                <Row>
                    <Col md={{ size: 8, offset: 0 }}>
                        <Row className="text-center" style={{paddingTop:"50px"}, {marginBottom:"50px"}}>
                            <h1 style={{color:"gray"}}>Vérifier une identité</h1>
                        </Row>
                        <Row className="text-center" style={{paddingTop:"50px"}, {paddingBottom:"50px"}}>
                            <div style={{color:"#66615B"}}>Pour vérifier l’identité d’un citoyen, saisissez le hash indiqué sur son extrait d’acte de naissance.</div>
                        </Row>
                        <Row style={{marginTop:"20px"}}>
                            <ComponentVérificationID></ComponentVérificationID>
                        </Row>
                    </Col>
                    <Col>
                        <div>BLABLA</div>
                    </Col>
                </Row>
            </Container>
          );
    }
}
 
export default VueVérificationIdentité;