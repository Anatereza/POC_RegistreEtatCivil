import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationAdmin extends Component {
    render() {
        return (
           <div className='navbar'>
               <div className="Admin">ADMINISTRATEUR</div>
               <Link to ='/' className ="heading">ACCUEIL</Link>
               <div> | </div>
               <Link to ='/AddHospitalMember'>Ajouter personnel de l’hôpital</Link>
               <div> | </div>
               <Link to ='/AddPrefectureMember'>Ajouter personnel de la prefecture</Link>
               <div> | </div>
               <Link to ='/AddCityHallMember'>Ajouter personnel de la mairie</Link>               
           </div> 
        );
    }

}

export default NavigationAdmin;
