import { Button, Col } from "react-bootstrap";
import { Card } from "../interface/card";
import { getRandomElement, shuffle } from "../utilities/data";
import { UserList } from "./UserList";
import { useState } from "react";
import { Task as User } from "editable-dnd-list";
import { TypeInAnswer } from "./TypeInAnswer";
import { Feedback } from "./FeedBack";

export const LOCAL_STORAGE_USERS = 'my-app-users';

export const INITIAL_USERS: User[] = [
  { id: '1', text: "Shaozhe" },
  { id: '2', text: "Kaiser" },
  { id: '3', text: "Joe" },
];

export function getLocalStorageUsers(): User[] {
  let rawUsers: string | null = localStorage.getItem(LOCAL_STORAGE_USERS);
  if (rawUsers === null) {
    return [...INITIAL_USERS];
  } else {
    return JSON.parse(rawUsers);
  }
}

export function ControlPanel({ setCard, reveal, answerRevealed, showAddCardModal, deck, currentCard}:
  {
    setCard: (c: Card) => void, reveal: (r: boolean) => void, answerRevealed: boolean,
    showAddCardModal: (b: boolean) => void, deck: Card[], currentCard: Card}): JSX.Element {

  const [users, setUsers] = useState<User[]>(getLocalStorageUsers());
  const [typeinanswer, settypeinanswer] = useState<string>("MY ANSWER");
  const [feedback, setFeedback] = useState<string>("Result");

  function setRandomCard() {
    reveal(false);
    setCard(getRandomElement(deck))
  }

  function shuffleUsers() {
    let shuffledUsers: User[] = shuffle(users);
    setUsers([...shuffledUsers]);
  }

  function save() {
    localStorage.setItem(LOCAL_STORAGE_USERS, JSON.stringify(users));
  }

  function addNewCard() {
    showAddCardModal(true);
  }

  function checkAnswer() {
    if (typeinanswer === currentCard.answer) {
      setFeedback("You are correctly!!")
    };
    if (typeinanswer !== currentCard.answer) {
      setFeedback("You are wrong!!")    
    }
  }


return <Col>
  <h1>Control Panel </h1>
  <UserList users={users} setUsers={setUsers}></UserList>
  <TypeInAnswer typeinanswer={typeinanswer} settypeinanswer={settypeinanswer} checkAnswer={checkAnswer}></TypeInAnswer>
  <Feedback feedback={feedback} setFeedback={setFeedback}></Feedback>
  <Button onClick={setRandomCard} className="m-4">Swap Your Card</Button>
  <Button data-testid="reveal-answer-button" onClick={() => reveal(!answerRevealed)} className="m-4"> Reveal Answer</Button>
  <Button onClick={shuffleUsers} className="m-4">Shuffle Users</Button>
  <Button onClick={save} className="m-4" variant="success">Save</Button>
  <Button onClick={addNewCard} className="m-4">Add new card</Button>
</Col>
}