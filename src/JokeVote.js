import React from 'react';

const JokeVote = ({ id, votes, vote }) => {
  return (
    <div className="Joke-votearea">
      <button onClick={() => vote(id, +1)}>
        <i className="fas fa-thumbs-up" />
      </button>

      <button onClick={() => vote(id, -1)}>
        <i className="fas fa-thumbs-down" />
      </button>

      {votes}
    </div>
  );
};

export default JokeVote;
