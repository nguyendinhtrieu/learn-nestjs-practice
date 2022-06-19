import { MessageRepository } from './message.repository';

export class MessageService {
  messageRepository: MessageRepository;
  constructor() {
    this.messageRepository = new MessageRepository();
  }

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
