import React, { Component } from 'react';
import Actualité from 'components/Actualité'

class Actualités extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="liste-actus">
                <div className="element-actu">
                    <h2 className="bold" style={{color:"#FBC658"}}>ACTUALITES</h2>
                </div>
                <div className="element-actu">
                    <Actualité></Actualité>
                </div>
                <div className="element-actu">
                    <Actualité></Actualité>
                </div>
                <div className="element-actu">
                    <Actualité></Actualité>
                </div>

            </div>

         );
    }
}
 
export default Actualités;