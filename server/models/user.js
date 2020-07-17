'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)

    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'only email!'
        },

        notNull: {
          msg: 'please input email!'
        },

        notEmpty: {
          msg: 'please input email!'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notNull: {

          msg: 'please input password'
        },
        notEmpty: {

          msg: 'please input password'
        },
      }

    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user, option) => {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
      }
    }
  });
  return User;
};