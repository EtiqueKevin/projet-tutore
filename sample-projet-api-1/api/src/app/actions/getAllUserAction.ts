import { Request, Response } from 'express';

export const getAllUserAction = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Retrieved all users' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};