import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        this.saveHistory();
    }

    /**
     * Buscar los gif según el termino.
     * @param term el término a buscar.
     */
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
            this.saveHistory();

            const params = new HttpParams()
                .set('api_key', this.apiKey)
                .set('limit', '10')
                .set('q', query);

            this.http.get<GifsResponse<GifsSearch[]>>(`${this.urlBase}/search`, { params })
                .subscribe(resp => {
                    this._results = resp.data;
                    this.saveResult();
                });
        }
    }

    /**
     * Carga el historial del local storage.
     */
    private load(): void {
        const item = localStorage.getItem('history');
        if (item) {
            this._history = JSON.parse(item);
        }

        const results = localStorage.getItem('results');
        if (results) {
            this._results = JSON.parse(results);
        }
    }

    /**
     * Guarda el historial en el local storage.
     */
    private saveHistory(): void {
        localStorage.setItem('history', JSON.stringify(this._history));
    }

    /**
     * Guarda los resultados en el local storage.
     */
    private saveResult(): void {
        localStorage.setItem('results', JSON.stringify(this._results));
    }
}
