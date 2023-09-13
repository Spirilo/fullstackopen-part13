const Blog = require('./blog')
const ReadingList = require('./readingList')
const User = require('./user')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersMarked' })

Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingList
}