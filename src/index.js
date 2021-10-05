import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/layout.css';
import './css/grid.css';
import './css/typography.css';
import './css/forms.css';
import './css/ui.css';
import './css/helpers.css';

class SinglePokemon extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pokemon: [],
      DataisLoaded2: false
    };
  }

  componentDidMount() {
    const arr = this.props.apiurl.split('/'),
          id = arr[arr.length - 2];

    fetch("https://pokeapi.co/api/v2/pokemon/" + id).then((res) => res.json()).then((json) => {
      this.setState({
        pokemon: json,
        DataisLoaded2: true
      });
    })
  }
  
  render(){
    const { DataisLoaded2, pokemon } = this.state;
    if (!DataisLoaded2){
      return (
        <h1>Pleses wait some time...</h1>
      );
    }
    else {

      let abilitiesHtml = '',
          i = 0;

      while (i < pokemon.abilities.length){
        abilitiesHtml += `<div class="tag">${pokemon.abilities[i]['ability']['name']}</div>`;
        i++;
      }
      
      const type = pokemon.types[0]['type']['name'];

      return(
        <div key = {this.props.i} className="g3 fc">
          <a href="#" className={'card ' + type}>
            <div className="image">
              <div className="circle"></div>
              <img src={pokemon.sprites.other['official-artwork']['front_default']} alt={"Illutration of " + pokemon.name} />
            </div>
            <div className="meta">
              <p className="h4">{pokemon.name}</p>
              <div className="g4 nest stat">
                <p className="b">{type}</p>
                <p className="s">type</p>
              </div>    
              <div className="g4 nest stat">
                <p className="b">{pokemon.weight} kg</p>
                <p className="s">weight</p>
              </div>    
              <div className="g4 nest stat">
                <p className="b">{pokemon.height} m</p>
                <p className="s">height</p>
              </div>
              <div className = "tags" dangerouslySetInnerHTML={{ __html: abilitiesHtml }} />
            </div>
          </a>
        </div>
      );
    }
  }

}

class AllPokemons extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pokemons: [],
      DataisLoaded: false
    };
  }
  
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0").then((res) => res.json()).then((json) => {
      this.setState({
        pokemons: json,
        DataisLoaded: true
      });
    })
  }

  render() {
    
    const { DataisLoaded, pokemons } = this.state;

    if (!DataisLoaded){
      return (
        <h1>Pleses wait some time...</h1>
      );
    }
    else {
      return (
        <>
          <div className="clear bg-wh filters">
            <div className="grid">
              <div className="g12">
                <img src={'./logo.png'} alt="Pokemon" />
              </div>
              <div className="g12 nest">
                <div className="g6">
                  <label htmlFor="form-name">Name</label>
                  <input id="form-name" type="text" />
                </div>
                <div className="g6">
                  <label htmlFor="form-ability">Ability</label>
                  <div className="select">
                    <select id="form-ability">
                      <option>all</option>
                    </select>
                  </div>
                </div>
                <div className="g12">
                  <div className="options">
                    <div className="option count">
                      <fieldset>
                        <legend>Pokemons per page:</legend>
                        <div className="radio">
                          <input id="form-count10" type="radio" name="formPageCount" value="10" defaultChecked />
                          <label htmlFor="form-count10">10</label>
                        </div>
                        <div className="radio">
                          <input id="form-count20" type="radio" name="formPageCount" value="20" />              
                          <label htmlFor="form-count20">20</label>
                        </div>
                        <div className="radio">
                          <input id="form-count50" type="radio" name="formPageCount" value="50" />
                          <label htmlFor="form-count50">50</label>
                        </div>
                      </fieldset>
                    </div>
                    <div className="option order">
                      <label htmlFor="form-sort">Sort by:</label>
                      <div className="select simple">
                        <select id="form-sort">
                          <option>Name ascending</option>
                          <option>Name desending</option>
                          <option>Height ascending</option>
                          <option>Height desending</option>
                          <option>Weight ascending</option>
                          <option>Weight desending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="submit">
                    <button class="btn">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clear">
            <div className="grid">
              <div className="g12">
                <h2>Found 10 Pokemons</h2>
              </div>
              <div className="g12 nest cards fw">
                {
                  pokemons.results.map((pokemon,i) => ( 
                    <SinglePokemon apiurl = {pokemon.url} key = {i} />
                  ))
                }
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

ReactDOM.render(
  <AllPokemons />,
  document.getElementById('root')
);