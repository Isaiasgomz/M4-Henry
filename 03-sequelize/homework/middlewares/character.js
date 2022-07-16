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
    const {race, age } = req.query
    let CharacterFiltered;
    try {
        if(race || age){
           CharacterFiltered = await Character.findAll({
                where:{
                    race,
                    age,
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





router.get('/young', async (req,res) =>{
    try {
        const find = await Character.findAll({
            where:{
                age:{ [Op.lt]: 25}
            }
        })
        res.json(find)
    } catch (error) {
       console.log(error) 
    }
})

router.get('/roles/:code' ,async (req,res)=>{
    const {code} = req.params
    try {
        const find =  Character.findByPk(code, {
           inlcude: Role
        })
        if(find) {
            res.json(find)
        }
    } catch (error) {
        console.log(error)
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


router.put('/addAbilities', async (req,res) =>{
    const {codeCharacter, abilities} = req.body
    try {
        const find = await Character.findByPk(codeCharacter)
        if(find){
            const arrayPromises = abilities.map(abilitie => Character.createAblity(abilitie))
            await Promise.all(arrayPromises)
            res.json('done')
        }
        
    } catch (error) {
        console.log(error)
    }
})


router.put('/:attribute', async (req,res)=>{
    try {
        const {attribute} = req.params
        const {value} = req.query
        await Character.update({[attribute]: value}, {where:{
            [attribute]: null
        }})
        res.json('Personajes actualizados')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;