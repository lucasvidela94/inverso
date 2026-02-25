import { describe, it, expect } from 'vitest';
import { getBrokers, getBrokerById } from '../data/brokers';

describe('Brokers Data', () => {
  describe('getBrokers', () => {
    it('should return an array of brokers', () => {
      const brokers = getBrokers();
      expect(Array.isArray(brokers)).toBe(true);
      expect(brokers.length).toBeGreaterThan(0);
    });

    it('should have required properties for each broker', () => {
      const brokers = getBrokers();
      brokers.forEach(broker => {
        expect(broker).toHaveProperty('id');
        expect(broker).toHaveProperty('nombre');
        expect(broker).toHaveProperty('sitio_web');
        expect(broker).toHaveProperty('comisiones');
        expect(broker).toHaveProperty('rating');
      });
    });
  });

  describe('getBrokerById', () => {
    it('should find existing broker by id', () => {
      const broker = getBrokerById('balanz');
      expect(broker).toBeDefined();
      expect(broker?.id).toBe('balanz');
    });

    it('should return undefined for non-existing id', () => {
      const broker = getBrokerById('nonexistent');
      expect(broker).toBeUndefined();
    });
  });
});
