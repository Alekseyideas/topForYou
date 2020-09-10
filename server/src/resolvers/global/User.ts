import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  Field,
  ObjectType,
  UseMiddleware,
} from 'type-graphql';
import { verify } from 'jsonwebtoken';
import validator from 'validator';

import { User, UserInput, UserLoginInput } from '../../models/User';
import { hash, compare } from 'bcrypt';
import { options } from '../../utils/db';
import { IContext } from '../../utils/types';
import throwError from '../../utils/throwError';
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from '../../utils/token';
import { isAuth } from '../../utils/isAuth';
import { MyContext } from '../../utils/MyContext';
import { errorObj } from '../../utils/errorObj';
import { returnObj } from '../../utils/returnObj';

@ObjectType()
class ErrorField {
  @Field()
  field!: string;
  @Field()
  message!: string;
}

@ObjectType()
class LoginData {
  @Field()
  accessToken!: string;
  @Field()
  refreshToken!: string;
  @Field()
  user!: User;
}

@ObjectType()
class LoginResponse {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
  @Field()
  success!: boolean;
  @Field(() => LoginData, { nullable: true })
  data!: LoginData;
}

@ObjectType()
class RemoveUserResp {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
  @Field()
  success!: boolean;
}
@ObjectType()
class UserResp {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
  @Field()
  success!: boolean;
  @Field(() => User, { nullable: true })
  data!: User;
}
@ObjectType()
class UsersResp {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
  @Field()
  success!: boolean;
  @Field(() => [User], { nullable: true })
  data!: User[];
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return `hi! user id is`;
  }

  @Query(() => UsersResp)
  @UseMiddleware(isAuth)
  async users(): Promise<UsersResp> {
    try {
      const users = await User.findAll();
      return {
        success: true,
        data: users,
      };
    } catch (e) {
      return {
        ...errorObj({ errors: [{ field: 'Some error', message: e.message }] }),
        data: [],
      };
    }
  }

  @Query(() => UserResp, { nullable: true })
  @UseMiddleware(isAuth)
  async user(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];
    console.log('authorization: ', authorization);
    if (!authorization) {
      return returnObj({
        success: false,
        data: null,
        errors: [
          {
            field: 'Authentication error',
            message: 'not authenticated',
          },
        ],
      });
    }

    try {
      if (context.payload?.userId) {
        const user = User.findByPk(context.payload.userId);
        return returnObj({
          data: user,
          success: true,
        });
      }
      return returnObj({
        success: false,
        data: null,
        errors: [
          {
            field: 'Authentication error',
            message: 'Context error, bad token',
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return returnObj({
        success: false,
        data: null,
        errors: [
          {
            field: 'Authentication error',
            message: err.message,
          },
        ],
      });
    }
  }

  @Mutation(() => UserResp)
  @UseMiddleware(isAuth)
  async createUser(
    @Arg('options', () => UserInput) options: UserInput,
    @Ctx() context: MyContext
  ) {
    if (context.payload?.userRole !== 1) {
      return returnObj({
        errors: [
          {
            field: 'Create',
            message: 'Does not have permissions',
          },
        ],
      });
    }

    try {
      if (!options.firstName.length) {
        return {
          errors: [
            {
              field: 'Name',
              message: 'Is required',
            },
          ],
        };
      }
      if (!options.lastName.length) {
        return returnObj({
          errors: [
            {
              field: 'Last name',
              message: 'Is required',
            },
          ],
        });
      }
      if (!options.password.length) {
        return returnObj({
          errors: [
            {
              field: 'Password',
              message: 'Is required',
            },
          ],
        });
      }
      if (!options.email.length) {
        return returnObj({
          errors: [
            {
              field: 'Email',
              message: 'Is required',
            },
          ],
        });
      }
      const isEmail = validator.isEmail(options.email);
      if (!isEmail) {
        return errorObj({
          errors: [
            {
              field: 'Email',
              message: 'Email is incorrect',
            },
          ],
        });
      }
      await User.sync();
      const hashPass = await hash(options.password, 12);
      const user: User = await User.create({ ...options, password: hashPass });
      return {
        success: true,
        user,
      };
    } catch (e) {
      return {
        success: false,
        errors: [
          {
            field: 'Some error',
            message: e.message,
          },
        ],
      };
    }
  }
  @Mutation(() => RemoveUserResp)
  @UseMiddleware(isAuth)
  async removeUser(@Arg('id') id: number): Promise<RemoveUserResp> {
    if (!id)
      return {
        success: false,
        errors: [
          {
            field: 'id',
            message: 'id is required',
          },
        ],
      };
    try {
      await User.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      return {
        success: false,
        errors: [
          {
            field: 'Some error',
            message: e.message,
          },
        ],
      };
    }

    return {
      success: true,
    };
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg('options', () => UserLoginInput) options: UserLoginInput,
    @Ctx() { res }: IContext
  ) {
    try {
      console.log(options, 'options');
      if (!options.email.length) {
        return returnObj({
          errors: [
            {
              field: 'Email',
              message: 'Email is required',
            },
          ],
        });
      }
      if (!validator.isEmail(options.email)) {
        return returnObj({
          errors: [
            {
              field: 'Email',
              message: 'Incorrect email address',
            },
          ],
        });
      }
      if (!options.password.length) {
        return returnObj({
          errors: [
            {
              field: 'Password',
              message: 'Password is required',
            },
          ],
        });
      }

      const user: User | null = await User.findOne({
        where: {
          email: options.email,
        },
      });
      if (!user) {
        return returnObj({
          errors: [
            {
              field: 'User',
              message: 'User does not exist!',
            },
          ],
        });
      }
      const isPasswordCorrect = await compare(options.password, user.password);
      if (!isPasswordCorrect) {
        return returnObj({
          errors: [
            {
              field: 'User',
              message: 'Incorrect password',
            },
          ],
        });
      }
      sendRefreshToken(res, user);
      return returnObj({
        data: {
          accessToken: createAccessToken(user),
          refreshToken: createRefreshToken(user),
          user,
        },
      });
    } catch (e) {
      return e;
    }
  }
}
