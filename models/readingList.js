const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: { model: 'users', key: 'id' }
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: { model: 'blogs', key: 'id' }
  },
  read: {
    type: DataTypes.BOOLEAN,
    default: false,
  },  
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readingList'
})

module.exports = ReadingList