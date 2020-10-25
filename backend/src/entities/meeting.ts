import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";
import { DayOfWeekType } from "../types";

@Entity()
@ObjectType()
export class MeetingEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => Int)
  @Column()
  hour!: number;

  @Field(() => Int)
  @Column()
  day!: DayOfWeekType;
}
