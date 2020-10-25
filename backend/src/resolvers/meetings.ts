import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { MeetingEntity } from "../entities/meeting";
import { DayOfWeekType, MeetingsWeekType, MeetingType } from "../types";

@Resolver()
export class Meeting {
  @Query(() => [[MeetingType]])
  async meetings(): Promise<MeetingType[][]> {
    const meetings = await MeetingEntity.find();

    return meetings.reduce((acc, { hour, title, day, id }) => {
      acc[day] = acc[day]
        ? [...acc[day], { hour, title, id }]
        : [{ hour, title, id }];
      return acc;
    }, Array(7).fill([]) as MeetingsWeekType);
  }

  @Mutation(() => Boolean)
  async saveMeeting(
    @Arg("hour", () => Int) hour: number,
    @Arg("day", () => Int) day: DayOfWeekType,
    @Arg("title") title: string,
    @Arg("id", () => Int, { nullable: true }) id?: number
  ): Promise<boolean> {
    try {
      if (id) {
        const meeting = await MeetingEntity.findOne(id);

        if (!meeting) return false;

        meeting.day = day;
        meeting.title = title;
        meeting.hour = hour;

        await meeting.save();
      } else {
        await MeetingEntity.create({
          title,
          day,
          hour,
        }).save();
      }
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  /*@Mutation(() => Boolean)
    async createEvent(
        @Arg("fromDate") fromDate: Date,
        @Arg("toDate") toDate: Date,
        @Arg("title", { nullable: true }) title?: string
    ): Promise<boolean> {
        try {
            await MeetingEntity.create({
                title,
                fromDate,
                toDate,
            }).save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    async editEvent(
        @Arg("id") id: string,
        @Arg("title", { nullable: true }) title?: string,
        @Arg("fromDate", { nullable: true }) fromDate?: Date,
        @Arg("toDate", { nullable: true }) toDate?: Date
    ): Promise<boolean> {
        const event = await MeetingEntity.findOne(id);

        if (!event) return false;

        event.title = title || event.title;
        event.fromDate = fromDate || event.fromDate;
        event.toDate = toDate || event.toDate;

        await event.save();

        return true;
    }*/

  @Mutation(() => Boolean)
  async deleteMeeting(@Arg("id",  () => Int) id: number): Promise<boolean> {
    try {
      const meeting = await MeetingEntity.findOne(id);
      if (meeting) await meeting.remove();
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
}
