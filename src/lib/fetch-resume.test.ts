import { describe, expect, it } from 'vitest';
import { githubResumeUrl } from './fetch-resume';

describe('githubResumeUrl', () => {
  it('builds raw GitHub special-repo URL', () => {
    expect(githubResumeUrl('alice', 'main')).toBe(
      'https://raw.githubusercontent.com/alice/alice/main/resume.json'
    );
  });

  it('defaults branch to master', () => {
    expect(githubResumeUrl('bob')).toBe(
      'https://raw.githubusercontent.com/bob/bob/master/resume.json'
    );
  });
});
