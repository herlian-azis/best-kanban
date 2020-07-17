'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)

    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          args:true,
          msg: 'please input title'
        },
        notEmpty: {
          msg: 'please input title'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'please input category'
        },
        notEmpty: {
          msg: 'please input category'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'please input description'
        },
        notEmpty: {
          msg: 'please input description'
        }
      }
    },
    UserId:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};