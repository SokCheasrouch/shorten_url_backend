import { HttpStatus } from '@nestjs/common';
import { ERROR_NAME } from '@app/common';

export abstract class BaseException extends Error {
  constructor(
    public name: string,
    public code: number,
    public message: string,
    public details?: string,
  ) {
    super(message);
    this.name = name;
    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string, details?: string) {
    super(ERROR_NAME.badRequest, HttpStatus.BAD_REQUEST, message, details);
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string, details?: string) {
    super(ERROR_NAME.notFound, HttpStatus.NOT_FOUND, message, details);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string, details?: string) {
    super(ERROR_NAME.unauthorized, HttpStatus.UNAUTHORIZED, message, details);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string, details?: string) {
    super(ERROR_NAME.forbidden, HttpStatus.FORBIDDEN, message, details);
  }
}

export class BusinessException extends BaseException {
  constructor(code: number, message: string, details?: string) {
    super(ERROR_NAME.businessError, code, message, details);
  }
}
