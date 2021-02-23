import React, { Component } from 'react';
import Connexion from 'components/Connexion'
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

class PortailAdministration extends Component {
    state = {  }
    constructor(props){
        super(props)
        this.HandleConnexion = this.HandleConnexion.bind(this)
    }
    HandleConnexion(param){
        console.log(param)
        switch (param[0]){
            case 'membreHopital' :
                console.log("case membre 1 (hopital)");
                this.props.history.push({
                    pathname:'home-hopital'
                }) 
              
            break;
            case 'membrePrefecture' :
                this.props.history.push({
                    pathname:'home-prefecture'
                }) 
            break;
            case 'membreMairie' :
                this.props.history.push({
                    pathname:'home-mairie'
                }) 
            break;
            default:
        }
    }

    render() { 
        return (
            <Container className="body-container">
                <Row style={{paddingTop:"80px"}} />
                <Row style={{height:"100px"}} className="text-center">
                    <h1 className="ml-4" style={{color:"gray"}}>PORTAIL ADMINISTRATION</h1>
                </Row>
                <Connexion ClickHandler={this.HandleConnexion}/>
            </Container>
          );
    }
}
 
export default PortailAdministration;