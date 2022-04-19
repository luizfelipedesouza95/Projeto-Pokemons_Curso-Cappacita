const express = require("express")
const app = express()
const DataBase = require("./DataBase/DataBase")
const bodyParser = require("body-parser")
const PORT = 3003;

app.use(bodyParser.urlencoded({ extended: true }))

//SALVAR POKEMONS
app.post('/pokemon', async  (req, res)=>{
     const pokemon = await DataBase.salvarpokemons({
         nome: req.body.nome,
         tipo: req.body.tipo,
         fraqueza: req.body.fraqueza,
         resistencia: req.body.resistencia,
         hp: 100
     });
     res.send(pokemon);
 })

 //MOSTRAR UM POKEMON
app.get("/pokemons/:id", async (req, res) => {
     res.send( await DataBase.mostrarpokemon(req.params.id))
})

//MOSTRAR TODOS POKEMONS
app.get("/pokemons", async  (req, res) => {
     res.send( await DataBase.mostrarpokemons())
})

//ATUALIZAR POKEMONS
app.put('/pokemon/:id',  async (req, res)=>{
     const pokemon =  await DataBase.atualizarpokemon(req.params.id, {
         nome: req.body.nome,
         tipo: req.body.tipo,
         fraqueza: req.body.fraqueza,
         resistencia: req.body.resistencia,
         hp: 100
     });
     res.send(pokemon);
 })

//DELETAR POKEMONS
app.delete("/pokemon/:id", async (req, res) => {
     res.send(await DataBase.deletarPokemon(req.params.id))
})

//BATALHA DE POKEMONS
app.post("/batalha", async (req, res) => {
     res.send( await DataBase.batalhapokemon(req.body.id1, req.body.id2))
})

//CURAR POKEMONS
app.post('/cura/:id', async(req,res) => {
     res.send(await DataBase.curarPokemon(req.params.id))
 })

 app.listen(PORT, ()=>{console.log(`SERVER ON PORT: ${PORT}`)})