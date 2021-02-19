import React, { Component } from 'react';
import ComponentVérificationID from "components/ComponentVérificationID";
import image1 from "assets/img/ImagesHomeCitoyen/Image1.png";
import image2 from "assets/img/ImagesHomeCitoyen/Image2.png";
import image3 from "assets/img/ImagesHomeCitoyen/Image3.png";
import image4 from "assets/img/ImagesHomeCitoyen/Image4.png";
import imageAjouter from 'assets/img/IconesAccueils/Ajouter.png'
 

import {
    Container,
    Row,
    Col,
  } from "reactstrap";

class VueVérificationIdentité extends Component {
    state = {
        paramHash : this.props.history.location.search.slice(1,this.props.history.location.search.length)
    }

    constructor(props) {
        super(props)
    }

    render() { 

        console.log(this.props.history);
        return (
            <Container style={{minHeight:"100vh"}}>
                <Row style={{height:"100px"}}></Row>
                <Row style={{height:"100%"}}>
                    <Col md={{ size: 8, offset: 0 }}>
                        <Row className="text-center" style={{paddingTop:"50px"}, {marginBottom:"50px"}}>
                            <h1 style={{color:"gray"}}>Vérifier une identité</h1>
                        </Row>
                        <Row className="text-center" style={{paddingTop:"50px"}, {paddingBottom:"50px"}}>
                            <div style={{color:"#66615B"}}>Pour vérifier l’identité d’un citoyen, saisissez le hash indiqué sur son extrait d’acte de naissance.</div>
                        </Row>
                        <Row style={{marginTop:"20px"}}>
                            <ComponentVérificationID defaultHash={this.state.paramHash && this.state.paramHash}></ComponentVérificationID>
                        </Row>
                    </Col>

                    <Col className="no-gutter flex-container-col-left bloc-how-to" style={{marginLeft:"20px"}}>
                        <h4>Comment ça marche ? </h4>
                        <Row className="flex-container-left-center" > 
                            <p className="round-numbers"><div style={{verticalAlign:"middle"}}>1</div></p>
                            <div className="text-how-to">Je saisi la clé de sécurité</div>  
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"250px"}} src={image1}/>
                        <Row className="flex-container-left-center" >
                            <p className="round-numbers"><div style={{verticalAlign:"middle"}}>2</div></p>
                            <div className="text-how-to">Je lance la recherche</div>
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"250px"}} src={image2}/>
                        <Row className="flex-container-left-center" >
                            <p className="round-numbers"><div style={{verticalAlign:"middle"}}>3</div></p>
                            <div className="text-how-to">Les données sont certifiées</div>
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"250px"}} src={image3}/>
                        <Row className="flex-container-left-center" >
                            <div style={{marginLeft:"70px"}} className="text-how-to">Sinon je suis averti.e</div>
                        </Row>
                        <img className="img-verif-id" alt="..." style={{width:"250px"}} src={image4}/>
                    </Col>
                </Row>
            </Container>
          );
    }
}
 
export default VueVérificationIdentité;