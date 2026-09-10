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

    encrypt(text: string): string {

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
    }

    decrypt(encryptedText: string): string {

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
    }

    encryptData(
        id: number,
        key: string,
    ) {

        const data = `${id}:${key}`;

        return this.encrypt(data);
    }
}