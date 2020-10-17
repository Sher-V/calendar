import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EventEntity } from "../entities/event";

@Resolver()
export class Event {
  @Query(() => [EventEntity])
  events(): Promise<EventEntity[]> {
    return EventEntity.find();
  }

  @Mutation(() => Boolean)
  async createEvent(
    @Arg("fromDate") fromDate: Date,
    @Arg("toDate") toDate: Date,
    @Arg("title", { nullable: true }) title?: string
  ): Promise<boolean> {
    try {
      await EventEntity.create({
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
    const event = await EventEntity.findOne(id);

    if (!event) return false;

    event.title = title || event.title;
    event.fromDate = fromDate || event.fromDate;
    event.toDate = toDate || event.toDate;

    await event.save();

    return true;
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg("id") id: number): Promise<boolean> {
    try {
      const event = await EventEntity.findOne(id);
      if (event) await event.remove();
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
}
