import { describe, expect, it } from 'vitest';
import { parseQuery } from './query';

describe('parseQuery', () => {
  it('reads share data and ignores legacy remote-loading parameters', () => {
    const q = parseQuery(
      '?user=alice&branch=main&mode=edit&data=abc&url=https%3A%2F%2Fexample.com%2Fr.json&lang=en-US&template=template1'
    );
    expect(q).toEqual({
      mode: 'edit',
      data: 'abc',
    });
  });

  it('defaults to edit mode', () => {
    const q = parseQuery('?user=bob');
    expect(q).toEqual({ mode: 'edit' });
  });

  it('opens share links in read mode', () => {
    expect(parseQuery('?data=abc')).toEqual({ mode: 'read', data: 'abc' });
    expect(parseQuery('?data=abc&mode=edit')).toEqual({
      mode: 'edit',
      data: 'abc',
    });
  });
});
