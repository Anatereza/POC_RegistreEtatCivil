import React, { Component } from 'react';

class QuestionsRéponses extends Component {
    state = {  }
    render() { 
        return (
            <div className="liste-actus">
                <div className="element-actu">
                    <h2 style={{color:"#FBC658"}}>QESTIONS / REPONSES</h2>
                </div>
                    <br />
                    <a href="#" style={{textAlign:"left"}}>Comment contester un refus de la mairie en matière d'état civil ?</a>
                    <br />
                    <a href="#" style={{textAlign:"left"}}>Quelle est la durée de validité d'un acte d'état civil ?</a>
                    <br />
                    <a href="#" style={{textAlign:"left"}}>Qu'est-ce qu'une mention marginale sur un acte d'état civil ?</a>
                    <br />
                    <a href="#" style={{textAlign:"left"}}>Comment utiliser un acte d'état civil français à l'étranger ?</a>
                </div>

          );
    }
}
 
export default QuestionsRéponses;