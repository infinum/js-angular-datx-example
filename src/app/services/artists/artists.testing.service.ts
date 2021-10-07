import { Inject, Injectable } from '@angular/core';
import { AppCollection } from '../../collections/app.collection';
import { APP_COLLECTION } from '../../injection-tokens';
import { Artist } from '../../models/artist';
import { ExtractPublic } from '../../testing/extract-public.testing.type';
import { CollectionTestingService } from '../collection/collection.testing.service';
import { ArtistsService } from './artists.service';

@Injectable({
	providedIn: 'root',
})
export class ArtistsTestingService extends CollectionTestingService<Artist> implements ExtractPublic<ArtistsService> {
	protected ctor = Artist;

	constructor(@Inject(APP_COLLECTION) protected readonly collection: AppCollection) {
		super(collection);
	}
}
