
import { JaratKezelo, NegativKesesException } from './JaratKezelo';

describe('JaratKezelo', () => {
    let jaratKezelo: JaratKezelo;

    beforeEach(() => {
        jaratKezelo = new JaratKezelo();
    });

    test('ujJarat creates a new flight successfully', () => {
        const now = new Date();
        jaratKezelo.ujJarat('123', 'BUD', 'JFK', now);

        const indulasiIdo = jaratKezelo.mikorIndul('123');
        expect(indulasiIdo.toString()).toBe(now.toString());
    });

    test('ujJarat throws an error for duplicate flight number', () => {
        const now = new Date();
        jaratKezelo.ujJarat('123', 'BUD', 'JFK', now);

        expect(() => {
            jaratKezelo.ujJarat('123', 'BUD', 'LAX', now);
        }).toThrow('A járatszám már létezik.');
    });

    test('keses adds delay to the flight', () => {
        const now = new Date();
        jaratKezelo.ujJarat('123', 'BUD', 'JFK', now);
        jaratKezelo.keses('123', 15);

        const indulasiIdo = jaratKezelo.mikorIndul('123');
        expect(indulasiIdo.toString()).toBe(new Date(now.getTime() + 15 * 60000).toString());
    });

    test('keses throws an error for non-existing flight', () => {
        expect(() => {
            jaratKezelo.keses('999', 15);
        }).toThrow('Nem létező járat.');
    });

    test('keses throws an error for negative final delay', () => {
        const now = new Date();
        jaratKezelo.ujJarat('123', 'BUD', 'JFK', now);
        jaratKezelo.keses('123', -5);

        expect(() => {
            jaratKezelo.keses('123', -10);
        }).toThrow(NegativKesesException);
    });

    test('jaratokRepuloterrol returns correct flight numbers', () => {
        const now = new Date();
        jaratKezelo.ujJarat('123', 'BUD', 'JFK', now);
        jaratKezelo.ujJarat('456', 'BUD', 'LAX', now);
        jaratKezelo.ujJarat('789', 'JFK', 'LAX', now);

        const jaratok = jaratKezelo.jaratokRepuloterrol('BUD');
        expect(jaratok).toContain('123');
        expect(jaratok).toContain('456');
        expect(jaratok).not.toContain('789');
    });
});
