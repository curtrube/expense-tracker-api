import type { Request, Response } from 'express';

const getUser = (req: Response, res: Request) => {
  res.status(200).json({ msg: 'Hello Users' });
};

const getUserById = async () => {};

export default { getUser, getUserById };
