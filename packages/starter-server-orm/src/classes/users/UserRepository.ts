import { Repository, Connection } from 'typeorm'
import { injectable } from 'inversify'
import { User } from '../../entities'
import { IUserRepository } from './interfaces'

@injectable()
export class UserRepository implements IUserRepository {

  public repo: Repository<User>

  constructor (
    private connection: Connection
  ) {
    this.repo = this.connection.getRepository(User)
  }

  browseByUuid (uuid: string): Promise<User> {
    return this.repo.findOneOrFail({
      where: {
        uuid: uuid
      }
    })
  }

  browseByEmail (email: string): Promise<User> {
    return this.repo.findOneOrFail({
      where: {
        email: email
      }
    })
  }
}
