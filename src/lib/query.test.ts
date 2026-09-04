import { describe, expect, it } from 'vitest';
import { parseQuery } from './query';

describe('parseQuery', () => {
  it('reads user, branch, mode, data, url and ignores lang/template', () => {
    const q = parseQuery(
      '?user=alice&branch=main&mode=edit&data=abc&url=https%3A%2F%2Fexample.com%2Fr.json&lang=en-US&template=template1'
    );
    expect(q).toEqual({
      user: 'alice',
      branch: 'main',
      mode: 'edit',
      data: 'abc',
      url: 'https://example.com/r.json',
    });
  });

  it('defaults mode to read and branch to master when absent', () => {
    const q = parseQuery('?user=bob');
    expect(q.mode).toBe('read');
    expect(q.branch).toBe('master');
    expect(q.user).toBe('bob');
  });
});
