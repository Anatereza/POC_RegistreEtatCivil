import React, { Component } from 'react';

const getPerson = () => {
    
//TODO : Implémenter l'appel à la BC pour récupérer les données de la personne passée en argument
    
    const result = [
        { name: "Sexe", price: "Masculin"},
        { name: "Nom de famille", price: "Durand"},
        { name: "Nom d’usage", price: "Durand"},
        { name: "Premier prénom", price: "Philippe"},
        { name: "Autres prénoms", price: "Claude Michel"},
        { name: "Etat civil", price: "Marié"},
        { name: "Date de naissance", price: "20/01/1962"},
        { name: "Commune de naissance", price: "Montpellier"},
        { name: "Département de naissance", price: "Hérault (34)"},
        { name: "Nom de famille de la mère", price: "Périllard"},
        { name: "Prénom de la mère", price: "Julie"},
        { name: "Nom de famille du père", price: "Durand"},
        { name: "Prénom du père", price: "Augustin"},
      ]

    return (result);
}
 
export default getPerson;
