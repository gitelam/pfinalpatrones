import { Operation } from "./OperationFactory";

// Decorador para agregar validaciones a las operaciones
export class ValidatedOperation implements Operation {
    private operation: Operation;

    constructor(operation: Operation) {
        this.operation = operation;
    }

    execute(a: number, b: number): number {
        // Validación para evitar divisiones por cero
        if (this.operation.constructor.name === "Division" && b === 0) {
            throw new Error("Division by zero is not allowed");
        }

        // Log de la operación
        console.log(`Executing operation: ${this.operation.constructor.name} with values a=${a}, b=${b}`);

        return this.operation.execute(a, b);
    }
}
