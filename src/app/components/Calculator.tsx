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
            //@typescript-eslint/no-explicit-any
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col md:flex-row">
        <div className="flex-1 p-8 flex flex-col justify-center bg-gray-800 rounded-l-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-indigo-500 mb-8 animate-pulse">Calculator</h1>
          <div className="mb-6">
            <label className="block text-lg mb-2">A:</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full p-3 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2">B:</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full p-3 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2">Operation:</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="add">Add</option>
              <option value="subtract">Subtract</option>
              <option value="divide">Divide</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="block text-lg mb-2">Mode:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="standard">Standard</option>
              <option value="rounded">Rounded</option>
              <option value="absolute">Absolute</option>
            </select>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Calculate
          </button>
          <div className="mt-8">
            <h2 className="text-xl text-center text-indigo-300">
              Result: {result !== null ? result : "No calculation yet"}
            </h2>
          </div>
        </div>
      
        <div className="flex-1 p-8 bg-gray-800 rounded-r-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-indigo-400 mb-6">History</h3>
          <ul className="space-y-3">
            {history.map((record, index) => (
              <li key={index} className="text-gray-300">{record}</li>
            ))}
          </ul>
        </div>
      </div>
      
    );
};

export default Calculator;
