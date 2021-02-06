import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
    selector: 'app-finder',
    templateUrl: './finder.component.html',
    styles: [
    ]
})
export class FinderComponent {

    // ! -> Not Null Operator.
    @ViewChild('txtFind') txtFind!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) { }

    public find(): void {
        const term = this.txtFind.nativeElement.value;
        this.gifsService.findGifs(term);
        this.txtFind.nativeElement.value = '';
    }
}
