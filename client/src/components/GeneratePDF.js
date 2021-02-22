import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import GenerateQRCode from "components/GenerateQRCode"

// Create styles
const styles = StyleSheet.create({
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

});

function RandomNumber () {
    return Math.floor(Math.random() * Math.floor(9999));
}

const ActeDeNaissance = param => (
    <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text style={styles.titre}>Maire de {param[0]}</Text>
            <Text >Extrait d'acte de naissance</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.body}>ANNEE {param[1].split('/')[2]} Acte n° {RandomNumber()}</Text>
            <Text style={styles.body}>Le {param[1]} est né en notre commune à {param[0]}</Text>
            <Text style={styles.body}>{param[2]} {param[3]} {param[4]} </Text>
            <Text style={styles.body}>Du sexe {param[5]}</Text>            
        </View>
    </Page>
  </Document>
);
export default ActeDeNaissance;

