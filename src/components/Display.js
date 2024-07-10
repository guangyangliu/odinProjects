import React, {useEffect, useState} from "react";
async function pokemonsData() {
    try {
        const limit = 12;
        const fetchPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
        const pokemons = await fetchPokemons.json();
        const pokemonsResults = pokemons.results;
        const pokemonsData = Promise.all(pokemonsResults.map(async(pokemon) => {
            const fetchPokemon = await fetch(pokemon.url);
            const pokemonData = await fetchPokemon.json();
            return {name:pokemon.name, imgUrl: pokemonData.sprites['front_default']};
        }));
    
        return pokemonsData;
    } catch(error) {
        console.log("Error fetching pokemon data:", error);
    }
}


export function Display() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clickedPokemons, setclickedPokemons] = useState([]);
    const [score, setScore]=useState(0);
    const [bestScore, setBestScore]=useState(0);

    useEffect(()=> {
        const loadData = async () => {
            const data = await pokemonsData();
            setPokemons(data);
            setLoading(false);
        };
        loadData();
    }, []);


    
    function clickCard(pokemon) {
        if (clickedPokemons.includes(pokemon)) {
            //game over, refresh score and cards
            if(score>bestScore) {
                setBestScore(score);
            }
            setScore(0);
            setclickedPokemons([]);
        } else {
            //keep play, add score and shuffle cards
            setScore(score+1);
            setclickedPokemons([...clickedPokemons, pokemon]);
            setPokemons(pokemons.sort(()=> Math.random()-0.5));
        }
    }

    if(loading) {
        return (<div>
                    <div className="header">
                            <h1>Memory Card</h1>
                            <p>Score: </p>
                            <p>BestScore:</p>
                        </div>
                    <div>Loading...</div>
        </div>)
        
        
    }

    return (
        <div>
            <div className="header">
                <h1>Memory Card</h1>
                <p>Click the card you have never cliked before.</p>
                <strong>Score: {score}</strong>
                <strong>BestScore: {bestScore}</strong>
            </div>
                           
            <div className="pokemonContainer">
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.name} className="pokemonCard" onClick={()=>clickCard(pokemon)}>
                            <img className="pokemonImg" src={pokemon.imgUrl} alt={pokemon.name} />
                            <h3 className="pokemonName">{pokemon.name}</h3>
                        </div>
                ))}
            </div>
        </div>
    )
}