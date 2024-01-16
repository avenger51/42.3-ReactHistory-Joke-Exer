import React from 'react';
import JokeVote from './JokeVote';
import "./Joke.css";


class Joke extends React.Component {
  render() {
    const { id, votes, text, vote } = this.props;
    
    return (
      <div className="Joke">
        <JokeVote id={id} votes={votes} vote={vote} />
        <div className="Joke-text">{text}</div>
      </div>
    );
  }
}

export default Joke;
