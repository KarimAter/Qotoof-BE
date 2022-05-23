/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import { Response } from 'express';

async function prismaOperation(callback: () => Promise<any>, res: Response) {
  try {
    return res.json(await callback());
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`${error.message}`);
      return res.json(error.message);
    }
    return res.json(error);
  }
}

export default prismaOperation;
