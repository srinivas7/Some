import { PscUniqueIdentifierPipe } from './psc-unique-identifier.pipe';

describe('PscUniqueIdentifierPipe', () => {
  it('create an instance', () => {
    const pipe = new PscUniqueIdentifierPipe();
    expect(pipe).toBeTruthy();
  });
});
