import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GifsResponse, GifsSearch } from '../interfaces/gifs.interfaces';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private readonly apiKey = 'OpOtaFQvWr3uPoo8XjGrsuUJPWHX8fbZ';
    private readonly urlBase = 'https://api.giphy.com/v1/gifs';

    private _history: string[] = [];
    private _results: GifsSearch[] = [];

    constructor(private http: HttpClient) {
        this.load();
    }

    public get history(): string[] {
        return [...this._history];
    }

    public get results(): GifsSearch[] {
        return [...this._results];
    }

    public clear(): void {
        this._history = [];
        this.save();
    }

    public findGifs(term: string): void {
        if (!term.trim()) {
            return;
        }

        const query = term.toLowerCase();

        // Si la búsqueda es la última realizada, no hace nada.
        if (this._history[0] !== query) {
            this._history.unshift(query);

            // Elimina duplicados y deja sólo 10 busquedas en el historial.
            this._history = this._history
                .reduce(
                    (list, elem) => list.includes(elem) ? list : [...list, elem], []
                ).splice(0, 10);
            this.save();
        }

        const url = `${this.urlBase}/search?api_key=${this.apiKey}&limit=10&q=${query}`;

        this.http.get<GifsResponse<GifsSearch[]>>(url)
            .subscribe(resp => {
                this._results = resp.data;
            });

    }

    /**
     * Carga el historial del local storage.
     */
    private load(): void {
        const item = localStorage.getItem('history');
        if (item) {
            this._history = JSON.parse(item);
        }
    }

    /**
     * Guarda el historial en el local storage.
     */
    private save(): void {
        localStorage.setItem('history', JSON.stringify(this._history));
    }
}
