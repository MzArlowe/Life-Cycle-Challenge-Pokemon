import React, { Component } from 'react'
import './PokeFetch.css';


export default class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 0,
      timerOn: false,
      timerInterval: 10,
      pokemonRevealed: false
    }
  }

  fetchPokemon = () => {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  //Timer that counts down from 10 seconds

  startTime = () => {
    this.fetchPokemon()
    this.setState({ timerOn: true, pokemonRevealed: false })
    this.setState({ timer: 10 })
    this.setState({
      timerInterval: setInterval(() => {
        if (this.state.timer > 0) {
          this.setState({
            timer: this.state.timer - 1,
          })
        } else {
          this.setState({
            pokemonRevealed: true,
          })
          this.setState({
            timerOn: false,
          })
          clearInterval(this.state.timerInterval)
        }
      }, 1000)
    })
  }

  stopTime = () => {
    this.setState({ timerOn: false })
    clearInterval(this.state.timerInterval)
  }

  render() {
    return (
      <div className={'wrapper'}>
      <button className={'start'} onClick={this.startTime}>Start</button> 
      <h1 className={'timer'} >Timer Display</h1>
      <div className="timerContainer">
              <h1 className={'timer'}>{this.state.timer}</h1>
            </div>
      <div className={'pokeWrap'}>
        <img className={'pokeImg'} src={this.state.pokeSprite } />
        <h1 className={'pokeName'}>{this.state.pokeName}</h1>
      </div>
    </div>
  )
}
}

// onClick={() => this.fetchPokemon()}>Start!</button>
//{this.state.timerOn ? 'timerVisible' : 'timerHidden'}>{this.state.timer}</h1>