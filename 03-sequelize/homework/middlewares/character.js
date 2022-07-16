const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req,res)=>{
    const {code,name, hp ,mana} = req.body
    if(!code || ! name || !hp || !mana) {
        res.status(404).json("Falta enviar datos obligatorios")
    }
    try {
        const newCharacter =  await Character.create(req.body)
        res.status(201).json(newCharacter)
    } catch (error) {
        res.status(404).json("Error en alguno de los datos provistos")   
    }
})


router.get('/', async (req,res) =>{
    const {race} = req.query
    let CharacterFiltered;
    try {
        if(race){
           CharacterFiltered = await Character.findAll({
                where:{
                    race,
                }
            })
            
        }else{
             CharacterFiltered = await Character.findAll()
        }

        res.json(CharacterFiltered)
    } catch (error) {
        res.json(`hubo un error : ${error}`)
    }
})


router.get('/:code', async (req,res) =>{
    const {code} =req.params
    try {
        const findCharacter = await Character.findByPk(code)
        if(findCharacter){
            res.json(findCharacter)
        }else{
            res.status(404).json(`El código ${code} no corresponde a un personaje existente}`)
        }
    } catch (error) {
        res.status(404).json(`Hubo un error: ${error}`)
    }
})

module.exports = router;