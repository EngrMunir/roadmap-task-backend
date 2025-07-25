import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../app/config';
import { IUser, UserModel } from './user.interface';
import { USER_ROLE } from './user.constant';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: [USER_ROLE.user, USER_ROLE.admin],
      default: USER_ROLE.user,
    },
  },
  {
    timestamps: true,
  },
);

// use hook to hash password before saving user
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password before saving
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// use hook to empty password before sending response
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// find user by using email
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

// Check if password is correct or not
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
