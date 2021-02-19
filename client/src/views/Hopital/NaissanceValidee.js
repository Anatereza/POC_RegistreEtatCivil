import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import imageValider from 'assets/img/IconesAccueils/Valider.png'
import SimpleTable from 'components/SimpleTable';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
  } from "reactstrap";

const TITLE = 'Côte d’Ivoire - Naissance enregistrée'

class NaissanceValidee extends Component {
    
    state = this.props.location.state

    constructor(props){
        super(props);

   
     }


    handleClick(e){
        console.log("=== handleClick ===")
        console.log("Redirection homepage hopital")
        this.props.history.push({
            pathname:'home-hopital'
        })
    }

    MakeTableRecap(){
        console.log(this.state)
        const result = [
            {name : "Numéro d’identification unique", price : this.state},
          ]

        return (result);
    }

    render() { 
        return ( 
            <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
            
            <Container className="body-container">
                <Row style={{paddingTop:"180px"}} />
                <Row className="text-center">
                    <Col className="col-sm-12 col-md-12 offset-md-2">
                        <div className="container-tile-validation">
                            <img className="img-tile-valider" alt="..." src={imageValider}/>
                            <div>
                                <h1 style={{color:"gray"}}>Naissance saisie</h1>
                                <SimpleTable className="simple-table-validation"  data={this.MakeTableRecap().slice(0,1)}/>
                                <div style={{paddingTop:"30px"}}>Cette naissance va maintenant être soumise à validation au service des états civils</div>
                            </div >
                        </div>
                        <Row style={{paddingTop:"30px"}}>
                            
                                <Col className="offset-md-13">
                                    <Button onClick={(e)=>{this.handleClick(e)}} className="btn-round btn ml-8 btn-info" color="info">
                                        Terminer
                                    </Button>
                                </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>             
            
            
            </>
         );
    }
}
 
export default NaissanceValidee;