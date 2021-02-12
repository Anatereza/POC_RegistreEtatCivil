import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { 
    Button,
    Form,
    Input
} from 'reactstrap';


class Connexion extends Component {
    state = {
        login: "",
        pwd: "",  
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
    }

   
    updateLogin = event => {
        this.setState({ login : event.target.value});
        console.log("new login")
        console.log(this.state.login)
    }
    
    updatePwd = event => {
        this.setState({ pwd : event.target.value});
        console.log("new pwd")
        console.log(this.state.pwd)
    }

    render() { 
        console.log(this.state);

        return ( 
            <>
            <div className="container-block-connexion">
                <div className="element-block-connexion">
                    <h2 style={{color:"#FBC658"}}>SE CONNECTER</h2>
                </div>
                <div className="element-block-connexion">
                    <div className="container-form-connexion">
                        <Form onSubmit={(e) => this.HandleSubmit(e)}>
                            <Input onChange={(e) => this.updateLogin(e)} placeholder="Identifiant" type="text" className="form-control element-form-connexion"></Input>
                            <Input onChange={(e) => this.updatePwd(e)} placeholder="Mot de passe" type="text" className="form-control element-form-connexion"></Input>
                            <Button type="submit" className="btn-round btn btn-info element-form-connexion">
                                    Se connecter
                            </Button>
                        </Form>                                      
                    </div>
                </div> 
            </div>
            </>
         );
    }
}
 
export default Connexion;