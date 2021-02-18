import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { 
    Button,
    Form,
    Input,
    FormGroup
} from 'reactstrap';


class Connexion extends Component {
    state = {
        login: "",
        pwd: "",
        authentificationState:"init"
    };

    constructor(props) {
        console.log("=== Constructeur connexion ===")
        super(props)
        
    }

    HandleSubmit(e){
        console.log(this)
        e.preventDefault()
        const param = [this.state.login, this.state.pwd];
        this.props.ClickHandler(param)
        this.updateState()
    }

    updateLogin = event => {
        this.setState({ login : event.target.value});
        this.setState({authentificationState:"init"})
    }
    
    updatePwd = event => {
        this.setState({ pwd : event.target.value});
        this.setState({authentificationState:"init"})

    }

    render() { 
        return ( 
            <>
            <div className="container-block-connexion">
                <div className="element-block-connexion">
                    <h2 style={{color:"#FBC658"}}>SE CONNECTER</h2>
                </div>
                <div className="element-block-connexion">
                        <Form onSubmit={(e) => this.HandleSubmit(e)}>
                            <FormGroup className={this.props.status==='KO' ? "has-danger container-form-connexion" : "container-form-connexion"}>
                                <Input onChange={(e) => this.updateLogin(e)} placeholder="Identifiant" type="text" className="form-control element-form-connexion "></Input>
                                <div className="element-form-connexion">
                                    <Input onChange={(e) => this.updatePwd(e)} placeholder="Mot de passe" type="password" className="form-control"></Input>
                                    {this.props.status==='KO' && <div style={{color: "#f5593d"}} >Combinaison identifiant / mot de passe incorrecte.</div>}
                                </div>
                                <Button type="submit" className="btn-round btn btn-info element-form-connexion">
                                    Se connecter
                                </Button>
                            </FormGroup>
                            
                            
                        </Form>                                      
                </div> 
            </div>
            </>
         );
    }
}
 
export default Connexion;