import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styles: []
})
export class SidenavComponent implements OnInit {

    constructor(private gifsService: GifsService) { }

    ngOnInit(): void {
    }

    public get history(): string[] {
        return this.gifsService.history;
    }

    public clearHistory(): void {
        this.gifsService.clear();
    }

    public find(term: string): void {
        this.gifsService.findGifs(term);
    }

}
