import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class EventEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({nullable: true})
  @Column()
  title: string;

  @Field()
  @Column("timestamp")
  fromDate!: Date;

  @Field()
  @Column("timestamp")
  toDate!: Date;
}
