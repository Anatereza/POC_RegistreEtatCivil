import React, { Component } from 'react';
import InfoPersonne from "components/InfoPersonne"
import ActeDeNaissance from "components/GeneratePDF"
import { PDFDownloadLink } from '@react-pdf/renderer'
import logoHomeCitoyen from 'assets/img/icon_homepage_citizen.jpg'
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    Button,
    Container,
    Row,
    Col,
  } from "reactstrap";
import GenerateQRCode from 'components/GenerateQRCode';
import getPerson from 'services/getPerson';
  
// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";
import { provider } from "../variables";

// test
const Person =[
    "Salvador", //0
    "20/01/1962", //1
    "Philipe", //2
    "Claude, Michel", //3
    "DURAND", //4
    "Masculin", //5
    "0289 0382", //6
];

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
        personnePDF: [],
        hash: '',
        ready : false
    }    
    
    constructor(props) {
        console.log("=== Homepage Citoyen ===")
        super(props)

        if(!window.location.hash){
            const login = this.props.location.state;
            localStorage.setItem('LoginLocal', login);
        }
        


    }

    // Back 
    getPerson(e){ 
        return getPerson(e);
    }

    // Back

    // Back
    getInfosCitoyen = async () => {
        // Donnees identification citoyen
        
        // Récupérer l'ID à partir du login
        const _id = await this.state.CivilStateInstance.methods.getIdFromLogin(this.state.login).call({from : this.state.account});
        
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
                        this.state.nomFamilleMere, this.state.prenomMere, this.state.nomFamillePere, this.state.prenomPere, _id];
        this.setState({infosCitoyen : _infosCitoyen});
        
        // Récupération du hash pour affichage
        const responseHash = await this.state.CivilStateInstance.methods.getHash(this.state.login).call({from : this.state.account});
        this.setState({hash : responseHash});

        const person = [
            this.state.communeNaissance, 
            this.state.dateNaissance, 
            this.state.premierPrenom, 
            this.state.autresPrenoms,
            this.state.nomFamille,
            this.state.sexe,
            "0289 0382"
        ]
        this.setState({personnePDF : person});

    }
    // Back

    // Back
    componentDidMount = async () => {

        const _login = localStorage.getItem('LoginLocal');
        console.log("login did mount")
        console.log(_login)
        this.setState({ login: _login});
        
        // FOR REFRESHING PAGE ONLY ONCE -
        if(!window.location.hash){
          window.location = window.location + '#loaded';
          window.location.reload();
        }
    
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();

          // Set provider for signature
          web3.setProvider(provider);
              
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
                <Container className="body-container">
                    <Row style={{paddingTop:"50px"}}>
                        <Col className="offset-md-2 text-center">
                            <CircularProgress />
                            <div>Chargement des données</div>
                        </Col>
                    </Row>
                </Container>
            );
        }        

        return (
            <Container className="body-container">

                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <img style={{width:"80px"}} alt="..." src={logoHomeCitoyen}/>
                        <h1 className="ml-4" style={{color:"gray"}}>MES INFORMATIONS PERSONNELLES</h1>
                    </div>
                </Row>

                <Row style={{paddingTop:"100px"}}>
                    <Col style={{paddingLeft: "60px"}, {textAlign:"center"}} md={{ size: 9, offset: 0 }}>
                        <InfoPersonne data={this.getPerson(this.state.infosCitoyen)}></InfoPersonne>
                        <Row style={{paddingTop:"50px"}} className="text-left">
                            <Col className="col-sm-4">
                                <h4>Mon code QR</h4>
                            </Col>
                            <Col className="col-6">
                                <img alt="..." src={GenerateQRCode(this.state.hash)}/>
                            </Col>
                        </Row>
                        <Row style={{paddingTop:"20px"}} className="text-left">
                            <Col className="col-sm-4">
                                <h4>Ma clé de sécurité</h4>
                            </Col>
                            <Col className="col-sm-3">
                                <div style={{wordWrap:"break-word"}}>{this.state.hash}</div>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col>
                        <Row style={{display:"flex"}, {flexDirection:"column"}, {justifyContent:"center"}}>
                            <h2 className="ct-orange" style={{textAlign:"left"}}>GENERER MES DOCUMENTS</h2>
                            <div style={{marginTop: "30px"}, {marginBottom: "30px"}} id="buttons">
                                        
                                        {ready && (
                                            <PDFDownloadLink document={ActeDeNaissance(this.state.personnePDF)} fileName="ActeDeNaissance.pdf" className="btn-download-file">
                                                {
                                                    ({ blob, url, loading, error }) => (loading ? 'Loading Générer mon acte de naissance...' :
                                                        <Button type="button" className="btn-round ml-1 btn-download-file" color="info" style={{fontWeight:"bold", textTransform: 'none'}}
                                                            onClick={() => (this.setState({ ready: false }))}>
                                                            <i class="fa fa-download mr-1"></i>
                                                            Télécharger mon acte de naissance
                                                        </Button>
                                                    )
                                                }
                                            </PDFDownloadLink>
                                        )}

                                        
                                        {!ready && (
                                            <Button type="button" className="btn-round ml-1 btn-download-file" color="info" 
                                                style={{fontWeight:"bold", textTransform: 'none'}}
                                                onClick={() => this.toggle()}>
                                                <i class="fa fa-download mr-1"></i>    
                                                Générer mon acte de naissance
                                            </Button>
                                        )}                                                                         

                                <Button type="button" className="btn-round ml-1 btn-download-file" color="info" style={{fontWeight:"bold", textTransform: 'none'}}>
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
                            <h6 className="ct-bleu bold ligne-menu-titre" style={{paddingTop:"30px"}}>Etats Civils</h6>
                            <div className="ct-bleu ligne-menu">Changement d'état civil</div>
                            <div className="ct-bleu ligne-menu">Livret de famille</div>
                            <div className="ct-bleu ligne-menu flex-container-left-center" style={{fontWeight:"bold"}}>
                                <i class="fa fa-angle-right bold"></i>
                                Actes d’états civils
                            </div>
                            <h6 className="ct-rouge bold ligne-menu-titre" style={{paddingTop:"30px"}}>Elections</h6>
                            <div className="ct-rouge ligne-menu">S’inscrire sur les listes électorales</div>
                            <div className="ct-rouge ligne-menu">Déclarer un changement de circonscription</div>
                            <h6 className="ct-vert bold ligne-menu-titre" style={{paddingTop:"30px"}}>Papiers</h6>
                            <div className="ligne-menu ct-vert">Faire une demande de passeport</div>
                            <div className="ligne-menu ct-vert">Faire une demande de titre d’identité</div>
                            <h6 className="ct-jaune bold ligne-menu-titre" style={{paddingTop:"30px"}}>Famille</h6>
                            <div className="ligne-menu ct-jaune">Déclarer un décès</div>
                            <div className="ligne-menu ct-jaune">Faire une demande de divorce</div>
                            {/* <Accordion style={{width:"100px"}} expanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <h6 className="ct-bleu bold">Etats Civils</h6>
                                </AccordionSummary>
                                <AccordionDetails style={{display:"flex"}, {direction:"row"}}>
                                    <div className="ligne-menu">Changement d'état civil</div>
                                    <div className="ligne-menu">Livret de famille</div>
                                    <div className="ligne-menu">Actes d’états civils</div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion style={{width:"100%"}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                    <h6 className="ct-rouge bold ">Elections</h6>
                                </AccordionSummary>
                                <AccordionDetails >   
                                    <div style={{width:"100%"}}>test</div>
                                    <div style={{width:"100%"}}>test</div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion style={{width:"100%"}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                >
                                    <h6 className="ct-vert bold ">Papiers</h6>
                                </AccordionSummary>
                            </Accordion>
                            <Accordion style={{width:"100%"}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                >
                                    <h6 className="ct-jaune bold ">Famille</h6>
                                </AccordionSummary>
                            </Accordion> */}
                        </Row>
                    </Col>
                </Row>
            </Container>
          );
    }
}
 
export default HomepageCitoyen;