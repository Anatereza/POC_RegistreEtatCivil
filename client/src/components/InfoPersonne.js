import React, { Component } from 'react';
import SimpleTable from 'components/SimpleTable';
import {
    Container,
    Row,
    Col,
  } from "reactstrap";


class InfoPersonne extends Component {
    state = {}
      
    render() { 
        return (
            <>
            <div className="container-info-personne">
                <Row>
                    <h2 style={{color:"gray"}}>Données d’identification</h2>
                </Row>
                <Row style={{marginLeft:"30px"}}>
                    <SimpleTable data={this.props.data.slice(0,7)}/>                  
                </Row>
                <Row style={{paddingTop:"30px"}}>
                    <h2 style={{color:"gray"}}>Données de naissance</h2>
                </Row>
                <Row style={{marginLeft:"30px"}}>
                    <SimpleTable data={this.props.data.slice(7,10)}/>
                </Row>
                <Row style={{paddingTop:"30px"}}>
                    <h2 style={{color:"gray"}}>Parents</h2>
                </Row>
                <Row style={{marginLeft:"30px"}}> 
                    <SimpleTable data={this.props.data.slice(10,14)}/>
                 </Row>
            </div>
            </>
          );
    }
}
 
export default InfoPersonne;