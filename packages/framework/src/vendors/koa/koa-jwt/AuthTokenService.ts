import { inject, injectable } from 'inversify'
import jwt from 'jsonwebtoken'

import { $b } from '../../bindings'
import { EnvironmentConfig } from '../../interfaces'
import { User } from '../../models'

@injectable()
export class AuthTokenService {
  constructor(@inject($b.Environment) private env: EnvironmentConfig) {}

  public generateToken(data: User): string {
    let claims: AuthTokenClaims = {
      role: 'user',
      userUuid: data.uuid
    }
    return jwt.sign(claims, this.env.JWT_SECRET)
  }
}
