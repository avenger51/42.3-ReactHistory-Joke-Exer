import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 5
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoading: true
    };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }


  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }


  async getJokes() {
    try {
      let jokes = [];
      let seenJokes = new Set(this.state.jokes.map(j => j.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { id, joke } = res.data;

        if (!seenJokes.has(id)) {
          seenJokes.add(id);
          jokes.push({ id, joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      this.setState(st => ({
        jokes: [...st.jokes, ...jokes],
        isLoading: false
      }));
    } catch (err) {
      console.error(err);
      this.setState({ isLoading: false });
    }
  }

  generateNewJokes() {
    this.setState({ jokes: [], isLoading: true }, this.getJokes);
  }

 
  vote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }


  render() {
    if (this.state.isLoading) {
      return (
        <div className="JokeList-spinner">
          <i className="fas fa-4x fa-spinner fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }

    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/014/438/856/small/rolling-on-the-floor-laughing-large-size-of-yellow-emoji-smile-vector.jpg"
            alt="Laughing Emoji"
          />
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Fetch Jokes
          </button>
        </div>

        <div className="JokeList-jokes">
          {sortedJokes.map(joke => (
            <Joke
              key={joke.id}
              id={joke.id}
              text={joke.joke}
              votes={joke.votes}
              vote={this.vote}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
