export class WrongTaskStatusException extends Error {
  constructor() {
    super('Wrong task status Transition');
    this.name = 'WrongTaskStatusException';
  }
}
