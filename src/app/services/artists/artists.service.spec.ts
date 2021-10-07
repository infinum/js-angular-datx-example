import { TestBed } from '@angular/core/testing';
import { AppCollection } from '../../collections/app.collection';
import { APP_COLLECTION } from '../../injection-tokens';
import { ArtistsService } from './artists.service';

describe('ArtistsService', () => {
	let service: ArtistsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: APP_COLLECTION,
					useValue: new AppCollection(),
				},
			],
		});
		service = TestBed.inject(ArtistsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
