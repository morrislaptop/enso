import { User } from '../../entities'
import { IUserSerialised } from './interfaces'

export const serialiseUserReponse = function(user: User): IUserSerialised {
  return {
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }
}
