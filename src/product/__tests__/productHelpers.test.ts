import { describe, it, expect } from 'vitest';
import { normalizeTitle, normalizePrice, formatPrice } from '../product.helpers';

describe('normalizeTitle', () => {
    it('decodes HTML entities', () => {
      expect(normalizeTitle('Tom &amp; Jerry')).toBe('Tom & Jerry');
    });
  
    it('replaces semicolons with commas and spaces', () => {
      expect(normalizeTitle('Action;Adventure;Drama')).toBe('Action, Adventure, Drama');
    });
  
    it('ensures a space after each comma', () => {
      expect(normalizeTitle('Action,Adventure,Drama')).toBe('Action, Adventure, Drama');
    });
  
    it('removes trailing hyphens', () => {
      expect(normalizeTitle('Thriller -')).toBe('Thriller');
    });
  
    it('applies all transformations together', () => {
      expect(normalizeTitle('Sci-Fi &amp; Fantasy;Adventure -')).toBe('Sci-Fi & Fantasy, Adventure');
    });
  
    it('does not modify already clean text', () => {
      expect(normalizeTitle('Comedy, Drama')).toBe('Comedy, Drama');
    });
  
    it('handles empty input', () => {
      expect(normalizeTitle('')).toBe('');
    });
  });  

describe('normalizePrice', () => {
  it('handles valid numbers', () => {
    expect(normalizePrice(12.345)).toBe(12.35);
    expect(normalizePrice(12)).toBe(12);
  });

  it('handles valid number strings', () => {
    expect(normalizePrice('12.345')).toBe(12.35);
    expect(normalizePrice('12')).toBe(12);
  });

  it('trims and parses string with spaces', () => {
    expect(normalizePrice('  15.2 ')).toBe(15.2);
  });

  it('returns 0 for non-numeric strings', () => {
    expect(normalizePrice('abc')).toBe(0);
    expect(normalizePrice('')).toBe(0);
    expect(normalizePrice('12,34')).toBe(0);
  });

  it('handles rounding correctly', () => {
    expect(normalizePrice('1.005')).toBe(1.01);
    expect(normalizePrice('2.499')).toBe(2.5);
  });
});

describe('formatPrice', () => {
  it('should format valid numbers correctly in ARS', () => {
    expect(formatPrice(1234.56)).toBe('$ 1.234,56');
    expect(formatPrice("1234.56")).toBe('$ 1.234,56');
  });

  it('should return $ 0,00 for invalid or empty inputs', () => {
    expect(formatPrice("")).toBe('$ 0,00');
    expect(formatPrice("abc")).toBe('$ 0,00');
    expect(formatPrice("12,34")).toBe('$ 0,00');
  });

  it('should handle rounding correctly', () => {
    expect(formatPrice("1.005")).toBe('$ 1,01');
    expect(formatPrice("2.499")).toBe('$ 2,50');
  });

  it('should accept custom currency and locale', () => {
    expect(formatPrice(1234.56, "USD", "en-US")).toBe('$1,234.56');
    expect(formatPrice(1234.56, "EUR", "de-DE")).toBe('1.234,56 €');
  });

  it('should format zero and negative numbers correctly', () => {
    expect(formatPrice(0)).toBe('$ 0,00');
    expect(formatPrice(-100)).toBe('-$ 100,00');
  });

  it('should fallback to default currency and locale if not provided', () => {
    expect(formatPrice(500)).toBe('$ 500,00');
  });
});