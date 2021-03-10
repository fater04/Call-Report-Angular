import { Utilisateur } from './utilisateur.model';

describe('Utilisateur', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Utilisateur()).toBeTruthy();
  });
});
