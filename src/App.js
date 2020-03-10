import React from 'react';
import './App.css';
import config from './config';
import Matchup from './Matchup';

class App extends React.Component {
  
  state = {
    firstRound: [],
    secondRound: [],
    thirdRound: [],
    championship: [],
    teamInfo: [],
    hover: false
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/teams`) 
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json())
      .then(res => {
        let teams = res.slice(0, 16);
        let firstRound = [];
        let secondRound = [];
        let thirdRound = [];
        let championship = [];
    
        let getRandomInt = function() {
          return Math.floor(Math.random() * Math.floor(2));
        }
        for (let i = 0; i < teams.length/2; i++) {
          firstRound.push([teams[i], teams[teams.length-1-i]])
        }
        for (let i = 0; i < firstRound.length; i = i+2) {
          secondRound.push([firstRound[i][getRandomInt()], firstRound[i+1][getRandomInt()]])
        }
        for (let i = 0; i < secondRound.length; i = i+2) {
          thirdRound.push([secondRound[i][getRandomInt()], secondRound[i+1][getRandomInt()]])
        }
        
        championship.push([thirdRound[0][getRandomInt()], thirdRound[1][getRandomInt()]])
        
        this.setState({
          firstRound: firstRound,
          secondRound: secondRound,
          thirdRound: thirdRound,
          championship: championship
        })
      })
      .catch(error => {
        console.error({error})
      })
    }

    handleMouseEnter = (teamId, teamName) => {
      fetch(`${config.API_ENDPOINT}/teams/${teamId}/players`)
        .then(res => 
          (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
        .then(players => {
          let teamInfo = []
          players.map(player => {
             return player.name && player.is_current_team_member? teamInfo.push({name: player.name, team_name: teamName}) : teamInfo.push({team_name: teamName});
          })
          this.setState({
            teamInfo: teamInfo,
            hover: true
          })
        })
        .catch(error => {
          console.error({error})
        })
    }

    handleMouseLeave = () => {
      this.setState({
        teamInfo: [],
        hover: false
      })
    }

  render() {
    return (
    <div className="App">
      <header className="hero">
        <div className="hero-wrap">
          <h1 id="headline">Tournament</h1>
        </div>
      </header>
      <main id="bracket">
        <section className="container">
          <div className="round current roune-one">
            <div className="round-details">Round 1<br/><span className="date">March 16</span></div>
            {this.state.firstRound.map(team => {
              return <Matchup team={team} onHover={this.handleMouseEnter} onLeave={this.handleMouseLeave}/>;
            })}
          </div>

          <div className="round current round-two">
            <div className="round-details">Round 2<br/><span className="date">March 18</span></div> 
            {this.state.secondRound.map(team => {
              return <Matchup team={team} onHover={this.handleMouseEnter} onLeave={this.handleMouseLeave}/>;
            })}
          </div>

          <div className="round current round-three">
            <div className="round-details">Round 3<br/><span className="date">March 22</span></div>			
            {this.state.thirdRound.map(team => {
              return <Matchup team={team} onHover={this.handleMouseEnter} onLeave={this.handleMouseLeave}/>;
            })}
          </div>

          <div className="champion current round">
            <div className="final">
              <div className="round-details">championship <br/><span className="date">March 30</span></div>		
              {this.state.championship.map(team => {
            return <Matchup team={team} onHover={this.handleMouseEnter} onLeave={this.handleMouseLeave}/>;
          })}
            </div>
          </div>

          <span className={this.state.hover ? 'tooltip hover' : 'toolptip no-hover'}>
            <h1>{this.state.teamInfo[0] ? this.state.teamInfo[1]['team_name'] + ' players' : "players"}</h1>
            <ul>
              {this.state.teamInfo.map((player, index) => <li key={index}>{player.name}</li>)}
            </ul>
          </span>

        </section>
      </main>
    </div>
    )
  };
}

export default App;
