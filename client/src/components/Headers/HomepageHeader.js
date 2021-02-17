import React, { Component } from 'react';
import { Container } from "reactstrap";
import "assets/css/paper-kit.css"
import logoCoteIvoire from 'assets/img/logo_cote_ivoire.png'
import logoQuestion from 'assets/img/question.png'

class HomepageHeader extends Component {
    state = {  }
    constructor(props){
        super(props);}
    render() { 
        console.log(this.props)
        return (
            <>
            <div className="page-header">
                <Container>
                    <div className="container-logo-header">
                        <div className="element-logo-header"> 
                        <img alt="..." src={logoCoteIvoire} />
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