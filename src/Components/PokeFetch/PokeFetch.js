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

  startTime = () => {
    clearInterval(this.state.timerInterval)
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
        }
      }, 1000)
    })
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
        <img className={this.state.pokemonRevealed ? 'pokePic' : 'pokeImg'} src={this.state.pokeSprite} />
        <h1 className={this.state.pokemonRevealed ? 'pokeName' : 'pokemonName'}>{this.state.pokeName}</h1>
      </div>
    </div>
  )
}
}
