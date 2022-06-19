import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(public messageRepository: MessageRepository) {}

  findAll() {
    return this.messageRepository.findAll();
  }

  findOne(id: string) {
    return this.messageRepository.findOne(id);
  }

  createOne(message: string) {
    return this.messageRepository.createOne(message);
  }
}
