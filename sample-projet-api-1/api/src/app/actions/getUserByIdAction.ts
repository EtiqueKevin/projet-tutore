import { Request, Response } from 'express';

export const getUserByIdAction = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};