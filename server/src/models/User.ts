import {
  Table,
  Column,
  Model,
  AutoIncrement,
  UpdatedAt,
  PrimaryKey,
  CreatedAt,
  DataType,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { Field, Int, InputType, ObjectType } from 'type-graphql';

@InputType()
export class UserLoginInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@InputType()
export class UserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => Int)
  role!: number;
}

@ObjectType()
@Table
export class User extends Model<User> {
  @Field(() => Int)
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @Field()
  @AllowNull(false)
  @Column(DataType.TEXT)
  public firstName!: string;

  @Field()
  @AllowNull(false)
  @Column(DataType.TEXT)
  public lastName!: string;

  @Field()
  @AllowNull(false)
  @Column(DataType.TEXT)
  public email!: string;

  @Field(() => Int)
  @AllowNull(false)
  @Column
  public role!: number;

  @Field()
  @AllowNull(false)
  @Column(DataType.TEXT)
  public password!: string;

  @Field()
  @CreatedAt
  @Column
  public readonly createdAt!: Date;

  @Field()
  @UpdatedAt
  @Column
  public readonly updatedAt!: Date;

  @Default(0)
  @Column(DataType.INTEGER)
  public tokenVersion!: number;
}
