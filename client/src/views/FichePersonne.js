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
        source:this.props.location.state.URL //Stocker l'URL du composant appelant
      }

    constructor(props) {
        super(props)
        /*{!this.props.location.state.URL && this.setState({source:this.props.location.state.URL})}
        console.log("constructeur")
        console.log(this.state.source)*/
    }

    getPerson(){
        return getPerson()
    }

    handleClickBack(e){
        console.log(this.state.source)
        this.props.history.push({
            pathname:this.state.source,
        });
    }

    render() { 
        return (
        <>  
            <Container>
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <i onClick={(e) => this.handleClickBack(e)} class="fa fa-arrow-left mr-10 fa-3x" style={{}}></i>                         
                        <h1 className="ml-4" style={{color:"gray"}}>FICHE PERSONNE</h1>
                    </div>
                </Row>
                <div>{this.props.state}</div>
                <Row style={{paddingTop:"100px"}}>        
                    <InfoPersonne data={this.getPerson()}></InfoPersonne>
                </Row>
            </Container>
        </>
        );
    }
}
 
export default FichePersonne;