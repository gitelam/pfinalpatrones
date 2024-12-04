import React, { useState } from "react";
import { OperationFactory } from "../services/OperationFactory";
import { ValidatedOperation } from "../services/Decorator";
import { CalculatorSubject, HistoryObserver } from "../services/Observer";
import { HistoryManager } from "../services/HistoryManager";
import {
    CalculationStrategy,
    StandardCalculation,
    RoundedCalculation,
    AbsoluteCalculation,
} from "../services/Strategy";

const Calculator: React.FC = () => {
    const [result, setResult] = useState<number | null>(null); // Resultado de la operación
    const [history, setHistory] = useState<string[]>([]); // Historial de operaciones
    const [a, setA] = useState<number>(0); // Operando A
    const [b, setB] = useState<number>(0); // Operando B
    const [operation, setOperation] = useState<string>("add"); // Operación seleccionada
    const [mode, setMode] = useState<string>("standard"); // Modo de cálculo

    // Instancia del sujeto (Observable)
    const calculatorSubject = new CalculatorSubject();

    // Crear el observador del historial y suscribirlo al sujeto
    const historyObserver = new HistoryObserver();
    calculatorSubject.subscribe(historyObserver);

    const calculate = () => {
        try {
            // Crear la operación usando la fábrica
            const operationInstance = OperationFactory.createOperation(operation);

            // Decorar la operación con validaciones
            const validatedOperation = new ValidatedOperation(operationInstance);

            // Ejecutar la operación y obtener el resultado base
            let operationResult = validatedOperation.execute(a, b);

            // Aplicar la estrategia de cálculo seleccionada
            let strategy: CalculationStrategy;
            switch (mode) {
                case "rounded":
                    strategy = new RoundedCalculation();
                    break;
                case "absolute":
                    strategy = new AbsoluteCalculation();
                    break;
                default:
                    strategy = new StandardCalculation();
            }
            operationResult = strategy.calculate(operationResult);

            setResult(operationResult);

            // Crear el evento de historial
            const event = `${a} ${operation} ${b} = ${operationResult} (${mode} mode)`;
            calculatorSubject.notifyObservers(event); // Notificar a los observadores

            // Actualizar el historial desde el Singleton
            const updatedHistory = HistoryManager.getInstance().getHistory();
            setHistory(updatedHistory);
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <h1>Calculator</h1>
            <div style={{ marginBottom: "10px" }}>
                <label>
                    A: <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
                </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>
                    B: <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
                </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>
                    Operation:
                    <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                        <option value="add">Add</option>
                        <option value="subtract">Subtract</option>
                        <option value="divide">Divide</option>
                    </select>
                </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>
                    Mode:
                    <select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="standard">Standard</option>
                        <option value="rounded">Rounded</option>
                        <option value="absolute">Absolute</option>
                    </select>
                </label>
            </div>
            <button onClick={calculate}>Calculate</button>
            <div style={{ marginTop: "20px" }}>
                <h2>Result: {result !== null ? result : "No calculation yet"}</h2>
            </div>
            <div style={{ marginTop: "20px" }}>
                <h3>History:</h3>
                <ul>
                    {history.map((record, index) => (
                        <li key={index}>{record}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calculator;
