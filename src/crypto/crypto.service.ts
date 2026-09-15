import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class CryptoService {
    private readonly algorithm = 'aes-256-cbc';

    private readonly key = Buffer.from(
        process.env.ENCRYPTION_KEY!,
        'hex',
    );

    private readonly iv = Buffer.from(
        process.env.ENCRYPTION_IV!,
        'hex'
    );

    encrypt(text: any): any {
        try {
            const cipher = crypto.createCipheriv(
                this.algorithm,
                this.key,
                this.iv
            );

            let encrypted = cipher.update(
                text,
                'utf8',
                'base64'
            );

            encrypted += cipher.final('base64');

            return encrypted;
        } catch (error){
            return error
        }
    }

    decrypt(encryptedText: any): any {
        try {
            const decipher = crypto.createDecipheriv(
                this.algorithm,
                this.key,
                this.iv
            );

            let decrypted = decipher.update(
                encryptedText,
                'base64',
                'utf8'
            );

            decrypted = decipher.final('utf8');

            return decrypted;
        } catch (error){
            return error
        }
    }

    encryptData(
        id: number,
        key: string,
    ) {

        const data = `${id}:${key}`;

        return this.encrypt(data);
    }
}