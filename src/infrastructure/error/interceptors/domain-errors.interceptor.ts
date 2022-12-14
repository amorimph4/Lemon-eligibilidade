import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { DomainException } from '@domain/exception/domain.exception';

@Injectable()
export class DomainErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof DomainException) {
          throw new BadRequestException(error.message);
        }
        throw error;
      }),
    );
  }
}
