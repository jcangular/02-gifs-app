import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private _history: string[] = [];

    public get history(): string[] {
        return [...this._history];
    }

    public findGifs(term: string): void {
        if (!term.trim()) {
            return;
        }

        // Si la búsqueda es la última realizada, no hace nada.
        if (this._history[0] === term.toLowerCase()) {
            return;
        }

        this._history.unshift(term.toLowerCase());

        // Elimina duplicados y sólo 10 busquedas en el historial.
        this._history = this._history
            .reduce(
                (list, elem) => list.includes(elem) ? list : [...list, elem], []
            ).splice(0, 10);
    }
}
