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
    Input,
    FormGroup,
    Label,
  } from "reactstrap";

const TITLE = 'Hopital - Naissance validée'

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
            
            <Container>
            <Row style={{paddingTop:"100px"}}>
                <div className="flex-container-left-center">
                    <img style={{width:"80px"}} alt="..." src={imageValider}/>
                    <h1 className="ml-4" style={{color:"gray"}}>Naissance validée</h1>
                </div>
            </Row>
            <div style={{height:"80px"}}></div>
                <Col className="text-left col-sm-12 col-md-6 offset-md-3">
                    <Row style={{paddingTop:"30px"}}>
                       <h2 style={{color:"gray"}}>Nouvelle naissance validée</h2>
                    </Row>
                    <Row style={{marginLeft:"30px"}}> 
                       <SimpleTable data={this.MakeTableRecap().slice(0,1)}/>
                    </Row>                  
                    <Form>
                        <Row style={{paddingTop:"30px"}} >
                            <Col className="offset-sm-8">
                                <Button onClick={(e)=>{this.handleClick(e)}} className="btn-round btn ml-8 btn-info" color="info">
                                    Terminer
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>            

        </Container>             
            
            
            </>
         );
    }
}
 
export default NaissanceValidee;