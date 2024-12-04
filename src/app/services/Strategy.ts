export interface CalculationStrategy {
    calculate(result: number): number;
}

// Estrategia para calcular el resultado estándar
export class StandardCalculation implements CalculationStrategy {
    calculate(result: number): number {
        return result; // Devuelve el resultado tal cual
    }
}

// Estrategia para redondear el resultado
export class RoundedCalculation implements CalculationStrategy {
    calculate(result: number): number {
        return Math.round(result);
    }
}

// Estrategia para devolver el valor absoluto
export class AbsoluteCalculation implements CalculationStrategy {
    calculate(result: number): number {
        return Math.abs(result);
    }
}
