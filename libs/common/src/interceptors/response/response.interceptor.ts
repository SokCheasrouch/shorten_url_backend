import { BaseResponse, SUCCESS_MESSAGE } from '@app/common';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: HttpStatus.OK,
        key: SUCCESS_MESSAGE.success,
        message: SUCCESS_MESSAGE.success,
        data,
      })),
    );
  }
}
