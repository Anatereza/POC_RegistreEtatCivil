import React, { Component } from 'react';
import InfoPersonne from "components/InfoPersonne"
import { Helmet } from 'react-helmet'
import {
    Container,
    Row,
    Col,
    Button
  } from "reactstrap";
import getPerson from 'services/getPerson';

const TITLE = 'Fiche personne'

class FichePersonne extends Component {
    
    state = this.props.location.state 

    constructor(props) {
        
        console.log("=== FichePersonne ===")
        super(props)
        /*{!this.props.location.state.URL && this.setState({source:this.props.location.state.URL})}
        console.log("constructeur")
        console.log(this.state.source)*/
        console.log(this.state)
    }

    getPerson(){
        return getPerson()
    }

    handleClickBack(e){
        console.log("=== handleClickBack ===")
        console.log("source : " + this.state.source)
        this.props.history.push({
            pathname:this.state.URL,
        });
    }

    handleClickMariage(){
        console.log("=== handleClickMariage ===")
        this.setState({retourFichePersonne:"conjointOK"}, function(){
            console.log(this.state)
            this.props.history.push({
                pathname:this.state.URL,
                state : this.state
            })
        })
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
                        <i onClick={(e) => this.handleClickBack(e)} class="fa fa-arrow-left mr-10 fa-3x" style={{}}></i>                         
                        <h1 className="ml-4" style={{color:"gray"}}>FICHE PERSONNE</h1>
                    </div>
                </Row>
                <div>{this.props.state}</div>
                <Row style={{paddingTop:"100px"}}>     
                {/**TODO : Changer la source des données personnes */}   
                    <InfoPersonne data={this.getPerson()}></InfoPersonne>
                </Row>

                <Row style={{paddingTop:"50px"}}>
                    <Col className="col-sm-auto offset-sm-7">
                        {this.state.URL==="valider-identite" && 
                            <Button color="info">
                                Valider cette identité
                            </Button>
                        }
                        {this.state.URL==="declarer-mariage" && 
                            <Button onClick={() => this.handleClickMariage()} color="info">
                                Valider ce conjoint
                            </Button>
                        }
                    </Col>
                </Row>
                
                

            </Container>
        </>
        );
    }
}
 
export default FichePersonne;