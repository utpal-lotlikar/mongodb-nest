import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpHeaderMiddleware implements NestMiddleware {
  use(req /*: Request */, res: Response, next: NextFunction) {
    const generateRandomString = function(length=6){
        return Math.random().toString(20).substr(2, length)
    }
    const currentDate = new Date(); 
    let requestId = generateRandomString(12);
    res.header("X-RequestId", requestId);
    res.header("X-Timestamp", currentDate.toISOString());
    req.RequestId = requestId; // request type is commented out otherwise typescript won't allow setting this
    next();
  }
}