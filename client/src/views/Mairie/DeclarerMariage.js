import * as React from 'react';
import  { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Helmet } from 'react-helmet';
import ErrorMessage from 'components/ErrorMessage';
import SimpleTable from 'components/SimpleTable'

import {
    Container,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Progress
  } from "reactstrap";


const TITLE = 'Mairie - Déclarer un mariage'

const columns = [
    { field: 'ID', headerName: <div style={{fontWeight:"bold"}}>Identifiant unique</div>, width: 170 },
    { field: 'nom', headerName: <div style={{fontWeight:"bold"}}>Nom</div>, width: 150 },
    { field: 'prenom', headerName: <div style={{fontWeight:"bold"}}>Prénom</div>, width: 150 },
    { field: 'sexe', headerName: <div style={{fontWeight:"bold"}}>Sexe</div>, width: 130,},
    { field: 'dateDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Date de naissance</div>, width: 200,},
    { field: 'communeDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Commune de naissance</div>, width: 250,},
  ];
  
const rows = [
      {id: 1, ID: "0x48e3f69b", nom: "Durand", prenom:"Michel", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 2, ID: "0x48e3f69b", nom: "Dupont", prenom:"Josie", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 3, ID: "0x48e3f69b", nom: "Durand", prenom:"Jacques", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 4, ID: "0x48e3f69b", nom: "Dupont", prenom:"Hervé", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 5, ID: "0x48e3f69b", nom: "Durand", prenom:"Mohammed", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 6, ID: "0x48e3f69b", nom: "Dupont", prenom:"Alfred", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 7, ID: "0x48e3f69b", nom: "Durand", prenom:"Frédéric", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 8, ID: "0x48e3f69b", nom: "Dupont", prenom:"Clémentine", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 9, ID: "0x48e3f69b", nom: "Durand", prenom:"Sofiane", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 10, ID: "0x48e3f69b", nom: "Dupont", prenom:"Justine", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 11, ID: "0x48e3f69b", nom: "Durand", prenom:"Charlotte", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 12, ID: "0x48e3f69b", nom: "Dupont", prenom:"Victoire", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 13, ID: "0x48e3f69b", nom: "Durand", prenom:"Avenall", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 14, ID: "0x48e3f69b", nom: "Dupont", prenom:"Gabriel", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 15, ID: "0x48e3f69b", nom: "Durand", prenom:"Olivier", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
      {id: 16, ID: "0x48e3f69b", nom: "Dupont", prenom:"Fabienne", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris"},
    ];

const tableHeight = 56+52+10+Object.keys(rows).length*52 

class DeclarerMariage extends Component {
    constructor(props){
        super(props);

        // Maps pour le formulaire détails du mariage
        const fieldsValues = new Map();
        fieldsValues.set("Date du mariage","")
        fieldsValues.set("Commune de mariage","")
        fieldsValues.set("Régime matrimonial","Communauté réduite aux acquêts")
        fieldsValues.set("Prénom témoin 1","")
        fieldsValues.set("Nom témoin 1","")
        fieldsValues.set("Prénom témoin 2","")
        fieldsValues.set("Nom témoin 2","")
        
        const fieldsStates = new Map();
        fieldsStates.set("Date du mariage","valid")
        fieldsStates.set("Commune de mariage","valid")
        fieldsStates.set("Régime matrimonial","valid")
        fieldsStates.set("Prénom du témoin 1","valid")
        fieldsStates.set("Nom du témoin 1","valid")
        fieldsStates.set("Prénom du témoin 2","valid")
        fieldsStates.set("Nom du témoin 2","valid")

        this.state = {
            nom:"",
            prenom:"",
            sexe:"",
            dateDeNaissance:"",
            communeDeNaissance:"",
            statut:"",
            URL:"declarer-mariage",
            wkfState:1,
            retourFichePersonne:"",
            premierConjoint:"",
            secondConjoint:"",
            activeTab:"1",
            fieldsStates: fieldsStates,
            fieldsValues: fieldsValues,
            IDSearch:"",
            IDSearchFieldValue:"",
            stateSearchComponent:"init",
        }

        console.log("=== constructeur ===")
        this.HandleClick = this.HandleClick.bind(this);
        this.HandleClickSuivant = this.HandleClickSuivant.bind(this);
        this.HandleSubmitMariage = this.HandleSubmitMariage.bind(this);
        //localStorage.setItem('wkfStateLocal',1)

        // SI on arrive d'une page qui renvoie des paramètres (seul cas : fiche personne)
        if(this.props.location.state){
            switch (this.props.location.state.source){
                case "clickBack" :
                    switch (localStorage.getItem('wkfStateLocal')){
                        case "1" :
                            console.log("cas wkf=1")
                            localStorage.setItem('premierConjoint', "")
                        break;
                        case "2" :                    
                            localStorage.setItem('secondConjoint', "")
                        break;
                    }    
                break;
                case "conjointOK" :            
                    if (props.history.action=="PUSH") {
                        localStorage.setItem('wkfStateLocal', (parseFloat(localStorage.getItem('wkfStateLocal'), 10)+1/2).toString())
                    }
                break;
                default:
            }
        } 
    }

    //Gestionnaire des changement de champs du formulaire pour les informations complémentaires sur le mariage
    HandleChange(field, e){         
        let fieldsValues = this.state.fieldsValues
        fieldsValues.set(field,e.target.value)
        this.setState({fieldsValues});
        console.log(this.state.fieldsValues);
    }

    //Gestionnaire du clic pour la validation des informations complémentaires sur le mariage
    HandleSubmitMariage(e){
        e.preventDefault()
        let fieldsStates = this.state.fieldsStates
        let fieldsValues = this.state.fieldsValues
        let formIsValid = true
        for (const element of fieldsStates){
            switch (element[0]) {
                case 'Commune de mariage':
                    if (!fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageCommune',fieldsValues.get(element[0]))
                    }
                break
                case 'Régime matrimonial':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageRégime',fieldsValues.get(element[0]))
                    }
                break
                case "Prénom du témoin 1":
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariagePrénomTémoin1',fieldsValues.get(element[0]))
                    }
                break
                case 'Nom du témoin 1':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageNomTémoin1',fieldsValues.get(element[0]))
                    }
                break
                case 'Prénom du témoin 2':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariagePrénomTémoin2',fieldsValues.get(element[0]))
                    }
                break
                case 'Nom du témoin 2':
                    if (!this.state.fieldsValues.get(element[0])){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageNomTémoin2',fieldsValues.get(element[0]))
                    }
                break
                case 'Date du mariage':
                    const date = new Date()
                    const aujourdhui = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+(date.getDate())).slice(-2)
                    if (!this.state.fieldsValues.get(element[0]) || this.state.fieldsValues.get(element[0])>aujourdhui){
                        fieldsStates.set(element[0],"notValid")
                        formIsValid = false
                    }else{
                        fieldsStates.set(element[0],"valid")
                        localStorage.setItem('mariageDate',fieldsValues.get(element[0]))
                    }
                break
                }
            }
        this.setState({fieldsStates:fieldsStates}, function(){console.log(this.state.fieldsStates)});
        
        console.log("formIsValid : " + formIsValid)
        //Réinitialisation du compteur workflow
        if (formIsValid){
            console.log(localStorage.getItem('mariageNomTémoin2'))
            localStorage.setItem('wkfStateLocal', (parseFloat(localStorage.getItem('wkfStateLocal'), 10)+1).toString())
            this.setState({wkfState:parseInt(localStorage.getItem('wkfStateLocal'),10)})
        }
    }

    HandleClickSuivant(){
        localStorage.setItem('wkfStateLocal', (parseFloat(localStorage.getItem('wkfStateLocal'), 10)+1).toString())
        this.setState({wkfState:parseInt(localStorage.getItem('wkfStateLocal'),10)})
    }

    HandleClickValidation(e){
        
        localStorage.setItem('wkfStateLocal', 5)
        this.setState({wkfState:parseInt(localStorage.getItem('wkfStateLocal'),10)})
        /*TODO : 
            - Valider le mariage dans la BC
            - Reset compteur wkf :  localStorage.setItem('wkfStateLocal', 1)
            - Retour page d'accueil*/
        localStorage.setItem('wkfStateLocal', 1)
    }

    HandleClick(e){
        console.log("=== HandleClick ===")

        const ID = e.row.ID
        const nom = e.row.nom;
        const prenom = e.row.prenom;
        const sexe = e.row.sexe;
        const dateDeNaissance = e.row.dateDeNaissance;
        const communeDeNaissance = e.row.communeDeNaissance;
        const personne = {
            nom:nom,
            prenom:prenom,
            sexe:sexe,
            dateDeNaissance:dateDeNaissance,
            communeDeNaissance:communeDeNaissance,
        }


        this.setState((prevState) => ({...prevState,["personne"] :personne}), function() {console.log(this.state.personne);});
        
        if (localStorage.getItem('wkfStateLocal')=='1'){
            localStorage.setItem('premierConjoint', personne)
            localStorage.setItem('ID1', ID)
            localStorage.setItem('nom1', nom)
            localStorage.setItem('prenom1', prenom)
            localStorage.setItem('sexe1', sexe)
            localStorage.setItem('dateDeNaissance1', dateDeNaissance)
            localStorage.setItem('communeDeNaissance1', communeDeNaissance)

        }
        if (localStorage.getItem('wkfStateLocal')=='2'){
            localStorage.setItem('secondConjoint', personne)
            localStorage.setItem('ID2', ID)
            localStorage.setItem('nom2', nom)
            localStorage.setItem('prenom2', prenom)
            localStorage.setItem('sexe2', sexe)
            localStorage.setItem('dateDeNaissance2', dateDeNaissance)
            localStorage.setItem('communeDeNaissance2', communeDeNaissance)
        }

        console.log(localStorage.getItem('nom1'));
        console.log(localStorage.getItem('dateDeNaissance1'));

        this.props.history.push({
            pathname:'fiche-personne',
            state: {
                ID : ID, 
                URL : this.state.URL,
              }
        });
    }  
    
    MakeTablePersons(){
        const result = [
            {name : "Identifiant", price : localStorage.getItem('ID1')},
            {name : "Nom de famille", price : localStorage.getItem('nom1')},
            {name : "Prénom", price : localStorage.getItem('prenom1')},
            {name : "Sexe", price : localStorage.getItem('sexe1')},
            {name : "Date de naissance", price : localStorage.getItem('dateDeNaissance1')},
            {name : "Commune de naissance", price : localStorage.getItem('communeDeNaissance1')},

            {name : "Identifiant", price : localStorage.getItem('ID2')},
            {name : "Prénom", price : localStorage.getItem('prenom2')},
            {name : "Sexe", price : localStorage.getItem('sexe2')},
            {name : "Date de naissance", price : localStorage.getItem('dateDeNaissance2')},
            {name : "Commune de naissance", price : localStorage.getItem('communeDeNaissance2')},
          ]

        return (result);
    }

    MakeTableMariage(){
        const result = [
            { name: "Date de mariage", price: localStorage.getItem('mariageDate')},
            { name: "Commune de mariage", price: localStorage.getItem("mariageCommune")},
            { name: "Régime matrimonial", price: localStorage.getItem("mariageRégime")},
            { name: "Prénom du premier témoin", price: localStorage.getItem("mariagePrénomTémoin1")},
            { name: "Nom du premier témoin", price: localStorage.getItem("mariageNomTémoin1")},
            { name: "Prénom du second témoin", price: localStorage.getItem("mariagePrénomTémoin2")},
            { name: "Nom du second témoin", price: localStorage.getItem("mariageNomTémoin2")},
          ]

        return (result);
    }
    
    HandleSubmitRecherche(e){
        e.preventDefault()
        if (this.state.IDSearchFieldValue){
            this.setState({IDSearch: this.state.fieldValue}, 
                function() {
                console.log(this.state.IDSearch); 
                this.setState({stateSearchComponent:"search"}, 
                    function() {
                    console.log(this.state.stateSearchComponent)})
                }
            )

        /*TODO : 
        - Implémenter la recherche sur la BC
        - Construire un objet du même format que 'rows' avec les données retournées
        - Faire un setState de cet objet 
        - Modifier le render() pour appeler ce nouvel état et plus l'objet 'rows'  
        */
        }
    }

    HandleIDInputChange(e){
        this.setState({IDSearchFieldValue:e.target.value}, function() {console.log(this.state.IDSearchFieldValue)})
    }

    HandleClickNvlleRecherche(e){
        this.setState({stateSearchComponent:"init"}, function(){console.log("stateSearchComponent" + this.state.stateSearchComponent)})
    }
    
    render() { 
        return (
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Container className="body-container">
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <img style={{width:"80px"}} alt="..." src={require("assets/img/IconesAccueils/Valider.png")}/>
                        <h1 className="ml-4" style={{color:"gray"}}>Déclarer un mariage</h1>
                    </div>
                </Row>
                <div style={{height:"80px"}}></div>
                <Row>
                    <Col className="col-6 col-sm-3">
                        <div 
                        className={localStorage.getItem('wkfStateLocal') > 1 ? "progress-active" : "progress-inactive" }
                        >
                        Premier conjoint
                        </div>
                    </Col>
                    <Col className="col-6 col-sm-3 ">
                        <div 
                        className={localStorage.getItem('wkfStateLocal') > 2 ? "progress-active" : "progress-inactive" }
                        >
                        Second conjoint
                        </div>
                    </Col>
                    <Col className="col-6 col-sm-3">
                        <div 
                        className={localStorage.getItem('wkfStateLocal') > 3 ? "progress-active" : "progress-inactive" }
                        >
                        Mariage
                        </div>
                    </Col>
                    <Col className="col-sm-3">
                        <div 
                        className={localStorage.getItem('wkfStateLocal') > 4 ? "progress-active" : "progress-inactive" }
                        >
                        Validation
                        </div>
                    </Col>

                </Row>
                <br/>
                <Progress
                    max="4"
                    value={Number(parseInt(localStorage.getItem('wkfStateLocal'),10)-1)}
                    barClassName="progress-bar-success"
                    style={{backgroundColor: "6bd098"}}
                />
                <br/>
                {localStorage.getItem('wkfStateLocal')==1 && 
                    <div>
                        <div style={{width:"70%"}}>
                            <Form style={{marginBottom:"30px"}} onSubmit={e=> {this.HandleSubmitRecherche(e)}}>
                                <FormGroup className="container-input-hash">
                                    <Input className="element-input-hash" placeholder="Identifiant" type="text" onChange={e=> {this.HandleIDInputChange(e)}}/>
                                    <Button className="element-input-hash" color="info" type="submit">
                                        Rechercher
                                    </Button>
                                    
                                    {this.state.stateSearchComponent=="search" &&
                                    <Button onClick={(e)=>{this.HandleClickNvlleRecherche(e)}} type="button" className="btn-link ml-5 element-input-hash" color="info">
                                        Nouvelle recherche
                                    </Button>
                                    }

                                </FormGroup>
                            </Form>
                        </div>
                        <div style={{ height: tableHeight, width: '100%' }}>
                            {Object.keys(rows).length !== 0 ? 
                            <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid> :
                            <ErrorMessage message="Il n'y a aucune identité à valider"></ErrorMessage>
                            }
                        </div>
                    </div>
                }
                {localStorage.getItem('wkfStateLocal')==2 && 
                <div style={{ height: tableHeight, width: '100%' }}>
                    {Object.keys(rows).length !== 0 ? 
                    <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid> :
                    <ErrorMessage message="Il n'y a aucune identité à valider"></ErrorMessage>
                    }
                </div>}
                
                {localStorage.getItem('wkfStateLocal')==3 &&
                    <div>
                        <Row style={{paddingTop:"30px"}}></Row>
                        <Row>
                            <Col className="col-4 ">
                                <Row className="recap-maries">
                                    <Col className="offset-sm-1">
                                        <Row style={{paddingTop:"30px"}}>
                                            <h2 style={{color:"gray"}}>Conjoint 1</h2>
                                        </Row>
                                        <Row>
                                            <div>Identifiant :  {localStorage.getItem('ID1')}</div>
                                        </Row>
                                        <Row>
                                            <div>{localStorage.getItem('prenom1')} {localStorage.getItem('nom1')}</div>
                                        </Row>
                                        <Row>  
                                            <div>Né le {localStorage.getItem('dateDeNaissance1')} à {localStorage.getItem('communeDeNaissance1')}</div>
                                        </Row>
                                        <Row style={{paddingTop:"30px"}}>
                                            <h2 style={{color:"gray"}}>Conjoint 2</h2>
                                        </Row>
                                        <Row>
                                            <div>Identifiant :  {localStorage.getItem('ID2')}</div>
                                        </Row>
                                        <Row>
                                            <div>{localStorage.getItem('prenom2')} {localStorage.getItem('nom2')}</div>
                                        </Row>
                                        <Row style={{paddingBottom:"30px"}}>  
                                            <div>Né le {localStorage.getItem('dateDeNaissance2')} à {localStorage.getItem('communeDeNaissance2')}</div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-7 offset-sm-1 text-left">
                                <Form>
                                    <Row>
                                        <h2 style={{color:"gray"}}>Mariage</h2>
                                    </Row>
                                    <FormGroup className={this.state.fieldsStates.get("Date du mariage")==="notValid" && "has-danger"}>
                                        <Label> Date du mariage</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Date du mariage")} placeHolder="Date du mariage" type="Date"></Input>
                                    </FormGroup>
                                    <FormGroup className={this.state.fieldsStates.get("Commune de mariage")==="notValid" && "has-danger"}>
                                        <Label>Commune de mariage</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Commune de mariage")} placeHolder="Commune de mariage" type="text"></Input>
                                    </FormGroup>
                                    <FormGroup className={this.state.fieldsStates.get("Régime matrimonial")==="notValid" && "has-danger"}>
                                        <Label>Régime matrimonial</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Régime matrimonial")} placeHolder="Régime matrimonial" type="select">
                                            <option>Communauté réduite aux acquêts</option>
                                            <option>Communauté universelle</option>
                                            <option>Séparation de biens</option>
                                            <option>Participation aux acquêts</option>
                                        </Input>
                                    </FormGroup>
                                    <Row style={{paddingTop:"30px"}}>
                                        <h2 style={{color:"gray"}}>Témoins</h2>
                                    </Row>
                                    <FormGroup className={this.state.fieldsStates.get("Nom du témoin 1")==="notValid" && "has-danger"}>
                                        <Label>Nom du témoin 1</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Nom du témoin 1")} placeHolder="Nom du témoin 1" type="text"></Input>
                                    </FormGroup>
                                    <FormGroup className={this.state.fieldsStates.get("Prénom du témoin 1")==="notValid" && "has-danger"}>
                                        <Label>Prénom du témoin 1</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Prénom du témoin 1")} placeHolder="Prénom du témoin 1" type="text"></Input>
                                    </FormGroup>
                                    <FormGroup className={this.state.fieldsStates.get("Nom du témoin 2")==="notValid" && "has-danger"}>
                                        <Label>Nom du témoin 2</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Nom du témoin 2")} placeHolder="Nom du témoin 2" type="text"></Input>
                                    </FormGroup>
                                    <FormGroup className={this.state.fieldsStates.get("Prénom du témoin 2")==="notValid" && "has-danger"}>
                                        <Label>Prénom du témoin 2</Label>
                                        <Input onChange={this.HandleChange.bind(this, "Prénom du témoin 2")} placeHolder="Prénom du témoin 2" type="text"></Input>
                                    </FormGroup>
                                    
                                    <Button onClick={this.HandleSubmitMariage} type="submit" color="info">
                                            Suivant
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                }
                {localStorage.getItem('wkfStateLocal')==4 &&
                <>
                <Row >
                    <Col className="offset-sm-2">
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Premier conjoint</h2>
                        </Row>
                        <Row style={{marginLeft:"30px"}}> 
                            <SimpleTable data={this.MakeTablePersons().slice(0,6)}/>
                        </Row>
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Second conjoint</h2>
                        </Row>
                        <Row style={{marginLeft:"30px"}}> 
                            <SimpleTable data={this.MakeTablePersons().slice(6,11)}/>
                        </Row>
                        <Row style={{paddingTop:"30px"}}>
                            <h2 style={{color:"gray"}}>Mariage</h2>
                        </Row>
                        <Row style={{marginLeft:"30px"}}> 
                            <SimpleTable data={this.MakeTableMariage().slice(0,7)}/>
                        </Row>
                        <Row style={{paddingTop:"30px"}}>
                            <Col className="offset-sm-5">
                                <Button color="info" onClick={(e)=>this.HandleClickValidation(e)}>Valider le mariage</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </>
                }
                
            </Container>
            </>
         );
    }
}
 
export default DeclarerMariage;

