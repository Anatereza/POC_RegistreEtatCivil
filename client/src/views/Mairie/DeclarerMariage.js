import * as React from 'react';
import  { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';


import {
    Container,
    Row,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Button,
    Col,
    Progress
  } from "reactstrap";
import ErrorMessage from 'components/ErrorMessage';

const TITLE = 'Mairie - Déclarer un mariage'

const columns = [
    { field: 'nom', headerName: <div style={{fontWeight:"bold"}}>Nom</div>, width: 160 },
    { field: 'prenom', headerName: <div style={{fontWeight:"bold"}}>Prénom</div>, width: 160 },
    { field: 'sexe', headerName: <div style={{fontWeight:"bold"}}>Sexe</div>, width: 130,},
    { field: 'dateDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Date de naissance</div>, width: 200,},
    { field: 'communeDeNaissance', headerName: <div style={{fontWeight:"bold"}}>Commune de naissance</div>, width: 250,},
    { field: 'statut', headerName: <div style={{fontWeight:"bold"}}>Statut</div>, width: 100,},
  ];
  
const rows = [
      {id: 1, nom: "Durand", prenom:"Michel", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 2, nom: "Dupont", prenom:"Josie", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 3, nom: "Durand", prenom:"Jacques", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 4, nom: "Dupont", prenom:"Hervé", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 5, nom: "Durand", prenom:"Mohammed", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 6, nom: "Dupont", prenom:"Alfred", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 7, nom: "Durand", prenom:"Frédéric", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 8, nom: "Dupont", prenom:"Clémentine", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 9, nom: "Durand", prenom:"Sofiane", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 10, nom: "Dupont", prenom:"Justine", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 11, nom: "Durand", prenom:"Charlotte", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 12, nom: "Dupont", prenom:"Victoire", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 13, nom: "Durand", prenom:"Avenall", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 14, nom: "Dupont", prenom:"Gabriel", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 15, nom: "Durand", prenom:"Olivier", sexe:"Masculin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},
      {id: 16, nom: "Dupont", prenom:"Fabienne", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},

    ];

const tableHeight = 56+52+10+Object.keys(rows).length*52

/* function HandleClick(e){
    console.log("=== HandleClick ===")
    const prenom = e.row.prenom;
    this.setState((prevState) => ({...prevState,["prenom"] :prenom}));
    if (this.state.wkfState==1){
        this.setState({premierConjoint:prenom})

    }
    if (this.state.wkfState==2){
        this.setState({secondConjoint:prenom})

    }
    console.log(this.state)
    console.log("REDIRECTION :")
    setCount(count + 1)
    /*this.props.history.push({
        pathname:'fiche-personne',
        state: this.state
    });
}   */   

class DeclarerMariage extends Component {
    constructor(props){
        super(props);
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
            activeTab:"1"
        }
        
        console.log("=== constructeur ===")
        console.log(this.props)
        this.HandleClick = this.HandleClick.bind(this);
      
        //SI on arrive sur cette page depuis fiche-personne 
        //ALORS on appel la méthode de MAJ de l'état du composant
        //SINON
        //  SI le wkf est au statut initial
        //  ALORS on supprime le nom stocké dans le premierConjoint lors de la redirection vers info-personne
        //  SINON 
        //      SI le wkf est au statut unConjoint
        //      ALORS on supprime le nom stocké dans le secondConjoint lors de la redirection vers info-personne
        if(this.props.location.state){
            this.state=this.props.location.state
            
            this.UpdateState()
        } else {
            this.setState({retourFichePersonne:""})
            switch (this.state.wkfState){
                case 1 :
                    this.setState({premierConjoint:""})
                break;
                case 2 :
                    this.setState({secondConjoint:""})
                break;
            }    
        }
        //console.log(this.state)
    }

    /*UpdateState(){
        console.log("=== UpdateState ===")
        if (this.state.retourFichePersonne==="conjointOK"){
            switch (this.state.wkfState){
                case "init" :
                    this.setState((prevState) => {prevState.wkfState="unConjoint"})
                break;
                case "unConjoint" :
                    this.setState((prevState) => {prevState.wkfState="deuxConjoints"})
                break;
            }
        }
        console.log(this.state)
    }*/
    UpdateState(){
        console.log("=== UpdateState ===")
        if (this.state.retourFichePersonne==="conjointOK"){
                this.setState(prevState => {return {wkfState: prevState.wkfState + 1}}, function(){console.log("**setState wkfState OK**")} )
            }
        //console.log(this.state)
    }

    /*UpdateActiveTab(){
        let activeTab
        console.log("=== UpdateActiveTab ===")
        switch (this.state.wkfState){
            case 1: 
                activeTab="1"
            break;
            case 2:
                activeTab="2"
            break;
        }
        return activeTab
    }*/

    HandleClick(e){
        console.log("=== HandleClick ===")
        const prenom = e.row.prenom;
        this.setState((prevState) => ({...prevState,["prenom"] :prenom}));
        if (this.state.wkfState==1){
            this.setState({premierConjoint:prenom})
            localStorage.setItem('premierConjoint', prenom)

        }
        if (this.state.wkfState==2){
            this.setState({secondConjoint:prenom})
            localStorage.setItem('secondConjoint', prenom)

        }
        console.log(this.state)
        console.log("REDIRECTION :")
        localStorage.setItem('wkfStateLocal', this.state.wkfState)

        this.props.history.push({
            pathname:'fiche-personne',
            state: this.state
        });
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
                    <Col className="col-6 col-sm-4">
                        <div 
                        className={this.state.wkfState > 1 ? "progress-active" : "progress-inactive" }
                        >
                            Premier conjoint
                        </div>
                    </Col>
                    <Col className="col-6 col-sm-4 ">
                        <div 
                        className={this.state.wkfState > 2 ? "progress-active" : "progress-inactive" }
                        >
                        Second conjoint
                        </div>
                    </Col>
                    <Col className="col-6 col-sm-4">
                        <div 
                        className={this.state.wkfState > 3 ? "progress-active" : "progress-inactive" }
                        >
                        Validation
                        </div>
                    </Col>

                </Row>
                <br/>
                <Progress
                    max="3"
                    value={Number(parseInt(this.state.wkfState)-1)}
                    barClassName="progress-bar-success"
                    style={{backgroundColor: "6bd098"}}
                />
                <br/>
                {this.state.wkfState<3 ? 
                    <div style={{ height: tableHeight, width: '100%' }}>
                        {Object.keys(rows).length !== 0 ? 
                        <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={this.HandleClick}></DataGrid> :
                    
                        <ErrorMessage message="Il n'y a aucune identité à valider"></ErrorMessage>
                       
                        }
                    </div> :
                    <>
                        <Row>
                            <Col className="col-6">
                                {this.state.premierConjoint}
                            </Col>
                            <Col className="col-6">
                                {this.state.secondConjoint}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="offset-sm-7">
                                <Button color="info">
                                    Valider ce mariage
                                </Button>
                            </Col>
                        </Row>
                    </> 
                }
                
                {/*<SectionProgress activeTab={this.UpdateActiveTab()} statut={this.state.wkfState} clickHandler={this.HandleClick}></SectionProgress>*/}
            </Container>
            </>
         );
    }
}
 
export default DeclarerMariage;

