import { getReasonPhrase, StatusCodes } from 'http-status-codes'
export class NetworkError extends Error {
  statusCode: number
  constructor(statusCode: number) {
    super(getReasonPhrase(statusCode))
    this.statusCode = statusCode
  }
}

export class NotFoundException extends NetworkError {
  constructor() {
    super(StatusCodes.NOT_FOUND)
  }
}

export class UnauthorizedException extends NetworkError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED)
  }
}

export class BadRequestException extends NetworkError {
  constructor() {
    super(StatusCodes.BAD_REQUEST)
  }
}
