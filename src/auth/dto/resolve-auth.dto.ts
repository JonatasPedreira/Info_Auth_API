import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class ResolveAuthDto {
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    key: string;
}