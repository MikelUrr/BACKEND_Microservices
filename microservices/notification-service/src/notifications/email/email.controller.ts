import { Controller,Post,Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post()
    async sendEmail(@Body() body: { email: string; subject: string; text: string }) {
        return this.emailService.sendEmail(body.email, body.subject, body.text);
    }
}
