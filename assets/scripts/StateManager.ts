export class StateManager {

    token: string;
    constructor() {
        this.token = '';
    }
    static instance: StateManager;

    static getInstance(): StateManager {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance;
    }

    setToken(token: string) {
        this.token = token;
    }
    getToken(): string {
        return this.token;
    }
}