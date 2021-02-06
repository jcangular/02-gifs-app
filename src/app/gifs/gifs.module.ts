import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { FinderComponent } from './finder/finder.component';
import { GifsComponent } from './gifs/gifs.component';



@NgModule({
    declarations: [
        GifsPageComponent,
        FinderComponent,
        GifsComponent
    ],
    exports: [
        GifsPageComponent
    ],
    imports: [
        CommonModule
    ]
})
export class GifsModule { }
