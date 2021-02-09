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
      }

    constructor(props) {
        super(props)
    }

    checkHash(hash){
        //TODO : Définir le format du return 
        console.log("=== checkHash ===")
        const hashVerified = checkHash(hash)
        
        if (hashVerified) {
            this.setState({hashIsOk: true})
            this.setState({userData: getPerson()})
        } else {
            this.setState({hashIsOk: false})
        }
        //Passage à true de l'état hashSent pour signifier que le hash a été envoyé à la BC
        //Appel de la fonction de mise à jour de updateState pour ajuster stateComponent en fonction
        //console.log(this.state.hashIsOk)
        this.setState({hashSent: true}, function() {this.updateState()})
    }

    updateState(){
        console.log("=== updateSate ===")      
        console.log("hashIsOK :")
        console.log(this.state.hashIsOk)
        if (this.state.hashSent) {
            if (this.state.hashIsOk) {
                console.log("HashOK")
                this.setState(() => ({stateComponent:"HashOK"}))
            } else {
                console.log("HashKO")
                this.setState(() => ({stateComponent:"HashKO"}))
            }
        }
    }
    
    handleSubmit(e){
        e.preventDefault()
        console.log("=== handleSubmit ===")
        if (this.state.fieldValue){
            //Recopie dans sentHash la valeur de fieldValue (qui est mise à jour on change) 
            //Lorsque c'est fait, appel de la fonction de check du hash contenu dans sentHash dans la BC
            this.setState({sentHash: this.state.fieldValue}, function() {this.checkHash(this.state.sentHash)})
        }
        
    }

    handleInputChange(e){
        console.log("=== handleInputChange ===")
        this.setState({fieldValue: e.target.value})
    }

    handleClick(e){
        console.log("=== handleClick ===")
        this.setState({hashSent:false, hashIsOk:false, stateComponent:"init"})
    }

    render() { 
        return (
            <div style={{width:"100%"}}>
                <Form style={{marginBottom:"70px"}} onSubmit={e=> {this.handleSubmit(e)}}>
                    <FormGroup className="container-input-hash">
                        <Input className="element-input-hash" placeholder="Hash" type="text" onChange={e=> {this.handleInputChange(e)}}/>
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
                <InfoPersonne data={this.state.userData}></InfoPersonne>}
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