import React, { Component } from 'react';

import Actualités from "components/Actualités"
import CarouselComponent from "components/Carroussels/CarouselComponent"
import HomepageHeader from "components/Headers/HomepageHeader"
import QuestionsRéponses from "components/QuestionsRéponses"
import TextesRef from "components/TextesRef"
import Connexion from 'components/Connexion'
import { useState, setState }from 'react';

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
    }

    constructor(props) {
        super(props)
      }
    
      /*Fonction pour changer l'état du composant affiché en bas à gauche : tuiles ou formualire
      de connexion */
      triggerClickConnexion = () => {
        this.setState({isTileState: false})
        this.setState({ isConnexionState: true })
      }
    
    render() { 
        return (
            <>
            <HomepageHeader/>
            <Container> 
                <div style={{height:"100px"}}/>
                <Row>
                    <Col  md={{ size: 7, offset: 0 }}>
                        <Row>
                            <CarouselComponent/>
                        </Row>
                    </Col>
                    <Col >
                        <Row>
                            <Actualités className="ml-auto"/>
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
                                <TileLogoButton titre="VERIFIEZ UNE IDENTITE" contenu="Le service de vérification d’identité vous permet de confirmer les déclarations d’identité."/>
                            </Row></>}
                        </div>
                        <div>{this.state.isConnexionState}{this.state.isConnexionState && 
                            <Connexion/>}
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <QuestionsRéponses/>
                            <div style={{height:"20px"}}/>
                            <TextesRef/>
                        </Row>
                    </Col>
                </Row>
            </Container>
            </>
          );
    }
}

export default HomepagePublique;