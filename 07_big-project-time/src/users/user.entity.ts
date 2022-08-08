import { ReportEntity } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id: ' + this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id: ' + this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed user with id: ' + this.id);
  }
}
