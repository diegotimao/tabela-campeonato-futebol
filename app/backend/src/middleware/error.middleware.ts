import { NextFunction, Request, Response } from 'express';
import Exeption from '../utils/exeption';

const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as Exeption;
  res.status(status || 500).json({ message });
};

export default errorMiddleware;
