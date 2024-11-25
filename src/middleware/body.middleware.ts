import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { AnyZodObject } from 'zod';

export function body(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        body: req.body,
      });
      if (!result.success) {
        return res.status(400).json(result.error.errors);
      }
      return next();
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error`, details: err });
    }
  };
}
