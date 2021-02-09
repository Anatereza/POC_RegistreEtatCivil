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

    handleClickBack(){
        alert("TODO : Implémenter le routing retour à la page précédente")
    }

    render() {
        return (
        <>  
            <Container>
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <i onClick={this.handleClickBack} class="fa fa-arrow-left mr-10 fa-3x" style={{}}></i> 
                        <h1 className="ml-4" style={{color:"gray"}}>FICHE PERSONNE</h1>
                    </div>
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