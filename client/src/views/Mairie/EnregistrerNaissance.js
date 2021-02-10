import React, { Component } from 'react';
import InputDynamique from "components/InputDynamique"
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Input,
    FormGroup,
    Label,
  } from "reactstrap";

class EnregistrerNaissance extends Component {
    constructor(props){
        super(props);

        const fieldsValues = new Map();
        fieldsValues.set("Sexe","")
        fieldsValues.set("Nom de famille","")
        fieldsValues.set("Nom d'usage","")
        fieldsValues.set("Premier prénom","")
        fieldsValues.set("Autres prénoms","")
        fieldsValues.set("Etat civil","")
        fieldsValues.set("Date de naissance","")
        fieldsValues.set("Commune de naissance","")
        fieldsValues.set("Département de naissance","")
        fieldsValues.set("Nom de famille de la mère","")
        fieldsValues.set("Prénom de la mère","")
        fieldsValues.set("Nom de famille du père","")
        fieldsValues.set("Prenom du père","")
        
        const fieldsStates = new Map();
        fieldsStates.set("Sexe", "valid")
        fieldsStates.set("Nom de famille","valid")
        fieldsStates.set("Nom d'usage","valid")
        fieldsStates.set("Premier prénom","valid")
        fieldsStates.set("Autres prénoms","valid")
        fieldsStates.set("Etat civil","valid")
        fieldsStates.set("Date de naissance","valid")
        fieldsStates.set("Commune de naissance","valid")
        fieldsStates.set("Département de naissance","valid")
        fieldsStates.set("Nom de famille de la mère","valid")
        fieldsStates.set("Prénom de la mère","valid")
        fieldsStates.set("Nom de famille du père","valid")
        fieldsStates.set("Prenom du père","valid")

        this.state = {
            fieldsStates: fieldsStates,
            fieldsValues: fieldsValues
        }
     }

     handleChange(field, e){         
        let fieldsValues = this.state.fieldsValues
        fieldsValues.set(field,e.target.value)
        this.setState({fieldsValues});
    }

    handleSubmit(e){
        let fieldsStates = this.state.fieldsStates
        let fieldsValues = this.state.fieldsValues
        e.preventDefault()
        for (const element of fieldsStates){
            switch (element[0]) {
                case 'Sexe':
                    if (!fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }
                break
                case 'Nom de famille':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case "Nom d'usage":
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Premier prénom':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Autres prénoms':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Etat civil':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Date de naissance':
                    const date = new Date('2021-02-09')
                    const aujourdhui = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+(date.getDate()+1)).slice(-2)
                    if (!this.state.fieldsValues.get(element[0]) || this.state.fieldsValues.get(element[0])>aujourdhui){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Commune de naissance':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Département de naissance':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Nom de famille de la mère':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Prénom de la mère':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Nom de famille du père':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
                case 'Prenom du père':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                    }else{
                        fieldsStates.set(element[0],"valid")
                    }
                break
            }
        }     
        this.setState({fieldsStates:fieldsStates})
    }

    render() { 
        return ( 
            <Container>
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <img style={{width:"80px"}} alt="..." src={require("assets/img/IconesAccueils/Ajouter.png")}/>
                        <h1 className="ml-4" style={{color:"gray"}}>Enregistrer une naissance</h1>
                    </div>
                </Row>
                <div style={{height:"80px"}}></div>
                <Col className="text-left col-sm-12 col-md-6 offset-md-3">
                    <Form onSubmit={e=> {this.handleSubmit(e)}}>
                        <Row>
                            <h2 style={{color:"gray"}}>Données d’identification</h2>
                        </Row>
                        <FormGroup className={this.state.fieldsStates.get("Sexe")==="notValid" && "has-danger"}>
                            <Label for="oui">Sexe</Label>
                            <Input onChange={this.handleChange.bind(this, "Sexe")} type="text" placeholder="Sexe"                         />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Nom de famille")==="notValid" && "has-danger"}>
                            <Label>Nom de famille</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom de famille")} type="text" placeholder="Nom de famille" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Nom d'usage")==="notValid" && "has-danger"}>
                            <Label>Nom d'usage</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom d'usage")} type="text" placeholder="Nom d'usage" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Premier prénom")==="notValid" && "has-danger"}>
                            <Label>Premier prénom</Label>
                            <Input onChange={this.handleChange.bind(this, "Premier prénom")} type="text" placeholder="Premier prénom" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Autres prénoms")==="notValid" && "has-danger"}>
                            <Label>Autres prénoms</Label>
                            <Input onChange={this.handleChange.bind(this, "Autres prénoms")} type="text" placeholder="Autres prénoms" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Etat civil")==="notValid" && "has-danger"}>
                            <Label>Etat civil</Label>
                            <Input onChange={this.handleChange.bind(this, "Etat civil")} type="text" placeholder="Etat civil" />
                        </FormGroup>
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Données de naissance</h2>
                        </Row>
                        <FormGroup className={this.state.fieldsStates.get("Date de naissance")==="notValid" && "has-danger"}>
                            <Label>Date de naissance</Label>
                            <Input onChange={this.handleChange.bind(this, "Date de naissance")} type="date" placeholder="Date de naissance" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Commune de naissance")==="notValid" && "has-danger"}>
                            <Label>Commune de naissance</Label>
                            <Input onChange={this.handleChange.bind(this, "Commune de naissance")} type="text" placeholder="Commune de naissance" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Département de naissance")==="notValid" && "has-danger"}>
                            <Label>Département de naissance</Label>
                            <Input onChange={this.handleChange.bind(this, "Département de naissance")} type="text" placeholder="Département de naissance" />
                        </FormGroup>
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Parents</h2>
                        </Row>
                        <FormGroup className={this.state.fieldsStates.get("Nom de famille de la mère")==="notValid" && "has-danger"}>
                            <Label>Nom de famille de la mère</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom de famille de la mère")} type="text" placeholder="Nom de famille de la mère" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Prénom de la mère")==="notValid" && "has-danger"}>
                            <Label>Prénom de la mère</Label>
                            <Input onChange={this.handleChange.bind(this, "Prénom de la mère")} type="text" placeholder="Prénom de la mère" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Nom de famille du père")==="notValid" && "has-danger"}>
                            <Label>Nom de famille du père</Label>
                            <Input onChange={this.handleChange.bind(this, "Nom de famille du père")} type="text" placeholder="Nom de famille du père" />
                        </FormGroup>
                        <FormGroup className={this.state.fieldsStates.get("Prenom du père")==="notValid" && "has-danger"}>
                            <Label>Prénom du père</Label>
                            <Input onChange={this.handleChange.bind(this, "Prenom du père")} type="text" placeholder="Prénom du père" />
                        </FormGroup>
                        <Button className="btn-round btn ml-8 btn-info" color="info">Enregistrer</Button>
                    </Form>
                </Col>

            </Container>
         );
    }
}
 
export default EnregistrerNaissance;