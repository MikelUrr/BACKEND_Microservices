import { Module } from '@nestjs/common';
import { EmailController } from './email/email.controller';
import { PushController } from './push/push.controller';
import { SmsController } from './sms/sms.controller';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { TelegramController } from './telegram/telegram.controller';
import { EmailService } from './email/email.service';
import { PushService } from './push/push.service';
import { SmsService } from './sms/sms.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { TelegramService } from './telegram/telegram.service';

@Module({
  controllers: [EmailController, PushController, SmsController, WhatsappController, TelegramController],
  providers: [EmailService, PushService, SmsService, WhatsappService, TelegramService]
})
export class NotificationsModule {}
