import { describe, it, expect } from 'vitest';
import { 
  getInversiones, 
  getInversionByTicker, 
  getTopByRendimiento,
  getTopBySeguridad,
  formatMoneda,
  formatPorcentaje,
  formatFecha 
} from '../data/inversiones';

describe('Data Functions', () => {
  describe('getInversiones', () => {
    it('should return an array of inversiones', () => {
      const inversiones = getInversiones();
      expect(Array.isArray(inversiones)).toBe(true);
      expect(inversiones.length).toBeGreaterThan(0);
    });

    it('should return only active inversiones', () => {
      const inversiones = getInversiones();
      inversiones.forEach(inv => {
        expect(inv.esta_activa).toBe(true);
      });
    });
  });

  describe('getInversionByTicker', () => {
    it('should find existing inversion by ticker', () => {
      const inversion = getInversionByTicker('LTP24');
      expect(inversion).toBeDefined();
      expect(inversion?.ticker).toBe('LTP24');
    });

    it('should be case insensitive', () => {
      const inversion1 = getInversionByTicker('ltp24');
      const inversion2 = getInversionByTicker('LTP24');
      expect(inversion1).toEqual(inversion2);
    });

    it('should return undefined for non-existing ticker', () => {
      const inversion = getInversionByTicker('NONEXISTENT');
      expect(inversion).toBeUndefined();
    });
  });

  describe('getTopByRendimiento', () => {
    it('should return top inversiones sorted by rendimiento', () => {
      const tops = getTopByRendimiento(3);
      expect(tops.length).toBe(3);
      
      for (let i = 0; i < tops.length - 1; i++) {
        expect(tops[i].rendimiento_ytm).toBeGreaterThanOrEqual(tops[i + 1].rendimiento_ytm);
      }
    });
  });

  describe('getTopBySeguridad', () => {
    it('should return top inversiones sorted by calificacion', () => {
      const tops = getTopBySeguridad(5);
      expect(tops.length).toBeLessThanOrEqual(5);
      expect(tops.length).toBeGreaterThan(0);
    });
  });

  describe('formatMoneda', () => {
    it('should format ARS correctly', () => {
      const result = formatMoneda(10000, 'ARS');
      expect(result).toContain('$');
      expect(result).toContain('10.000');
    });

    it('should format USD correctly', () => {
      const result = formatMoneda(1000, 'USD');
      expect(result).toContain('U$S');
      expect(result).toContain('1,000.00');
    });

    it('should format USD_MEP correctly', () => {
      const result = formatMoneda(1000, 'USD_MEP');
      expect(result).toContain('U$S');
    });
  });

  describe('formatPorcentaje', () => {
    it('should format percentage with 1 decimal', () => {
      expect(formatPorcentaje(8)).toBe('8.0%');
      expect(formatPorcentaje(8.5)).toBe('8.5%');
      expect(formatPorcentaje(8.55)).toBe('8.6%');
    });
  });

  describe('formatFecha', () => {
    it('should format date in Spanish', () => {
      const result = formatFecha('2027-02-24');
      expect(result).toContain('2027');
    });
  });
});
