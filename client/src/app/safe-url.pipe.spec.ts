import { SafeURLPipe } from './safe-html.pipe';

describe('SafeURLPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeURLPipe();
    expect(pipe).toBeTruthy();
  });
});
