// DOM objects
const namePokemon = document.querySelector('.pokemonName');
const numberPokemon = document.querySelector('.pokemonNumber');
const typePokemonOne = document.querySelector('.pokeTypeOne');
const psPokemon = document.querySelector('.pokePs');
const atkPokemon = document.querySelector('.pokeAtk');
const defPokemon = document.querySelector('.pokeDef');
const spAtkPokemon = document.querySelector('.pokeSpAtk');
const spDefPokemon = document.querySelector('.pokeSpDef');
const SpeedPokemon = document.querySelector('.pokeSpeed');
const movePokemon = document.querySelectorAll('.move');

// Se declara funcion fetchPokemon para buscar pokemon mediante la url
const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    
    // Busqueda y promesa(then) para url con el nombnre del pokemon(const url)
    fetch(url).then((res) => {
        // se mete condicion if por si no encuentra el pokemon
        if(res.status != "200"){
            console.log(res)
            pokeImage("css/imagenes/sadpikachu.gif");
            namePokemon.textContent = "Pokemon no encontrado"
            numberPokemon.textContent = ":("
            typePokemonOne.textContent = "None"
            psPokemon.textContent = ""
            atkPokemon.textContent = ""
            defPokemon.textContent = ""
            spAtkPokemon.textContent = ""
            spDefPokemon.textContent = ""
            SpeedPokemon.textContent = ""
            listMoves.textContent = "No information"
        }
        else{
            return res.json();
        }
    // Se manda a llamar data despues de que la primer promeza respondio
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        console.log(pokeImg);
        // Se manda a llamar a la funcion PokeImage y se le pone el valor de pokeImg
        pokeImage(pokeImg);
        namePokemon.textContent = data.name;
        numberPokemon.textContent = "#" + data.id;
        // Condicional, si tiene dos tipos muestre dos, si tiene uno que solo muestre uno
        if(data.types == 2){
            typePokemonOne.textContent = `Type: ${data.types[0]['type']['name']}, ${data.types[1]['type']['name']}`;
        }
        else{
            typePokemonOne.textContent = `Type: ${data.types[0]['type']['name']}`;
        }
        
        psPokemon.textContent = `${data.stats[0]['base_stat']} Hp`;
        atkPokemon.textContent = `${data.stats[1]['base_stat']} Atk`;
        defPokemon.textContent = `${data.stats[2]['base_stat']} Def`;
        spAtkPokemon.textContent = `${data.stats[3]['base_stat']} SpAtk`;
        spDefPokemon.textContent = `${data.stats[4]['base_stat']} SpDef`;
        SpeedPokemon.textContent = `${data.stats[5]['base_stat']} Speed`;
        // Se crea un bucle que cuente solo hasta el numero de movePokemon que tengamos en el html
        for(let i=0; i < movePokemon.length; i++ ){
            const listMoves = movePokemon[i];
            const resultData = data.moves[i];
            const name  = resultData['move']['name'];

            if (resultData) {
                listMoves.textContent = name;
            }
        }

    })
}

// Se declara funcion pokeImage
const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    // pokeImg.src = url cambiara el valor de const url de arriba
    pokeImg.src = url;

}