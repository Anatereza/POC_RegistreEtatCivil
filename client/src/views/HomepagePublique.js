import React, { Component } from 'react';
import { Link, useHistory } from "react-router-dom";
import Actualités from "components/Actualités"
import CarouselComponent from "components/Carroussels/CarouselComponent"
import HomepageHeader from "components/Headers/HomepageHeader"
import QuestionsRéponses from "components/QuestionsRéponses"
import TextesRef from "components/TextesRef"
import Connexion from 'components/Connexion'

import {
    Container,
    Row,
    Col,
  } from "reactstrap";
import TileLogoButton from 'components/TileLogoButton';

class HomepagePublique extends Component {
    state = {
        isTileState: true,
        isConnexionState: false,
        redirect:false,
    }

    constructor(props) {
        super(props)
        this.HandleClick = this.HandleClick.bind(this);
      }

      HandleClick(identifiant){
        console.log("=== handleClick ===")
        this.props.history.push({
            pathname:'home-citoyen',
            state: identifiant
        });
    }
      
      /*Fonction pour changer l'état du composant affiché en bas à gauche : tuiles ou formualire
      de connexion */
    triggerClickConnexion = (e) => {
        console.log("=== triggerClickConnexion ===")
        this.setState({isTileState: false})
        this.setState({ isConnexionState: true })
    }
    
    render() { 
        return (
            <>
            <HomepageHeader/>
            <Container className="body-container"> 
                <div style={{height:"60px"}}/>
                <Row>
                    <Col  md={{ size: 7, offset: 0 }}>
                        <Row>
                            <CarouselComponent/>
                        </Row>
                    </Col>
                    <Col style={{marginLeft:"30px"}}>
                        <Row>
                            <Actualités style={{height:"445px"}} className="ml-auto"/>
                        </Row>
                    </Col>
                </Row>
                <div style={{height:"20px"}}/>
                <Row>
                    <Col   md={{ size: 7, offset: 0 }}>
                        {/*Le composant affiché par défaut est celui composé des deux tuiles connexion et vérification d'identité.
                        Au clic sur le bouton "Se connecter", ce composant est remplacé par le composant formulaire 
                        de connexin */}
                        <div>{this.state.isTileState}{this.state.isTileState && 
                            <><Row>
                                <TileLogoButton action={this.triggerClickConnexion} titre="PARTICULIERS" type="connexion" contenu="Connectez-vous à votre espace personnel pour consulter votre état civil et accéder à vos démarches."/>
                            </Row>
                            <Row>
                                <Link to="/verification-id">
                                    <TileLogoButton titre="VERIFIEZ UNE IDENTITE" contenu="Le service de vérification d’identité vous permet de confirmer les déclarations d’identité."/>
                                </Link>
                            </Row></>}
                        </div>
                        <div>{this.state.isConnexionState}{this.state.isConnexionState && 
                            
                            <Connexion ClickHandler={(e) => this.HandleClick(e)}/> }
                        </div>
                    </Col>
                    <Col style={{marginLeft:"30px"}}>
                        <Row>
                            <QuestionsRéponses/>
                            <div style={{height:"50px"}}/>
                            <TextesRef />
                        </Row>
                    </Col>
                </Row>
            </Container>
            </>
          );
    }
}

export default HomepagePublique;