// Definimos una interfaz común para las operaciones matemáticas
export interface Operation {
    execute(a: number, b: number): number;
}

// Implementación de la operación de suma
export class Addition implements Operation {
    execute(a: number, b: number): number {
        return a + b;
    }
}

// Implementación de la operación de resta
export class Subtraction implements Operation {
    execute(a: number, b: number): number {
        return a - b;
    }
}

//division
export class Division implements Operation {
    execute(a: number, b: number): number {
        return a / b;
    }
}

// Fábrica abstracta para crear operaciones matemáticas
export class OperationFactory {
    static createOperation(type: string): Operation {
        switch (type) {
            case "add":
                return new Addition();
            case "subtract":
                return new Subtraction();
            case "divide":
                return new Division();
            default:
                throw new Error(`Unsupported operation type: ${type}`);
        }
    }
}
