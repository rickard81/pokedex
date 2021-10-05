import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
                  <select id="form-ability">
                    <option>all</option>
                  </select>
                </div>
                <div className="g12">
                  <div className="left">
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
                  <div className="left">
                    <label htmlFor="form-sort">Sort by</label>
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
            </div>
          </div>
          <div className="clear">
            <div className="grid">
              <div className="g12">
                <h2>Found 10 Pokemons</h2>
              </div>
              <div className="g12 nest cards">
                {
                  pokemons.results.map((pokemon,i) => ( 
                    console.log(pokemon.url)
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