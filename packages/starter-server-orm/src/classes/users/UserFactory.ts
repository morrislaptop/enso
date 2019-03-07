import { injectable } from 'inversify'
import { Connection } from 'typeorm'

import { User } from '../../entities'
import { RegisterUserRequest } from './requests'
import { IUserFactory } from './interfaces'

@injectable()
export class UserFactory implements IUserFactory {

  constructor (
    private connection: Connection
  ) {}

  async makeUser (data: RegisterUserRequest): Promise<User> {
    // Wrap in a transaction
    return this.connection.transaction(async manager => {
      // Create the User record
      const user = new User()
      user.firstName = data.firstName
      user.lastName = data.lastName
      user.email = data.email
      return manager.save(user)
    })
  }
}
