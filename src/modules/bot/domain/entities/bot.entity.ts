export class Bot {
  question: string;
  answer: string;
  createdAt: Date;

  constructor(question: string, answer: string, createdAt: Date) {
    this.question = question;
    this.answer = answer;
    this.createdAt = createdAt;
  }

  static create(question: string, answer: string) {
    return new Bot(question, answer, new Date());
  }
}
