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

// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";

const TITLE = 'Fiche personne'


class FichePersonne extends Component {
    
   
    constructor(props) {
        console.log("=== FichePersonne ===")
        super(props)
        
        if(!window.location.hash){
            /*const PROPS = this.props;
            console.log(PROPS);
            const LOCATION = PROPS.location;
            console.log(LOCATION);
            const STATE = LOCATION.state;
            console.log(STATE);
            //const ID = STATE.ID;*/
            const ID = this.props.location.state.ID;
            console.log(ID)
            console.log("ID");
            localStorage.setItem('IDLocal', ID);
            const _ID = localStorage.getItem('IDLocal');
            console.log("ID après localStorage")
            console.log(_ID)

            const URL = this.props.location.state.URL;
            localStorage.setItem('URLLocal', URL);
            //window.location = window.location + '#loaded';
            //window.location.reload();
        }



        this.state = {
            ID : '',
            URL : '',
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
        }
        

    }

    
    getPerson(e){
        return getPerson(e)
    }

    handleClickBack(e){
        console.log("=== handleClickBack ===")

        // VOIR LES ELEMENTS DU STATE NECESSAIRES
        console.log("URL state")
        console.log(this.state.URL)
        this.props.history.push({
            pathname:this.state.URL,
            state : 
             { URL : this.state.URL }
        })
    }

    handleClickMariage(){
        console.log("=== handleClickMariage ===")
        if (this.state.wkfState <3){
            this.setState(prevState => {return {wkfState: prevState.wkfState + 1}}, function(){console.log("**setState wkfState OK**")} )
        }
        
        this.setState({retourFichePersonne:"conjointOK"}, function(){
            this.props.history.push({
                pathname:this.state.URL,
                state : this.state
            })
        })
    }

    handleClickValiderIdentite = async () => {

        try {  
            await this.state.CivilStateInstance.methods.verifyIdentite(this.state.login)
                  .send({
                      from : this.state.account,
                      gas: 1000000
                  })
                  
            alert('Identité validée');
          } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
         }
         
         console.log(this.state.URL)
         this.props.history.push({
             pathname:this.state.URL,
             state : 
              { URL : this.state.URL }
         })
    }

    // Back
    getInfosCitoyen = async () => {
        // Récupérer le login avec l'ID
        const responseLogin = await this.state.CivilStateInstance.methods.getLoginFromId(this.state.ID).call({from : this.state.account});
        console.log("responseLogin")
        console.log(responseLogin)
        const _login = responseLogin;
        this.setState({ login: _login });
        console.log("APRES PREMIER APPEL")
        console.log(this.state.ID)

        // Donnees identification citoyen
        const responseInfoIdentificationCitoyen = await this.state.CivilStateInstance.methods.getInfoIdentificationCitoyen(this.state.login).call({from : this.state.account});
        const _sexe =  responseInfoIdentificationCitoyen[0];
        const _nomFamille = responseInfoIdentificationCitoyen[1];
        const _nomUsage = responseInfoIdentificationCitoyen[2];
        const _premierPrenom = responseInfoIdentificationCitoyen[3];
        const _autresPrenoms = responseInfoIdentificationCitoyen[4];
        const _etatCivil = responseInfoIdentificationCitoyen[5];
        this.setState({sexe : _sexe, nomFamille : _nomFamille, nomUsage : _nomUsage, premierPrenom : _premierPrenom, autresPrenoms : _autresPrenoms, etatCivil : _etatCivil});
        console.log("local sexe")
        console.log(_sexe)
        console.log("state sexe")
        console.log(this.state.sexe)

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
        //const _ID = localStorage.getItem('IDLocal');
        //console.log("ID componentDidMount")
        const _URL = localStorage.getItem('URLLocal');
        const _ID = localStorage.getItem('IDLocal');
        console.log(_ID)
        this.setState({ ID: _ID, URL: _URL});

        
        // FOR REFRESHING PAGE ONLY ONCE -
        if(!window.location.hash){
          window.location = window.location + '#loaded';
          window.location.reload();
        }
    
        try {

          console.log("ID componentDidMount")

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
        
          // Récupérations des informations du citoyen
          this.getInfosCitoyen();          
          
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }

        console.log("STATE")
        console.log(this.state)
    };
    
    
    // Back
    
    render() {
        console.log(this.state)
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
                    {/*this.infosCitoyen*/} 
                    <InfoPersonne data={this.getPerson(this.state.infosCitoyen)}></InfoPersonne>
                </Row>

                <Row style={{paddingTop:"50px"}}>
                    <Col className="col-sm-auto offset-sm-7">
                        {this.state.URL==="valider-identite" && 
                            <Button onClick={() => this.handleClickValiderIdentite()} color="info">
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