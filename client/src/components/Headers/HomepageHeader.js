import React, { Component } from 'react';
import { Container } from "reactstrap";
import "assets/css/paper-kit.css"
import logoCoteIvoire from 'assets/img/logo_cote_ivoire.png'
import logoQuestion from 'assets/img/question.png'

class HomepageHeader extends Component {
    state = {
        URLCible:""
    }

    constructor(props){
        super(props);
        
        

    }

    HandleClick(){
        
        if(this.props.location.pathname.includes("valider-identite")){
            this.props.history.push({
                pathname:"home-prefecture"
            })
        }
        if(this.props.location.pathname.includes("declarer-mariage")){
            this.props.history.push({
                pathname:"home-mairie"
            })
        }
        if(this.props.location.pathname.includes("verification-id")){
            this.props.history.push({
                pathname:"home"
            })
        }
        if(this.props.location.pathname.includes("hopital-naissance")){
            this.props.history.push({
                pathname:"home-hopital"
            })
        }
        if(this.props.location.pathname.includes("naissance-validee")){
            this.props.history.push({
                pathname:"home-hopital"
            })
        }
        if(this.props.location.pathname.includes("identite-verifiee")){
            this.props.history.push({
                pathname:"home-prefecture"
            })
        }
        if(this.props.location.pathname.includes("home-citoyen")){
            this.props.history.push({
                pathname:"home"
            })
        }
        
    }

    render() { 
        return (
            <>
            <div className="page-header">
                <Container>
                    <div className="container-logo-header">
                        <div className="element-logo-header">
                        <img className="img-header" alt="..." src={logoCoteIvoire} onClick={() => this.HandleClick()} />
                        </div>
                        <div className="element-logo-header"> 
                                <div style={{fontWeight:"bold"}, {color:"#fbc658"}}>WWW.GOUV.CI/ETATSCIVILS <br/></div>
                                <div style={{color:"#66615b"}}>LE PORTAIL DES ACTES D’ÉTATS CIVILS <br/></div>
                                <div style={{color:"#66615b"}}>DE LA CÔTE D’IVOIRE <br/></div>
                        </div>
                        <div className="element-logo-header"> 
                            <span >
                                <img style={{width:"50px"}} alt="..." src={logoQuestion} />
                                <div>Une question ?</div>
                            </span>
                        </div>
                    </div>
                    
                </Container>
            </div>
            </>
          );
    }
}
 
export default HomepageHeader;