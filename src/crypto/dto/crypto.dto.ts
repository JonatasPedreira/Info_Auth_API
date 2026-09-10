import { IsNotEmpty, IsString } from "class-validator";


export class CryptoDTO {

    @IsString()
    @IsNotEmpty()
    key: string;
}