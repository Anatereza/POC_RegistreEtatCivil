// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

/* 
* Libraries needed in the contract 'Civil State' contract
*/
/** @title LibConcatenateStrings. */
/// @dev Library with a function for concatenating strings
import {LibConcatenateStrings} from './LibConcatenateStrings.sol';
/** @title LibTransformUintString. */
/// @dev Library with a function to transform an 'uint' in a 'string
import {LibTransformUintString} from './LibTransformUintString.sol';
/** @title SafeMath. */
/** 
 * @dev Library with functions to realize arithmetic operations with overflow checks
 *
 * Contract collection retrieved from : https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol
 *
*/
import {SafeMath} from './SafeMath.sol';

/** @title CivilState. */
contract CivilState {
    /// @dev Include libraries codes and initialize its use in the contract
    using LibConcatenateStrings for string;
    using LibTransformUintString for *;
    using SafeMath for uint; 

    /// @dev Owner address
    address payable public owner;
    
    /// @dev Compteur du nombre d'utilisateurs registrés 
    uint utilisateursCount = 0;
    
    /// @dev Compteur du nombre d'utilisateurs hopital
    uint utilisateursHopital = 0;

    /// @dev Compteur du nombre d'utilisateurs prefecture
    uint utilisateursPrefecture = 0;

    /// @dev Compteur du nombre d'utilisateurs mairie
    uint utilisateursMairie = 0;

    /// @dev Compteur du nombre de citoyens
    uint citoyensCount = 0;

    DonneesIdentification public _donneesIdentTemp;
    DonneesEtablissement public _donneesEtabTemp;

    /**
    * Informations d'authentifications des utilisateurs
    * typ : pour définir si citoyen, admin, membre hôpital, membre prefecture, membre mairie
    * valeurs possibles typ : citoyen, admin, hopital, prefecture, mairie
    */
    struct Authentification {
        string mdp;
        string typ;
    }

    /**
    * Données d'identification des membres
    * de l'hopital, de la prefecture, de la mairie
    *
    */
    struct DonneesIdentification {
        string civilite;
        string nom;
        string prenom;
        string dateNaissance;
        string role;
    }

    /**
    * Données de l'établissement des membres
    * de l'hopital, de la prefecture, de la mairie
    *
    */
    struct DonneesEtablissement {
        string nom;
        string adresse;
        string codePostale;
        string ville;
    }

    struct DonneesMembres {
        string login;
        Authentification auth;
        DonneesIdentification donneesIdent;
        DonneesEtablissement donneesEtablissement;
    }

    /**
    * Données d'identification des citoyens
    */
    struct DonneesIdentificationCitoyen {
        string sexe;
        string nomFamille;
        string nomUsage;
        string premierPrenom;
        string autresPrenoms;
        string etatCivil;
    }

    /**
    * Données de naissance des citoyens
    */
    struct DonneesNaissanceCitoyen {
        string dateNaissance;
        string communeNaissance;
        string departementNaissance;
    }

    /**
    * Données des parents des citoyens
    */
    struct DonneesParentsCitoyen {
        string nomFamilleMere;
        string prenomMere;
        string nomFamillePere;
        string prenomPere;
    }

    struct DonneesCitoyen {
        string login;
        string identite;
        Authentification auth;
        DonneesIdentificationCitoyen donneesIdentCitoyen;
        DonneesNaissanceCitoyen donneesNaissanceCitoyen;
        DonneesParentsCitoyen donneesParentsCitoyen;
    }            

    /*
    * Mapping pour le suivi des utilisateurs
    * clé : string login
    */
    mapping (string => Authentification) utilisateurs;

    /** @dev
    * Mappings pour suivi des membres de l'hopital, de la prefecture et de la mairie
    *
    */
    mapping(string => DonneesMembres) membresHopital;

    mapping(string => DonneesMembres) membresPrefecture;

    mapping(string => DonneesMembres) membresMairie;

    /** @dev
    * Mappings pour suivi des citoyens
    *
    */
    mapping(string => DonneesCitoyen) citoyens;        

    /// @dev Contract constructor sets the owner
    constructor () public {
        owner = msg.sender;
    }   
    

    /**
    * Read functions 
    */

    function getTypeUtilisateur(string memory _login) public view returns(string memory _typ) {
        _typ = utilisateurs[_login].typ;
    }

    /// @dev Gets the hospital members count.
    /// @return utilisateursHopital Membres hopital count.
    function getUtilisateursHopitalCount() public view returns(uint){
        return utilisateursHopital;
    }

    /// @dev Get info membre hopital
    /// @param _login Le login du membre.
    /// @return _civilite
    /// @return _nom
    /// @return _prenom
    /// @return _dateNaissance
    /// @return _role
    function getInfoIdentMembreHopital(string memory _login) public returns(string memory _civilite, string memory _nom, string memory _prenom, string memory _dateNaissance, string memory _role){
     
        _donneesIdentTemp = membresHopital[_login].donneesIdent;
        _civilite = _donneesIdentTemp.civilite;
        _nom = _donneesIdentTemp.nom;
        _prenom = _donneesIdentTemp.prenom;
        _dateNaissance = _donneesIdentTemp.dateNaissance;
        _role = _donneesIdentTemp.role;
    }

    function getInfoEtabMembreHopital(string memory _login) public returns(string memory _nomEtab, string memory _adresseEtab, string memory _codePostaleEtab, string memory _villeEtab){
     
        _donneesEtabTemp = membresHopital[_login].donneesEtablissement;
        _nomEtab = _donneesEtabTemp.nom;
        _adresseEtab = _donneesEtabTemp.adresse;
        _codePostaleEtab = _donneesEtabTemp.codePostale;
        _villeEtab = _donneesEtabTemp.ville;

    }

    function getInfoIdentificationCitoyen (string memory _login) public view returns(string memory _sexe, 
    string memory _nomFamille, string memory _nomUsage, string memory _premierPrenom, 
    string memory _autresPrenoms, string memory _etatCivil) {
         DonneesIdentificationCitoyen memory _donneesIdentificationCitoyen;
        _donneesIdentificationCitoyen = citoyens[_login].donneesIdentCitoyen;

        _sexe = _donneesIdentificationCitoyen.sexe;
        _nomFamille = _donneesIdentificationCitoyen.nomFamille;
        _nomUsage = _donneesIdentificationCitoyen.nomUsage;
        _premierPrenom = _donneesIdentificationCitoyen.premierPrenom;
        _autresPrenoms = _donneesIdentificationCitoyen.autresPrenoms;
        _etatCivil = _donneesIdentificationCitoyen.etatCivil;

    }

    function getInfoNaissanceCitoyen (string memory _login) public view returns(string memory _dateNaissance, 
    string memory _communeNaissance, string memory _departementNaissance) {
        DonneesNaissanceCitoyen memory _donneesNaissanceCitoyen;
        _donneesNaissanceCitoyen = citoyens[_login].donneesNaissanceCitoyen;

        _dateNaissance = _donneesNaissanceCitoyen.dateNaissance;
        _communeNaissance = _donneesNaissanceCitoyen.communeNaissance;
        _departementNaissance = _donneesNaissanceCitoyen.departementNaissance;

    }

    function getInfoParentsCitoyen (string memory _login) public view returns(string memory _nomFamilleMere,
    string memory _prenomMere, string memory _nomFamillePere, string memory _prenomPere) {
        DonneesParentsCitoyen memory _donneesParentsCitoyen;
        _donneesParentsCitoyen = citoyens[_login].donneesParentsCitoyen;

        _nomFamilleMere = _donneesParentsCitoyen.nomFamilleMere;
        _prenomMere = _donneesParentsCitoyen.prenomMere;
        _nomFamillePere = _donneesParentsCitoyen.nomFamillePere;
        _prenomPere = _donneesParentsCitoyen.prenomPere;        
    }

    /**
    * Write functions 
    */    

    /// @dev Function pour ajouter un nouveau utilisateur 
    function addMembreHopital(string memory _civilite, string memory _nom, string memory _prenom, string memory _dateNaissance, string memory _role,
    string memory _nomEtab, string memory _adresseEtab, string memory _codePostaleEtab, string memory _villeEtab) public {
        DonneesIdentification memory _donneesIdent;
        DonneesEtablissement memory _donneesEtab;
        string memory _login = _nom;
        _login = _login.concatenate(_prenom);
        _login = _login.concatenate(_dateNaissance);
        string memory _mdp = _login;
        Authentification memory _auth;   

        _donneesIdent = DonneesIdentification({
            civilite: _civilite,
            nom: _nom,
            prenom : _prenom,
            dateNaissance : _dateNaissance,
            role : _role
        });
        
        _donneesEtab = DonneesEtablissement({
            nom : _nomEtab,
            adresse : _adresseEtab,
            codePostale : _codePostaleEtab,
            ville : _villeEtab
        });

        _auth = Authentification({
            mdp : _mdp,
            typ : "hopital"
        });
        
    
        membresHopital[_login] = DonneesMembres({
            login : _login,
            auth : _auth,
            donneesIdent : _donneesIdent,
            donneesEtablissement : _donneesEtab
        });

        utilisateurs[_login] = Authentification({
            mdp : _mdp,
            typ : "hopital"
        });

        utilisateursHopital++;
        utilisateursCount++;
    }

    /// @dev Function pour ajouter un nouveau citoyen 
    function addNaissance(string memory _sexe, string memory _nomFamille, string memory _nomUsage, string memory _premierPrenom, string memory _autresPrenoms) public {
        
        DonneesIdentificationCitoyen memory _donneesIdentificationCitoyen;
        DonneesNaissanceCitoyen memory _donneesNaissanceCitoyen;
        DonneesParentsCitoyen memory _donneesParentsCitoyen;

        string memory _login = _nomFamille;
        _login = _login.concatenate(_premierPrenom);
        string memory _mdp = _login;
        Authentification memory _auth;

        _auth = Authentification({
            mdp : _mdp,
            typ : "citoyen"
        });

        _donneesIdentificationCitoyen = DonneesIdentificationCitoyen({
            sexe : _sexe,
            nomFamille : _nomFamille,
            nomUsage : _nomUsage,
            premierPrenom : _premierPrenom,
            autresPrenoms : _autresPrenoms,
            etatCivil : "celibataire"
        });

        citoyens[_login] = DonneesCitoyen({
            login : _login,
            identite : "nonvalide",
            auth : _auth,
            donneesIdentCitoyen : _donneesIdentificationCitoyen,
            donneesNaissanceCitoyen : _donneesNaissanceCitoyen,
            donneesParentsCitoyen : _donneesParentsCitoyen
        });

        citoyensCount++; 

    }

    
    /// @dev Function pour ajouter les données de naissance
    function addDonneesNaissance(string memory _login, string memory _dateNaissance, string memory _communeNaissance, string memory _departementNaissance) public {
        DonneesNaissanceCitoyen memory _donneesNaissanceCitoyen;

        _donneesNaissanceCitoyen = DonneesNaissanceCitoyen({
            dateNaissance : _dateNaissance,
            communeNaissance : _communeNaissance,
            departementNaissance : _departementNaissance
        });

        citoyens[_login].donneesNaissanceCitoyen = _donneesNaissanceCitoyen;         
    }


    /// @dev Function pour ajouter un nouveau citoyen 
    function addDonneesParents(string memory _login, string memory _nomFamilleMere, string memory _prenomMere, string memory _nomFamillePere,string memory _prenomPere) public {
        DonneesParentsCitoyen memory _donneesParentsCitoyen;

        _donneesParentsCitoyen = DonneesParentsCitoyen({
            nomFamilleMere : _nomFamilleMere,
            prenomMere : _prenomMere,
            nomFamillePere : _nomFamillePere,
            prenomPere : _prenomPere
        });

        citoyens[_login].donneesParentsCitoyen = _donneesParentsCitoyen;        
    }

    /// @dev Function pour vérifier identité
    function verifyIdentite(string memory _login) public {
        citoyens[_login].identite = "valide";
        
        Authentification memory _auth = citoyens[_login].auth;
        string memory _mdp = _auth.mdp;

        utilisateurs[_login] = Authentification({
            mdp : _mdp,
            typ : "citoyen"
        });

        utilisateursCount++;

    }
   

}