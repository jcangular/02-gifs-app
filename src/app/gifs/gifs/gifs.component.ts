import { Component } from '@angular/core';
import { GifsSearch } from '../interfaces/gifs.interfaces';
import { GifsService } from '../services/gifs.service';

@Component({
    selector: 'app-gifs',
    templateUrl: './gifs.component.html',
    styles: [
    ]
})
export class GifsComponent {

    constructor(private gifsService: GifsService) { }

    public get results(): GifsSearch[] {
        return this.gifsService.results;
    }

}
