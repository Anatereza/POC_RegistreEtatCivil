import * as React from 'react';
import  { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";
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
      {id: 2, nom: "Dupont", prenom:"Josie", sexe:"Féminin", dateDeNaissance:"31/02/1945", communeDeNaissance:"Paris", statut:'vérifé'},];

  const tableHeight = 56+52+10+Object.keys(rows).length*52



class ValiderIdentité extends Component {
    state = {
        nom:"",
        prenom:"",
        sexe:"",
        dateDeNaissance:"",
        communeDeNaissance:"",
        statut:"",
        URL:"valider-identite"
      }

    handleClick(e){
        const prenom = e.row.prenom;
        this.setState((prevState) => ({...prevState,["prenom"] :prenom}));
        this.props.history.push({
            pathname:'fiche-personne',
            state: this.state
        });

    }

    render() { 
        return ( 
            <Container className="body-container">
                <Row style={{paddingTop:"100px"}}>
                    <div className="flex-container-left-center">
                        <img style={{width:"80px"}} alt="..." src={require("assets/img/IconesAccueils/Valider.png")}/>
                        <h1 className="ml-4" style={{color:"gray"}}>Valider une identité</h1>
                    </div>
                </Row>
                <div style={{height:"80px"}}></div>
                <div style={{ height: tableHeight, width: '100%' }}>   
                    <DataGrid rows={rows} columns={columns} pageSize={Object.keys(rows).length} hideFooterSelectedRowCount onRowClick={(e) => this.handleClick(e)}></DataGrid>
                </div>

            </Container>
         );
    }
}
 
export default ValiderIdentité;