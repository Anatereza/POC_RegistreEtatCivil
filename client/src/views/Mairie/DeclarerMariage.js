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
    ];

const tableHeight = 56+52+10+Object.keys(rows).length*52

function SectionProgress( props ) {
    const [activeTab, setActiveTab] = React.useState("1");

    /*if (props.statut=="init"){
        setActiveTab("1")
    }else{
        setActiveTab("2")
    }*/
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    return (
      <>
        <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
                <Nav id="tabs" role="tablist" tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab === "1" ? "active" : ""}
                            onClick={() => {
                            toggle("1");
                            }}
                        >
                            Conjoint 1
                        </NavLink>

                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === "2" ? "active" : ""}
                            onClick={() => {
                            toggle("2");
                            }}
                        >
                            Conjoint 2
                        </NavLink>
                   
                    </NavItem>
                </Nav>
            </div>
        </div>
        <TabContent activeTab={activeTab} className="text-center">
            <TabPane tabId="1">
                <p>
                    <div style={{ height: tableHeight, width: '100%' }}>
                        {Object.keys(rows).length !== 0 ? 
                        <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={props.clickHandler}></DataGrid> :
                        <ErrorMessage message="Il n'y a aucune identité à valider"></ErrorMessage>
                        }
                    </div>
                </p>
            </TabPane>
            <TabPane tabId="2">
                <p>
                    <div style={{ height: tableHeight, width: '100%' }}>
                        {Object.keys(rows).length !== 0 ? 
                        <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={props.clickHandler}></DataGrid> :
                        <ErrorMessage message="Il n'y a aucune identité à valider"></ErrorMessage>
                        }
                    </div>
                </p>
            </TabPane>
        </TabContent>
    </>
  );
}

class DeclarerMariage extends Component {
    state = {
        nom:"",
        prenom:"",
        sexe:"",
        dateDeNaissance:"",
        communeDeNaissance:"",
        statut:"",
        URL:"declarer-mariage",
        wkfState:"init",
        retourFichePersonne:"",
        premierConjoint:"",
        secondConjoint:""
      }

    constructor(props){
        console.log("=== constructeur ===")
        
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        if(this.props.location.state){
            this.state=this.props.location.state
        }        
        //SI on arrive sur cette page depuis fiche-personne 
        //ALORS on appel la méthode de MAJ de l'état du composant
        //SINON
        //  SI le wkf est au statut initial
        //  ALORS on supprime le nom stocké dans le premierConjoint lors de la redirection vers info-personne
        //  SINON 
        //      SI le wkf est statut unConjoint
        //      ALORS on supprime le nom stocké dans le secondConjoint lors de la redirection vers info-personne
        if(this.props.location.state){
            this.updateState()
        } else {
            this.setState({retourFichePersonne:""})
            switch (this.state.wkfState){
                case "init" :
                    this.setState({premierConjoint:""})
                break;
                case "unConjoint" :
                    this.setState({secondConjoint:""})
                break;
            }    
        }
        console.log(this.state)
    }

    updateState(){
        console.log("=== updateState ===")
        if (this.state.retourFichePersonne==="conjointOK" && this.state.wkfState=="init"){
            console.log("init => unConjoint")
            this.setState(() => ({ wkfState:"unConjoint" }))

        }
        if (this.state.retourFichePersonne==="conjointOK" && this.state.wkfState=="unConjoint"){
            console.log("unConjoint => deuxConjoints")
            this.setState(() => ({ wkfState:"deuxConjoints" }))
        }

        console.log(this.state)
    }

    handleClick(e){
        console.log("=== handleClick ===")
        const prenom = e.row.prenom;
        this.setState((prevState) => ({...prevState,["prenom"] :prenom}));
        if (this.state.wkfState=="init"){
            this.setState({premierConjoint:prenom})

        }
        if (this.state.wkfState=="unConjoint"){
            this.setState({secondConjoint:prenom})

        }
        console.log(this.state)
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
                <SectionProgress statut={this.state.wkfState} clickHandler={this.handleClick}></SectionProgress>
            </Container>
            </>
         );
    }
}
 
export default DeclarerMariage;

