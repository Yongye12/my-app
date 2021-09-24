import React, { useState } from 'react';
import './App.css';
import CARDS from './assets/cards.json';
import { CardViewer } from './components/CardViewer';
import { ControlPanel } from './components/ControlPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import {Card} from './interface/card'
import { AddCardModal } from './components/AddCardModal';

function App(): JSX.Element{
  const [activeCard, setActiveCard] = useState<Card>(CARDS[0] as Card);
  const [answerRevealed, reveal] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [deck, setDeck] = useState<Card[]>(CARDS);

  function addCard(newCard: Card) {
    setDeck([...deck, newCard]);
  }

  return (
    <Container className="App">
      <Row>
      <ControlPanel
      showAddCardModal={setVisible}
      deck={deck}
      setCard={setActiveCard} 
      reveal = {reveal}
      answerRevealed = {answerRevealed}></ControlPanel>
      <CardViewer card= {activeCard} answerRevealed = {answerRevealed}></CardViewer>
      <AddCardModal visible={visible} setVisible={setVisible} addCard={addCard}></AddCardModal>
      </Row>
    </Container>
    
  );
}

export default App;
