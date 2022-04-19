//Conexão com Banco de Dados
const { connectionDataBase } = require('./connection')

//SALVAR UM POKEMON
async function salvarpokemons(pokemon) {
     const InsertPokemon = {
          nome_pokemon: pokemon.nome,
          tipo_pokemon: pokemon.tipo,
          fraqueza_pokemon: pokemon.fraqueza,
          resistencia_pokemon: pokemon.resistencia,
          hp_pokemon: pokemon.hp
     }

     const result = await connectionDataBase(`Banco_Pokemon.Pokemons`).insert(InsertPokemon);

     if (result) {
         return {
               ...pokemon,
             id: result[0]
         }
     } else {
          console.error("Deu erro!")
         return {
             error: "Deu erro na inserção!"
         }
     }
}

//MOSTRAR UM POKEMON
async function mostrarpokemon(id) {
     const result = await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id });/*.select( 'nome_pokemon', 'tipo_pokemon', 'fraqueza_pokemon', 'resistencia_pokemon', 'hp_pokemon','id_pokemon',);*/

     return result[0]
}

//MOSTRAR TODOS POKEMONS
async function mostrarpokemons() {
     const result = await connectionDataBase(`Banco_Pokemon.Pokemons`)
     return result
}

//ATUALIZAR POKEMONS
async function atualizarpokemon(id, pokemon) {
     const  UpDatePokemon = {
          nome_pokemon: pokemon.nome,
          tipo_pokemon: pokemon.tipo,
          fraqueza_pokemon: pokemon.fraqueza,
          resistencia_pokemon: pokemon.resistencia,
          hp_pokemon: pokemon.hp
     }
     const result = await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id }).update(UpDatePokemon);

     if (result) {
         return {
               ...pokemon,
             id
         }
     } else {
          console.error("Deu erro!")
         return {
             error: "Deu erro na inserção!"
         }
     }
}

//DELETAR POKEMONS
async function deletarPokemon(id){
     const result = await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id}).del()
     
     return `Pokemon deletado!`

}

//BATALHA DE POKEMONS
async function batalhapokemon(id1, id2) {

          const pokemon1 =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id1 });
          const pokemon2 =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id2 });
          const  superefetivo = 40
          const efetivo = 20
          const naoefetivo = 10

          if(pokemon1[0].hp_pokemon != 0 && pokemon2[0].hp_pokemon != 0){
               if(pokemon1[0].tipo_pokemon == pokemon2[0].fraqueza_pokemon) {
                    pokemon2[0].hp_pokemon = pokemon2[0].hp_pokemon - superefetivo
               } else if(pokemon1[0].tipo_pokemon == pokemon2[0].resistencia_pokemon){
                    pokemon2[0].hp_pokemon = pokemon2[0].hp_pokemon - naoefetivo
               } else {
                    pokemon2[0].hp_pokemon = pokemon2[0].hp_pokemon - efetivo
               }
          }
          if(pokemon1[0].hp_pokemon != 0 && pokemon2[0].hp_pokemon != 0){
               if(pokemon2[0].tipo_pokemon == pokemon1[0].fraqueza_pokemon) {
                    pokemon1[0].hp_pokemon = pokemon1[0].hp_pokemon - superefetivo
               } else if(pokemon2[0].tipo_pokemon == pokemon1[0].resistencia_pokemon){
                    pokemon1[0].hp_pokemon = pokemon1[0].hp_pokemon - naoefetivo
               } else {
                    pokemon1[0].hp_pokemon = pokemon1[0].hp_pokemon - efetivo
               }
          }

          const batlepokemon1 = {   
                    hp_pokemon: pokemon1[0].hp_pokemon
          }
          const batlepokemon2 = {   
               hp_pokemon: pokemon2[0].hp_pokemon
          }

          const pokemonalterado2 =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id1 }).update(batlepokemon1);
          const pokemonalterado1 =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id2 }).update(batlepokemon2);

          if(pokemon1[0].hp_pokemon < 0) pokemon1[0].hp_pokemon = 0
          if(pokemon2[0].hp_pokemon < 0) pokemon2[0].hp_pokemon = 0

          return `${pokemon1[0].nome_pokemon}: ${pokemon1[0].hp_pokemon} / ${pokemon2[0].nome_pokemon}: ${pokemon2[0].hp_pokemon}`

     }
     
 //CURAR POKEMONS
 async function curarPokemon(id){
     const pokemonferido =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id });
     const pocao = 20
     const msgpokemon = "Curado"

     if(pokemonferido[0].hp_pokemon == 90){
          pokemonferido[0].hp_pokemon +=10
     }
     else if (pokemonferido[0].hp_pokemon < 100) {
          pokemonferido[0].hp_pokemon += pocao
         }

     const pokemoncurado = {
          hp_pokemon: pokemonferido[0].hp_pokemon
     }

     //SALVA POKEMON CURADO
     const pokemon_curado =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id }).update(pokemoncurado);
     
     //BUSCA HP APOS CURA
     const pokemonferido1 =  await connectionDataBase(`Banco_Pokemon.Pokemons`).where({ id_pokemon: id });
     const msgpokemon1 = pokemonferido1[0].hp_pokemon

     return `Pokemon ${pokemonferido[0].nome_pokemon} ${msgpokemon} | Seu HP atual é: ${msgpokemon1}`

 }

module.exports = { salvarpokemons, mostrarpokemon, mostrarpokemons, atualizarpokemon, deletarPokemon, batalhapokemon, curarPokemon}