import { Repository } from 'typeorm'

import { User } from '../../entities'

export interface IUserFactory {
  makeUser (data: ICreateUserRequest): Promise<User>
}

export interface ICreateUserRequest {
  firstName: string
  lastName: string
  email: string
}

export interface IUserRepository {
  repo: Repository<User>
  browseByUuid (uuid: string): Promise<User>
  browseByEmail (email: string): Promise<User>
}

export interface IUserSerialised {
  uuid: string,
  firstName: string
  lastName: string
  email: string
}

