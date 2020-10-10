import { MinLength } from 'class-validator';

export class CreateNewRoleDto {
    @MinLength(2)
    role_name: string;

    @MinLength(2)
    role_code: string;

    @MinLength(5)
    role_description: string;
}
