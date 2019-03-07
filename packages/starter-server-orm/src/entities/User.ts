import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  @Generated('uuid')
  uuid: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  mobile: string

  @Column('timestamp with time zone', { default: () => 'NOW()' })
  createdAt: Date

}
