import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  Field,
  ObjectType,
} from 'type-graphql';
import { User, UserInput, UserLoginInput } from '../models/User';
import validator from 'validator';
import { hash, compare } from 'bcrypt';
import { options } from '../utils/db';
import { IContext } from '../utils/types';
import throwError from '../utils/throwError';
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from '../utils/token';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
  @Field()
  refreshToken!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return `hi! user id is`;
  }

  @Query(() => [User])
  async users() {
    try {
      const users = await User.findAll();
      return users;
    } catch (e) {
      throw Error(e);
    }
  }

  @Mutation(() => User)
  async user(@Arg('id') id: number) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (e) {
      throw Error(e);
    }
  }

  @Mutation(() => User)
  async createUser(@Arg('options', () => UserInput) options: UserInput) {
    try {
      if (!options.firstName.length) throw Error('First name is required');
      if (!options.lastName.length) throw Error('Last name is required');
      if (!options.password.length) throw Error('Password is required');
      if (!options.email.length) throw Error('Email is required');
      // const isEmail = validator.isEmail(options.email);
      // if (!isEmail) throw Error('Email is incorrect');
      await User.sync();
      const hashPass = await hash(options.password, 12);
      const user: User = await User.create({ ...options, password: hashPass });
      return user;
    } catch (e) {
      throw Error(e);
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('options', () => UserLoginInput) options: UserLoginInput,
    @Ctx() { res }: IContext
  ) {
    try {
      if (!options.email.length) throw new Error('Email is required');
      if (!validator.isEmail(options.email))
        throw new Error('Incorrect email address');
      if (!options.password.length) throw new Error('Password is required');

      const user: User | null = await User.findOne({
        where: {
          email: options.email,
        },
      });
      if (!user) {
        return throwError('User does not exist!', 404);
      }
      const isPasswordCorrect = await compare(options.password, user.password);
      if (!isPasswordCorrect) {
        return throwError('Incorrect password', 403);
      }
      console.log(user, 'user');
      sendRefreshToken(res, user);
      return {
        accessToken: createAccessToken(user),
        refreshToken: createRefreshToken(user),
      };
    } catch (e) {
      return e;
    }
  }
}
