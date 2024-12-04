// Interfaz del Observador
import { HistoryManager } from "./HistoryManager"; // Importación corregida

export interface Observer {
    notify(event: string): void;
}

// Interfaz del Sujeto Observable
export interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notifyObservers(event: string): void;
}

// Implementación del Sujeto Observable
export class CalculatorSubject implements Subject {
    private observers: Observer[] = [];

    // Permite que un observador se suscriba
    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    // Permite que un observador se desuscriba
    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    // Notifica a todos los observadores
    notifyObservers(event: string): void {
        this.observers.forEach((observer) => observer.notify(event));
    }
}

// Observador concreto para el historial
export class HistoryObserver implements Observer {
    notify(event: string): void {
        const history = HistoryManager.getInstance();
        history.addRecord(event);
        console.log(`Historial actualizado: ${event}`);
    }
}
