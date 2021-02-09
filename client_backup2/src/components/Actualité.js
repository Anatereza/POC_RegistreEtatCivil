import React, { Component } from 'react';

class Actualité extends Component {
    state = {  }
    render() { 
        return (
             <div className = "bloc-actu">
                <div className="element-bloc-actu">
                    <img alt="..." src={require("assets/img/news.jpg")} className="img-rounded"/>
                </div>
                <div className="element-bloc-actu">
                    <div style={{fontWeight:"bold"}}>Nouvelle démarche disponible dans votre espace particulier</div>
                    <div>Vous pouvez désormais vous inscrire sur les listes électorales en un clic depuis votre espace personnel.</div>
                </div>
                
            </div>

          );
    }
}

export default Actualité;