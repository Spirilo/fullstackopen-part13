const Blog = require('./blog')
const ReadingList = require('./readingList')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersMarked' })

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

module.exports = {
  Blog,
  User,
  ReadingList
}