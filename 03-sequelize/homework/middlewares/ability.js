const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/' , async (req,res) =>{
   const  {name, mana_cost} = req.body
    if(!name || ! mana_cost) return res.status(404).json("Falta enviar datos obligatorios") 
    try {
        const newAbillity = await Ability.create(req.body)
        res.status(201).json(newAbillity)
    } catch (error) {
        console.log(error)
    }

})

router.put('/setCharacteer', async (req,res) =>{
    const {idAbility, codeCharacter} =req.body

    try {
        const find = await Ability.findByPk(idAbility)
        if(find){
            const update = await find.setCharacter(codeCharacter)

            res.json(update)
        }else{
            res.status(404).json({error: 'no se encontro al objeto Ability' })
        }
         
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;