import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { 
    Button,
    Form,
    Input
} from 'reactstrap';

/*const Connexion = (props) => {

    function HandleClick(e){
        console.log("=== handleClick ===")
        console.log(e)
        console.log(this.props)
        this.props.history.push({
            pathname:'home-citoyen',
            state: this.state
    });

    console.log("=== Connexion ===")

    /*if(this.props.location.state){
        this.state=this.props.location.state
        
    }
    this.HandleClick = this.HandleClick.bind(this);

    }
    return (<>
        <div className="container-block-connexion">
            <div className="element-block-connexion">
                <h2 style={{color:"#FBC658"}}>SE CONNECTER</h2>
            </div>
            <div className="element-block-connexion">
                <div className="container-form-connexion">
                    <input placeholder="Identifiant" type="text" className="form-control element-form-connexion"></input>
                    <input placeholder="Mot de passe" type="text" className="form-control element-form-connexion"></input>
                    <button onClick={(e) => HandleClick(e)} type="button" className="btn-round btn btn-info element-form-connexion">
                            Se connecter
                    </button>                        
                    {/*<Link to={{
                        pathname: '/home-citoyen',
                        aboutConnexion: {
                            connexion : this.state.login
                        }
                        }}>
                        <button  type="button" className="btn-round btn btn-info element-form-connexion">
                            Se connecter
                        </button>
                    </Link>                     
                </div>
            </div> 
        </div>
        </>  
        );
    }
}

export default Connexion;*/
 


class Connexion extends Component {
    state = {
        login: "DupondPierre",
        pwd: ""        
    };

    constructor(props) {
        console.log("=== Constructeur connexion ===")
        super(props)
        /*if(this.props.location.state){
            this.state=this.props.location.state
            
        }
        this.HandleClick = this.HandleClick.bind(this);*/
        
    }

    /*HandleClick(e){
        console.log("=== handleClick ===")
        console.log(this.state)
        console.log(e)
        console.log(this.props)
        this.props.history.push({
            pathname:'home-citoyen',
            state: this.state
        });
    }*/

    HandleSubmit(e){
        e.preventDefault()
        this.props.ClickHandler(this.state.login)
    }

    HandleChange(e){
        this.setState({login:e.target.value})
    }

    render() { 
        return ( 
            <>
            <div className="container-block-connexion">
                <div className="element-block-connexion">
                    <h2 style={{color:"#FBC658"}}>SE CONNECTER</h2>
                </div>
                <div className="element-block-connexion">
                    <div className="container-form-connexion">
                        <Form onSubmit={(e) => this.HandleSubmit(e)}>
                            <Input onChange={(e) => this.HandleChange(e)} placeholder="Identifiant" type="text" className="form-control element-form-connexion"></Input>
                            <Input placeholder="Mot de passe" type="text" className="form-control element-form-connexion"></Input>
                            <Button  /*onClick={this.props.ClickHandler}*/ type="submit" className="btn-round btn btn-info element-form-connexion">
                                    Se connecter
                            </Button>
                        </Form>
                                                
                        {/*<Link to={{
                            pathname: '/home-citoyen',
                            aboutConnexion: {
                                connexion : this.state.login
                            }
                            }}>
                            <button  type="button" className="btn-round btn btn-info element-form-connexion">
                                Se connecter
                            </button>
                        </Link>*/}                     
                    </div>
                </div> 
            </div>
            </>
         );
    }
}
 
export default Connexion;