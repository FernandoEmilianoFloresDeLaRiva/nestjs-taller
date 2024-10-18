import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new Logger();
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse();
    const err = exception.message ?? {};

    this.logger.error(`${exception.message} Error: ${exception.getStatus()}`);

    if (err.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: err.toString(),
      });
    }

    if (typeof err === 'string' && 'status' in response) {
      const status =
        typeof exception.getStatus() === 'number' ? exception.getStatus() : 400;
      return response.status(status).json({
        status,
        message: err,
      });
    }
    return response.status(400).json({
      status: 400,
      message: err,
    });
  }
}
