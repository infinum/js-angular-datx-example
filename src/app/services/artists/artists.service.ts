import { Inject, Injectable } from '@angular/core';
import { CollectionService } from '@datx/jsonapi-angular';
import { AppCollection } from '../../collections/app.collection';
import { APP_COLLECTION } from '../../injection-tokens';
import { Artist } from '../../models/artist';

@Injectable({
	providedIn: 'root',
})
export class ArtistsService extends CollectionService<Artist, AppCollection> {
	protected ctor = Artist;

	constructor(@Inject(APP_COLLECTION) protected readonly collection: AppCollection) {
		super(collection);
	}
}
