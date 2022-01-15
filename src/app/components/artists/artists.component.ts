import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArtistsService } from '../../services/artists/artists.service';

@Component({
	selector: 'app-artists',
	templateUrl: './artists.component.html',
	styleUrls: ['./artists.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsComponent {
	public artists$ = this.artistsService.getAllModels();

	constructor(private readonly artistsService: ArtistsService) {}

	public updateNames() {
		this.artistsService.findAll().forEach((artist, index) => {
			artist.name += index;
		});
	}
}
