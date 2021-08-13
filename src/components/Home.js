import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'



const Home = () => {

  const [domain, setDomain] = useState('');

  //setDomain(location.hostname)

  return (
    <Container>
      <h1>{domain}</h1>
      <CardDeck>
        <Card>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
          </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setDomain(window.location.href)}  variant="primary">Go somewhere</Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
          </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">Go somewhere</Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
          </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">Go somewhere</Button>
          </Card.Footer>
        </Card>
      </CardDeck>
    </Container>

  );
}

export default Home