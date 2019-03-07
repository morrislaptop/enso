import { IsNotEmpty } from 'class-validator'
import { ICreateUserRequest } from './interfaces'

export class RegisterUserRequest implements ICreateUserRequest {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  email: string
}
