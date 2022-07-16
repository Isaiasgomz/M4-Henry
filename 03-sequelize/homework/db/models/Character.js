const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      validate: {
        isnotHenry(value){
          if(value.toLowerCase() === 'henry'){
            throw new Error('Not conbination of Henry characters is allowed')
          }
        }
      }
      
    },
    name : {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        notIn: [["Henry", "SoyHenry","Soy Henry"]]
      }
    },
    age:{
      type: DataTypes.INTEGER,
      get(){
        const value = this.getDataValue('age')
        return value ? `${value} years old` : null
      }
    },
    race:{
      type:DataTypes.ENUM(
        'Human',
        'Elf', 
        'Machine',
        'Demon', 
        'Animal',
        'Other'),
      defaultValue: 'Other'
    },
    hp:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    mana:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    date_added:{
      type:DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  },{
    timestamps:false
  })
}