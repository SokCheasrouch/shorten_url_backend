import { Response } from 'express';
import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { BaseException, ERROR_MESSAGE, ERROR_NAME } from '@app/common';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let code: number, key: string, message: string, details: string;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseException) {
      code = exception.code;
      key = exception.name;
      message = exception.message;
      details = exception.details;
    } else if (exception instanceof HttpException) {
      const reqErrorMsg = exception.getResponse()['message'];
      const messages = Array.isArray(reqErrorMsg)
        ? [...(reqErrorMsg || '')]
        : [reqErrorMsg];
      code = exception.getStatus();
      key = exception.name;
      message = messages[0];
      details = messages.join(',');
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      key = ERROR_NAME.internalServerError;
      message = ERROR_MESSAGE.internalServerError;
    }

    Logger.log(
      `Http Status: ${code} Error Message: ${exception.message}, Trace: ${exception.stack}`,
    );

    response.status(code).json({
      code: code,
      key: key,
      message: message,
      details: details,
    });
  }
}
