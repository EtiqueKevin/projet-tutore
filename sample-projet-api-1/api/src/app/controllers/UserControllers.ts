import { Request, Response } from 'express';
import UserService  from '../../core/services/UserService';
import UserDTO from '../../core/dto/UserDTO';

const userService = new UserService();

export const getUserByIdAction = async (req: Request, res: Response): Promise<void> => {
    try {
        const idUser: string  = req.params.id;
        const user: UserDTO = userService.getUserById(idUser);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

export const getAllUserAction = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Retrieved all users aaaa' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};