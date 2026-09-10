import { Body, Controller, Post } from "@nestjs/common";
import { CryptoService } from "./crypto.service";


@Controller('crypto')
export class CryptoController {

    constructor(
        private readonly cryptoService: CryptoService,
    ) {}

    @Post('encrypt')
    encrypt(@Body() body: {key: string}) {
        const encrypted = this.cryptoService.encrypt(body.key);

        return {encrypted};
    }

    @Post('decrypt')
    decrypt(@Body() body: {encrypted: string}){
        const decrypted = this.cryptoService.decrypt(body.encrypted);

        return {
            decrypted,
        }
    }
}