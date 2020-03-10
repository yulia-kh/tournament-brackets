import React from 'react';

export default function displayMatchup(props) {
   
    return (
      <ul key={props.team[0].team_id + props.team[1].team_id} className="matchup">
        <li key={props.team[0].team_id} className="team" 
          onMouseEnter={() => props.onHover(props.team[0].team_id, props.team[0].name)}
          onMouseLeave={props.onLeave}>
          <img src={props.team[0].logo_url} alt={props.team[0].name + ' logo'}></img>
          {props.team[0].name || 'N/A'}
          <span className="score">{props.team[0].rating}</span>
        </li>
        <li key={props.team[1].team_id} className="team" 
        onMouseEnter={() => props.onHover(props.team[1].team_id, props.team[1].name)}
        onMouseLeave={props.onLeave}>
          <img src={props.team[1].logo_url} alt={props.team[1].name + ' logo'}></img>
          {props.team[1].name || 'N/A'}
          <span className="score">{props.team[1].rating}</span>
        </li>
      </ul>
    )
  }