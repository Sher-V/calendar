import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class MeetingType {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  hour: number;
  @Field()
  title: string;
}

export type DayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type MeetingsWeekType = MeetingType[][];
