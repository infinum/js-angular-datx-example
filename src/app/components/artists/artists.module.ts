import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArtistsComponent } from './artists.component';

@NgModule({
	declarations: [ArtistsComponent],
	imports: [CommonModule],
	exports: [ArtistsComponent],
})
export class ArtistsModule {}
