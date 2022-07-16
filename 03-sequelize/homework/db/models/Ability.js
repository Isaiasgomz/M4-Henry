const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:'compositeKey',
      
    },
    description:{
      type:DataTypes.TEXT
    },
    mana_cost:{
      type:DataTypes.FLOAT,
      allowNull:false,
      unique:'compositeKey',
      validate : {
        min: 10,
        max:250      }
    },
    sumary:{ 
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${Math.round(this.mana_cost)} points of mana) - Description ${this.description}`
      }
    }
  })
}