import { Injectable } from '@nestjs/common';
import { MessageFormatterService } from 'src/message-formatter/message-formatter.service';

@Injectable()
export class LoggerService {
    constructor(private readonly messageFormatter: MessageFormatterService) { }
    log() {
        console.log(`log ${this.messageFormatter.format("message")}`)
        return `log ${this.messageFormatter.format("message")}`
    }
}
