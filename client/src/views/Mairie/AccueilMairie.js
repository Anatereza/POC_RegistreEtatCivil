import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
  } from "reactstrap";


  const TITLE = 'Mairie - Accueil'

class AccueilMairie extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container className="body-container">
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <h1 className="ml-4" style={{color:"gray"}}>ACCUEIL</h1>
                    </div>
                </Row>
                <Row style={{paddingTop:"100px"}}>
                        <Col className="mr-auto ml-auto" md="2" sm="3">
                            <Link to={{
                            pathname: '/declarer-mariage',
                            }}>
                                <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/IconesAccueils/Mariage.png")}
                                />
                                <p style ={{fontWeight:"bold"}} className="text-center ct-azure">Déclarer un mariage</p>
                            </Link>
                        </Col>
                        <Col className="mr-auto ml-auto" md="2" sm="3">
                            <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/IconesAccueils/Divorce.png")}
                            />
                            <p style ={{fontWeight:"bold"}} className="text-center ct-blue">Déclarer un divorce</p>
                        </Col>
                        <Col className="mr-auto ml-auto" md="2" sm="3">
                            <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require("assets/img/IconesAccueils/PACS.png")}
                            />
                            <p style ={{fontWeight:"bold"}} className="text-center ct-azure">Déclarer un PACS</p>
                        </Col>
                </Row>
            </Container>
            </>
         );
    }
}
 
export default AccueilMairie;