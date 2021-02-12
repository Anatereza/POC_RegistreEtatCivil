import React, { Component } from 'react';
import InfoPersonne from "components/InfoPersonne"
import ActeDeNaissance from "components/GeneratePDF"
import { PDFDownloadLink } from '@react-pdf/renderer'

import {
    Button,
    Container,
    Row,
    Col,
  } from "reactstrap";
import GenerateQRCode from 'components/GenerateQRCode';
  
// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";


class HomepageCitoyen extends Component {

    state = {
        CivilStateInstance: undefined,
        account: null,
        web3: null,
        login : '',
        sexe : '',
        nomFamille : '',
        premierPrenom : '',
        autresPrenoms : '',
        etatCivil : '',
        dateNaissance : '',
        communeNaissance : '',
        departementNaissance : '',
        nomFamilleMere : '',
        prenomMere : '',
        nomFamillePere : '',
        prenomPere : '',
        infosCitoyen : [],
        ready : false
    }    
    
    constructor(props) {
        console.log("=== Homepage Citoyen ===")
        super(props)
        console.log(this.props.location.state)
        /*if(this.props.location.state){
            this.state=this.props.location.state
            
        }*/
        
        
    }

    // Back 
    getPerson(){ 
        const result = [
            { name: "Sexe", price: this.state.sexe},
            { name: "Nom de famille", price: this.state.infosCitoyen[1]},
            { name: "Nom d’usage", price: this.state.infosCitoyen[2]},
            { name: "Premier prénom", price: this.state.infosCitoyen[3]},
            { name: "Autres prénoms", price: this.state.infosCitoyen[4]},
            { name: "Etat civil", price: this.state.infosCitoyen[5]},
            { name: "Date de naissance", price: this.state.infosCitoyen[6]},
            { name: "Commune de naissance", price: this.state.infosCitoyen[7]},
            { name: "Département de naissance", price: this.state.infosCitoyen[8]},
            { name: "Nom de famille de la mère", price: this.state.infosCitoyen[9]},
            { name: "Prénom de la mère", price: this.state.infosCitoyen[10]},
            { name: "Nom de famille du père", price: this.state.infosCitoyen[11]},
            { name: "Prénom du père", price: this.state.infosCitoyen[12]},
        ]
        
        return (result);
    }

    // Back
    // For testing only
    addCitoyen = async () => {
        
        const _sexe =  "Masculin";
        const _nomFamille = "Dupond";
        const _nomUsage = "Dupond";
        const _premierPrenom = "Pierre";
        const _autresPrenoms = "Marie Michael";
        const _login = this.state.login;
        //const _login = "DupondPierre";
        //this.setState({login : _login});
               
        try {  
            await this.state.CivilStateInstance.methods.addNaissance(_sexe, _nomFamille, _nomUsage, _premierPrenom, _autresPrenoms)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })
    
            alert('Naissance');
          } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            }        

        const _dateNaissance = "01/01/2000";
        const _communeNaissance = "Montpellier";
        const _departementNaissance = "Hérault (34)";
        
        try {  
            await this.state.CivilStateInstance.methods.addDonneesNaissance(_login, _dateNaissance, _communeNaissance, _departementNaissance)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })
    
            alert('Naissance');
          } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            } 


        const _nomFamilleMere = "Florent";
        const _prenomMere = "Julie";
        const _nomFamillePere = "Dupond";
        const _prenomPere = "Louis";
        
    
        try {  
            await this.state.CivilStateInstance.methods.addDonneesParents(_login, _nomFamilleMere, _prenomMere, _nomFamillePere, _prenomPere)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })
    
            alert('Naissance');
          } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            } 
    
    }

    // Back
    getInfosCitoyen = async () => {
        // Donnees identification citoyen
        const responseInfoIdentificationCitoyen = await this.state.CivilStateInstance.methods.getInfoIdentificationCitoyen(this.state.login).call({from : this.state.account});
        const _sexe =  responseInfoIdentificationCitoyen[0];
        const _nomFamille = responseInfoIdentificationCitoyen[1];
        const _nomUsage = responseInfoIdentificationCitoyen[2];
        const _premierPrenom = responseInfoIdentificationCitoyen[3];
        const _autresPrenoms = responseInfoIdentificationCitoyen[4];
        const _etatCivil = responseInfoIdentificationCitoyen[5];
        this.setState({sexe : _sexe, nomFamille : _nomFamille, nomUsage : _nomUsage, premierPrenom : _premierPrenom, autresPrenoms : _autresPrenoms, etatCivil : _etatCivil});

        // Donnees naissance citoyen
        const responseInfoNaissanceCitoyen = await this.state.CivilStateInstance.methods.getInfoNaissanceCitoyen(this.state.login).call({from : this.state.account});
        const _dateNaissance = responseInfoNaissanceCitoyen[0];
        const _communeNaissance = responseInfoNaissanceCitoyen[1];
        const _departementNaissance = responseInfoNaissanceCitoyen[2];
        this.setState({dateNaissance : _dateNaissance, communeNaissance : _communeNaissance, departementNaissance : _departementNaissance});

        // Donnees parents citoyen
        const responseInfoParentsCitoyen = await this.state.CivilStateInstance.methods.getInfoParentsCitoyen(this.state.login).call({from : this.state.account});
        const _nomFamilleMere = responseInfoParentsCitoyen[0];
        const _prenomMere = responseInfoParentsCitoyen[1];
        const _nomFamillePere = responseInfoParentsCitoyen[2];
        const _prenomPere = responseInfoParentsCitoyen[3];
        this.setState({nomFamilleMere : _nomFamilleMere, prenomMere : _prenomMere, nomFamillePere : _nomFamillePere, prenomPere : _prenomPere});
        
        // Alimentation de la liste "infosCitoyen" pour appel de "getPerson" et affichage
        const _infosCitoyen = [this.state.sexe, this.state.nomFamille, this.state.nomUsage, this.state.premierPrenom, this.state.autresPrenoms, this.state.etatCivil, 
                        this.state.dateNaissance, this.state.communeNaissance, this.state.departementNaissance,
                        this.state.nomFamilleMere, this.state.prenomMere, this.state.nomFamillePere, this.state.prenomPere];
        this.setState({infosCitoyen : _infosCitoyen});

    }
    // Back

    // Back
    componentDidMount = async () => {
        //const { aboutConnexion } = { location };
        
        //const { aboutConnexion } = this.props.location.state;
        // location.state
        //console.log(aboutConnexion);
        //const { aboutConnexion } = this.props.location.aboutConnexion;
        //console.log(aboutConnexion);
        console.log(this.state);
        const connexion = "DupondPierre";
        this.setState({ login: connexion });

        // FOR REFRESHING PAGE ONLY ONCE -
        if(!window.location.hash){
          window.location = window.location + '#loaded';
          window.location.reload();
        }
    
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = CivilStateContract.networks[networkId];
          const instance = new web3.eth.Contract(
              CivilStateContract.abi, 
              deployedNetwork && deployedNetwork.address,
          );

          // account[0] = default account used by metamask
          this.setState({ CivilStateInstance: instance, web3: web3, account: accounts[0] });
        
          // testing only
          // Création du citoyen
          this.addCitoyen();
        
          // Récupérations des informations du citoyen
          this.getInfosCitoyen();          
          
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };
    // Back

    toggle() {
        this.setState((prevState) => ({
            ready: false
        }), () => {     // THIS IS THE HACK
            setTimeout(() => {
                this.setState({ ready: true });
            }, 1);
        });
    }

    render() {
        const { ready } = this.state;

        if (!this.state.web3) {      
            return (
              <div className="HomePageCitoyen">
                  <div className="HomePageCitoyen-title">
                    <h1>
                      Loading Web3, accounts, and contract...
                    </h1>
                  </div>                  
              </div>
            );
        }        

        

        return (
            <Container className="body-container">
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
                                        
                                        {ready && (
                                            <PDFDownloadLink document={ActeDeNaissance()} fileName="ActeDeNaissance.pdf" className="btn-download-file">
                                                {
                                                    ({ blob, url, loading, error }) => (loading ? 'Loading Générer mon acte de naissance...' :
                                                        <Button type="button" className="btn-round ml-1 btn-download-file" color="info" onClick={() => (this.setState({ ready: false }))}>
                                                            <i class="fa fa-download mr-1"></i>
                                                            Télécharger mon acte de naissance
                                                        </Button>
                                                    )
                                                }
                                            </PDFDownloadLink>
                                        )}

                                        
                                        {!ready && (
                                            <Button type="button" className="btn-round ml-1 btn-download-file" color="info" 
                                                onClick={() => this.toggle()}>
                                                <i class="fa fa-download mr-1"></i>    
                                                Générer mon acte de naissance
                                            </Button>
                                        )}                                                                         

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