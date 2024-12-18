import UserDTO from '../dto/UserDTO';

export default class UserService {
    public getUserById(id: string): UserDTO {
        
        return new UserDTO(id, 'John Doe');
    }
}