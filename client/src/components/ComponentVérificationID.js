import React, { Component } from 'react';
import {
    Button,
    FormGroup,
    Input,
    Form,
  } from "reactstrap";
import checkHash from 'services/checkHash';
import getPerson from 'services/getPerson';
import ErrorMessage from './ErrorMessage';
import InfoPersonne from './InfoPersonne';

// Back 
import CivilStateContract from "../contracts/CivilState.json";
import getWeb3 from "../getWeb3";
import { provider } from "../variables";


class ComponentVérificationID extends Component {
    state = {
        hashSent: false,
        hashIsOk: false,
        stateComponent: "init", 
        /**
         * hashSent | hashIsOk | stateComponent
         *  false   |   false  | "init"
         *  false   |   true   | ----
         *  true    |   false  | "HaskKO"
         *  true    |   true   | "HashOK"
         */
        fieldValue:"", //Valeur tapée dans le champs input, mise à jour on change
        sentHash:"", //Valeur envoyée dans au back (hash complet), mise à jour on submit
        userData : "", //Données utilisateur retournées. TODO : format à définir
        CivilStateInstance: undefined,
        account: null,
        web3: null,
        login: '',
        infosCitoyen: [],
        hashFieldHasChanged:false,
      }

    constructor(props) {
        super(props)
        
        this.updateState = this.updateState.bind(this);
        this.setState = this.setState.bind(this);
    }

    test(){
        console.log('=== Test ===');
    }

    checkHash(hash){
        //TODO : Définir le format du return 
        console.log("=== checkHash ===")
        let hashVerified;
        let _infosCitoyen = []
        let login = ""

        this.verifyHash().then(
            (result) => {
                console.log("** verifyHash done, promesse tenue : " + result + " **")
                //this.updateState()
                if (result){
                    _infosCitoyen = localStorage.getItem('infoCitoyenLocal');
                    login = localStorage.getItem('LoginLocal');
                    this.setState({hashIsOk: true, hashSent:true}, function () {console.log("** hashIsOk = true **"); this.updateState()})
                } else {
        
                    this.setState({hashIsOk: false, hashSent:true}, function () {console.log("** hashIsOk = false **");; this.updateState()})
                }
            }
        )

        /*if (hashVerified){
            _infosCitoyen = localStorage.getItem('infoCitoyenLocal');
            login = localStorage.getItem('LoginLocal');
            this.setState({hashIsOk: true}, function () {console.log("** hashIsOk = true **");})
        } else {

            this.setState({hashIsOk: false}, function () {console.log("** hashIsOk = false **");})
        }*/
        

        /*console.log("checkHash : local login")
        console.log(login)
        console.log("checkHash : local citoyen")
        console.log(_infosCitoyen)*/

        //const boolLogin = login.isEmpty();
        //console.log(boolLogin);

        /*if (login === '') {
            hashVerified = false;
        } else {
            hashVerified = true;
            _infosCitoyen = localStorage.getItem('infoCitoyenLocal');
            login = localStorage.getItem('LoginLocal');
        }


        if (hashVerified) {
            this.setState({hashIsOk: true})
            
        } else {
            this.setState({hashIsOk: false})
        }*/
        //Passage à true de l'état hashSent pour signifier que le hash a été envoyé à la BC
        //Appel de la fonction de mise à jour de updateState pour ajuster stateComponent en fonction
        //console.log(this.state.hashIsOk)
        //this.setState({hashSent: true}, function() {this.updateState()})
    }

    updateState(){
        console.log("=== updateSate ===")      

        if (this.state.hashSent) {
            if (this.state.hashIsOk) {
                this.setState(() => ({stateComponent:"HashOK"}))
            } else {
                this.setState(() => ({stateComponent:"HashKO"}))
            }
        }
        console.log(this.state);
    }
    
    handleSubmit(e){
        e.preventDefault()
        console.log("=== handleSubmit ===")

        if(this.state.hashFieldHasChanged===false && this.props.defaultHash!=="loaded"){
            this.setState({fieldValue: this.props.defaultHash}, function(){console.log(this.state.fieldValue);})
        }

        if (this.state.fieldValue){
            //Recopie dans sentHash la valeur de fieldValue (qui est mise à jour on change) 
            //Lorsque c'est fait, appel de la fonction de check du hash contenu dans sentHash dans la BC
            this.setState({sentHash: this.state.fieldValue}, function() {this.checkHash(this.state.sentHash)})
            //this.setState({sentHash: this.state.fieldValue})
        }
        //this.verifyHash();     
    }

    handleInputChange(e){
        console.log("=== handleInputChange ===")
        this.setState({fieldValue: e.target.value})
        this.setState({hashFieldHasChanged:true})
    }

    defineInputValue(){

        if(this.state.hashFieldHasChanged){
            //return e.target.value
        } else {
            if (this.props.defaultHash!=="loaded"){
                return this.props.defaultHash
            }
        }
    }

    handleClick(e){
        console.log("=== handleClick ===")
        this.setState({hashSent:false, hashIsOk:false, stateComponent:"init"})
    }

    // Back 
    getPerson(e){ 
       return getPerson(e);
    }

    async verifyHash (){
        console.log("=== verifyHash ===");
        try {
            // Récupération du hash pour affichage
            console.log("-- verifyHash => Try");
            const responseLogin = await this.state.CivilStateInstance.methods.verifyCertification(this.state.sentHash).call({from : this.state.account});
            localStorage.setItem('LoginLocal', responseLogin);
            this.setState({login: responseLogin});
            console.log(responseLogin);

            // Donnees identification citoyen
            const responseInfoIdentificationCitoyen = await this.state.CivilStateInstance.methods.getInfoIdentificationCitoyen(responseLogin).call({from : this.state.account});
            const _sexe =  responseInfoIdentificationCitoyen[0];
            const _nomFamille = responseInfoIdentificationCitoyen[1];
            const _nomUsage = responseInfoIdentificationCitoyen[2];
            const _premierPrenom = responseInfoIdentificationCitoyen[3];
            const _autresPrenoms = responseInfoIdentificationCitoyen[4];
            const _etatCivil = responseInfoIdentificationCitoyen[5];
            this.setState({sexe : _sexe, nomFamille : _nomFamille, nomUsage : _nomUsage, premierPrenom : _premierPrenom, autresPrenoms : _autresPrenoms, etatCivil : _etatCivil});

            // Donnees naissance citoyen
            const responseInfoNaissanceCitoyen = await this.state.CivilStateInstance.methods.getInfoNaissanceCitoyen(responseLogin).call({from : this.state.account});
            const _dateNaissance = responseInfoNaissanceCitoyen[0];
            const _communeNaissance = responseInfoNaissanceCitoyen[1];
            const _departementNaissance = responseInfoNaissanceCitoyen[2];
            this.setState({dateNaissance : _dateNaissance, communeNaissance : _communeNaissance, departementNaissance : _departementNaissance});

            // Donnees parents citoyen
            const responseInfoParentsCitoyen = await this.state.CivilStateInstance.methods.getInfoParentsCitoyen(responseLogin).call({from : this.state.account});
            const _nomFamilleMere = responseInfoParentsCitoyen[0];
            const _prenomMere = responseInfoParentsCitoyen[1];
            const _nomFamillePere = responseInfoParentsCitoyen[2];
            const _prenomPere = responseInfoParentsCitoyen[3];
            this.setState({nomFamilleMere : _nomFamilleMere, prenomMere : _prenomMere, nomFamillePere : _nomFamillePere, prenomPere : _prenomPere});
            
            // Alimentation de la liste "infosCitoyen" pour appel de "getPerson" et affichage
            const _infosCitoyen = [_sexe, _nomFamille, _nomUsage, _premierPrenom, _autresPrenoms, _etatCivil, 
                            _dateNaissance, _communeNaissance, _departementNaissance,
                            _nomFamilleMere, _prenomMere, _nomFamillePere, _prenomPere];
            
            this.setState({infosCitoyen : _infosCitoyen});     
            localStorage.setItem('infoCitoyenLocal', _infosCitoyen);
            
            if (responseLogin){
                return (true)
            } else {
                return(false)
            }
           
            
        } catch (error) {
        console.log("-- verifyHash => Catch");
          this.setState({hashIsOk: false})
          this.setState({hashSent: true}, function() {this.updateState()})
          //alert(`Impossible de vérifier ce hash`,);
          console.error(error);
          return (false)
        }
    }    

    // Back
    componentDidMount = async () => {
      
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
 
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };
    // Back


    render() {

        return (
            <div style={{width:"100%"}}>
                <Form style={{marginBottom:"70px"}} onSubmit={e=> {this.handleSubmit(e)}}>
                    <FormGroup className="container-input-hash">
                        <Input className="element-input-hash" placeholder="Hash" value={this.defineInputValue()} type="text" onChange={e=> {this.handleInputChange(e)}}/>
                        <Button className="element-input-hash" color="info" type="submit" onClickVerifier={()=>{this.handleClickVerifier()}}>
                            Vérifier
                        </Button>
                        {this.state.stateComponent!=="init" &&
                        <Button onClick={(e)=>{this.handleClick(e)}} type="button" className="btn-link ml-5 element-input-hash" color="info">
                            Nouvelle recherche
                        </Button>}
                    </FormGroup>
                </Form>
                {this.state.stateComponent==="HashOK" &&
                <InfoPersonne data={this.getPerson(this.state.infosCitoyen)}></InfoPersonne>}
                {this.state.stateComponent==="HashKO" &&
                    <div style={{margin:"60px"}}>
                    <ErrorMessage 
                        message="Le hash que vous avez saisi  ne correspond à aucune identité validée."
                        sousMessage="Assurez-vous de l'avoir saisi correctement.">
                    </ErrorMessage>
                    </div>
                }
            </div>
         );
    }
}
 
export default ComponentVérificationID;