
import { describe, expect, it } from 'vitest';
import { resolveTicketId } from '../src/services/ticketParser';

describe('resolveTicketId', () => {
  it('returns the exact matching ticket ID', () => {
    const registry = new Map([
      ['TICKET001', { ticketId: 'TICKET001' }],
      ['TICKET1001', { ticketId: 'TICKET1001' }],
    ]);

    const result = resolveTicketId(
      {
        ticketId: 'TICKET001',
        rawText: 'TICKET001',
        confidence: 'medium',
      },
      registry,
    );

    expect(result).toBe('TICKET001');
  });

  it('does not guess when multiple tickets share the same suffix', () => {
    const registry = new Map([
      ['TICKET001', { ticketId: 'TICKET001' }],
      ['TICKET1001', { ticketId: 'TICKET1001' }],
    ]);

    const result = resolveTicketId(
      {
        ticketId: 'UNKNOWN001',
        rawText: 'UNKNOWN001',
        confidence: 'medium',
      },
      registry,
    );

    expect(result).toBeUndefined();
  });
});
