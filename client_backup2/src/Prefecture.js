import React from "react";
import "./App.css";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

function Prefecture() {
  return (
    <div>
      <h1>Ajouter un membre préfecture</h1>

      <IMG />
      <h2>Données d'identification</h2>
      <Form>
        <Form.Group>
          <Form.Control placeholder="Civilité" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Nom de famille" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Prénom" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Date de naissance" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Fonction dans l'établissement" />
        </Form.Group>
      </Form>
      <h2>Etablissement</h2>
      <Form>
        <Form.Group>
          <Form.Control placeholder="Nom de l'établissement" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Adresse" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Code postal" />
        </Form.Group>
        <Form.Group>
          <Form.Control placeholder="Commune" />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit">
        Créer un membre
      </Button>
    </div>
  );
}

const IMG = () => {
  return (
    <img
      src="http://127.0.0.1:8887/prefecture.PNG"
      height="300"
      width="300"
    ></img>
  );
};
export default Prefecture;
