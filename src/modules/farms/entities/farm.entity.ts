import { User } from "modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Farm {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column({ type: "double precision" })
  public lat: number;

  @Column({ type: "double precision" })
  public long: number;

  @Column({ unique: true })
  public owner: string;

  @Column({ type: "double precision"})
  public size: number;

  @Column({ type: "double precision"})
  public yield: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => User, user => user.farms) 
  public user: User; 
}
