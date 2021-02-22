import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import GenerateQRCode from "components/GenerateQRCode"

// Create styles
/*const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignContent: 'center',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    titre: {
        fontWeight: 300,
        fontSize: 30,
    },
    body: {
        justifySelf:'flex-start',
        margin: 10,
}

});*/

function RandomNumber () {
    return Math.floor(Math.random() * Math.floor(9999));
}

// logoCI.jpg
//style={styles.image}
// style={styles.centerImage}

const ActeDeNaissance = param => (
    <Document>
    <Page size="A4" style={{flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignContent: 'center'
        }}>
        <View style={{margin: 10, padding: 10, flexGrow: 1, alignContent: 'center', alignItems: 'center'}}>
            <Image style={{width:100}} src="/Côte_d'Ivoire_Logo.jpg" />
            <Text style={{fontWeight: 300, fontSize: 15}}>REPUBLIQUE DE COTE D'IVOIRE</Text>
        </View>

        <View style={{margin: 10, padding: 10, flexGrow: 1, alignContent: 'center', alignItems: 'center'}}>
            <Text >EXTRAIT D'ACTE DE NAISSANCE</Text>
            <Text style={{fontWeight: 300, fontSize: 12}}>Du registre des actes de l'Etat Civil</Text>
            <Text style={{fontWeight: 300, fontSize: 12}}>Pour l'année 2021</Text>
        </View>


        <View style={{margin: 10, padding: 10, flexGrow: 1}}>
            <Text style={{fontWeight: 300, fontSize: 30}}>Maire de {param[0]}</Text>
            <Text >Extrait d'acte de naissance</Text>
        </View>
        <View style={{margin: 10, padding: 10, flexGrow: 1}}>
            <Text style={{justifySelf:'flex-start',margin: 10,}}>ANNEE {param[1].split('-')[0]} Acte n° {RandomNumber()}</Text>
            <Text style={{justifySelf:'flex-start',margin: 10,}}>Le {param[1]} est né en notre commune à {param[0]}</Text>
            <Text style={{justifySelf:'flex-start',margin: 10,}}>{param[2]} {param[3]} {param[4]} </Text>
            <Text style={{justifySelf:'flex-start',margin: 10,}}>Du sexe {param[5]}</Text>            
        </View>

        <View style={{flex: 0.5}}>
            <Image style={{width:100}} src={GenerateQRCode(param[7])} />
        </View>
        
    </Page>
  </Document>
);
export default ActeDeNaissance;

