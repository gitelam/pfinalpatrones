export class HistoryManager {
    private static instance: HistoryManager; // Instancia única
    private history: string[] = []; // Arreglo para almacenar el historial

    // Constructor privado para evitar instancias externas
    private constructor() {}

    // Método estático para obtener la única instancia de la clase
    static getInstance(): HistoryManager {
        if (!HistoryManager.instance) {
            HistoryManager.instance = new HistoryManager();
        }
        return HistoryManager.instance;
    }

    // Agregar un registro al historial
    addRecord(record: string): void {
        this.history.push(record);
    }

    // Obtener todo el historial
    getHistory(): string[] {
        return this.history;
    }
}
