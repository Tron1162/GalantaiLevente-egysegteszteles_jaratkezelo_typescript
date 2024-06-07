
class NegativKesesException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NegativKesesException";
    }
}

class Jarat {
    jaratSzam: string;
    repterHonnan: string;
    repterHova: string;
    indulas: Date;
    keses: number;

    constructor(jaratSzam: string, repterHonnan: string, repterHova: string, indulas: Date) {
        this.jaratSzam = jaratSzam;
        this.repterHonnan = repterHonnan;
        this.repterHova = repterHova;
        this.indulas = indulas;
        this.keses = 0;
    }
}

class JaratKezelo {
    private jaratok: Map<string, Jarat> = new Map();

    ujJarat(jaratSzam: string, repterHonnan: string, repterHova: string, indulas: Date): void {
        if (this.jaratok.has(jaratSzam)) {
            throw new Error("A járatszám már létezik.");
        }

        const jarat = new Jarat(jaratSzam, repterHonnan, repterHova, indulas);
        this.jaratok.set(jaratSzam, jarat);
    }

    keses(jaratSzam: string, keses: number): void {
        const jarat = this.jaratok.get(jaratSzam);
        if (!jarat) {
            throw new Error("Nem létező járat.");
        }

        jarat.keses += keses;

        if (jarat.keses < 0) {
            throw new NegativKesesException("A késés nem lehet negatív.");
        }
    }

    mikorIndul(jaratSzam: string): Date {
        const jarat = this.jaratok.get(jaratSzam);
        if (!jarat) {
            throw new Error("Nem létező járat.");
        }

        const indulasiIdo = new Date(jarat.indulas);
        indulasiIdo.setMinutes(indulasiIdo.getMinutes() + jarat.keses);
        return indulasiIdo;
    }

    jaratokRepuloterrol(repter: string): string[] {
        const eredmeny: string[] = [];

        for (const jarat of this.jaratok.values()) {
            if (jarat.repterHonnan.toLowerCase() === repter.toLowerCase()) {
                eredmeny.push(jarat.jaratSzam);
            }
        }

        return eredmeny;
    }
}

export { JaratKezelo, NegativKesesException };
