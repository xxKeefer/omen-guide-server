import mongoose, {
  Document,
  PassportLocalModel,
  PassportLocalSchema
} from 'mongoose'
import UserInterface from '../interface/user'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    username: String,
    roles: { type: Array, required: true, default: ['user'] }
  },
  { timestamps: true }
) as PassportLocalSchema

interface UserModel<T extends Document> extends PassportLocalModel<T> {}

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

const User: UserModel<UserInterface> = mongoose.model<UserInterface>(
  'User',
  userSchema
)
export default User
