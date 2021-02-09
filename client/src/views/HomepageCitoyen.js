import React, { Component } from 'react';
import InfoPersonne from "components/InfoPersonne"
import ActeDeNaissance from "components/GeneratePDF"
import getPerson from 'services/getPerson';
import { PDFDownloadLink } from '@react-pdf/renderer'


import {
    Button,
    Container,
    Row,
    Col,
  } from "reactstrap";
import GenerateQRCode from 'components/GenerateQRCode';
  

class HomepageCitoyen extends Component {
    state = {
    
      }

    constructor(props) {
        console.log("Constructeur")
        super(props)
    }


    getPerson(){
        return getPerson()
    }

    render() { 
        return (
            <Container>
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <img style={{width:"80px"}} alt="..." src={require("assets/img/icon_homepage_citizen.jpg")}/>
                        <h1 className="ml-4" style={{color:"gray"}}>MES INFORMATIONS PERSONNELLES</h1>
                    </div>
                </Row>

                <Row style={{paddingTop:"100px"}}>
                    <Col style={{paddingLeft: "60px"}, {textAlign:"center"}} md={{ size: 9, offset: 0 }}>
                        <InfoPersonne data={this.getPerson()}></InfoPersonne>
                        <div style={{marginTop:"120px"}}>
                            <h4>Mon code QR</h4>
                            <img alt="..." src={GenerateQRCode()}/>
                        </div>
                    </Col>
                    <Col>
                        <Row style={{display:"flex"}, {flexDirection:"column"}, {justifyContent:"center"}}>
                            <h2 className="ct-orange" style={{textAlign:"left"}}>GENERER MES DOCUMENTS</h2>
                            <div style={{marginTop: "30px"}, {marginBottom: "30px"}} id="buttons">
                                <Button type="button" className="btn-round ml-1 btn-download-file" color="info">
                                        <i class="fa fa-download mr-1"></i>
                                        <PDFDownloadLink document={ActeDeNaissance()} fileName="ActeDeNaissance.pdf" className="btn-download-file">
                                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Générer mon acte de naissance')}
                                        </PDFDownloadLink>
                                </Button>
                                <Button type="button" className="btn-round ml-1" color="info">
                                    <i class="fa fa-download mr-1"></i>Générer mon acte de mariage
                                </Button>
                                {/*<BlobProvider document={MyDocument()}>
                                    {({ url }) => (
                                        <a href={url} target="_blank">Open in new tab</a>
                                    )}
                                    </BlobProvider> Solution pour ouvrir le pdf dans un nouvel onglet*/}
                            </div>
                        </Row>
                        <Row style={{paddingTop:"30px"}, {display:"flex"}, {flexDirection:"column"}, {alignItems:"flex-start"}}>
                            <h2 className="ct-orange" style={{textAlign:"left"}}>MES DEMARCHES</h2>
                            <h6 style={{paddingTop:"30px"}}>Etats Civils</h6>
                            <div className="ligne-menu">Changement d'état civil</div>
                            <div className="ligne-menu">Livret de famille</div>
                            <div className="ligne-menu" style={{fontWeight:"bold"}}>Actes d’états civils</div>
                            <h6 style={{paddingTop:"30px"}}>Elections</h6>
                            <div className="ligne-menu">S’inscrire sur les listes électorales</div>
                            <div className="ligne-menu">Déclarer un changement de circonscription</div>
                            <h6 style={{paddingTop:"30px"}}>Papiers</h6>
                            <div className="ligne-menu">Faire une demande de passeport</div>
                            <div className="ligne-menu">Faire une demande de titre d’identité</div>
                            <h6 style={{paddingTop:"30px"}}>Famille</h6>
                            <div className="ligne-menu">Déclarer un décès</div>
                            <div className="ligne-menu">Faire une demande de divorce</div>
                        </Row>
                    </Col>
                </Row>
            </Container>
          );
    }
}
 
export default HomepageCitoyen;