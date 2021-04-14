import bcrypt from 'bcrypt'
import User from '../models/user'

const intialiseSuperUser = async () => {
  const hashedPassword = bcrypt.hashSync(process.env.SUPER_SECRET, 10)
  const superAccount = {
    username: 'super@super.com',
    password: hashedPassword,
    roles: ['user', 'admin', 'super']
  }
  const superExists = await User.findOne({ username: superAccount.username })
  if (!superExists) {
    await User.create(superAccount)
    if (process.env.NODE_ENV !== 'test')
      console.log('SUPER :: Account created.')
  } else if (process.env.NODE_ENV !== 'test') {
    console.log('SUPER :: Account exists.')
  }
}

export default intialiseSuperUser
