import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IRequestOptions } from '@datx/jsonapi';
import { Response } from '@datx/jsonapi-angular';
import { of } from 'rxjs';
import { AppCollection } from '../../collections/app.collection';
import { APP_COLLECTION } from '../../injection-tokens';
import { Artist } from '../../models/artist';
import { CollectionService } from './collection.service';

@Injectable()
class TestModelService extends CollectionService<Artist> {
	protected ctor = Artist;

	constructor(@Inject(APP_COLLECTION) protected readonly collection: AppCollection) {
		super(collection);
	}
}

describe('CollectionService', () => {
	let service: TestModelService;
	let appCollection: AppCollection;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: APP_COLLECTION,
					useValue: new AppCollection(),
				},
				TestModelService,
			],
		});

		service = TestBed.inject(TestModelService);
		appCollection = TestBed.inject(APP_COLLECTION);

		spyOn(appCollection, 'getMany').and.returnValue(
			of({ data: [new Artist({ name: 'John' }), new Artist({ name: 'Jane' })] } as Response<Artist>)
		);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('#getMany should make a get many call', (done: DoneFn) => {
		const requestOptions: IRequestOptions = { queryParams: {} };

		service.getMany(requestOptions).subscribe((response) => {
			expect(appCollection.getMany).toHaveBeenCalledWith(Artist, requestOptions);
			expect(response.data.length).toBe(2);
			done();
		});
	});

	it('#getManyModels should make a get many models call', (done: DoneFn) => {
		const requestOptions: IRequestOptions = { queryParams: {} };

		service.getManyModels(requestOptions).subscribe((models) => {
			expect(appCollection.getMany).toHaveBeenCalledWith(Artist, requestOptions);
			expect(models.length).toBe(2);
			expect(models[0].name).toBe('John');
			expect(models[1].name).toBe('Jane');
			done();
		});
	});

	it('#create should create a new new model and add it to the collection', () => {
		spyOn(appCollection, 'add').and.callThrough();

		const name = 'Hrvatko';
		const newModel = service.create({ name });

		expect(appCollection.add).toHaveBeenCalledTimes(1);
		expect(newModel).toBeInstanceOf(Artist);
		expect(newModel.name).toBe(name);
	});

	it('#createAndSave should create a model and save it (API call)', async () => {
		spyOn(appCollection, 'add').and.callThrough();
		spyOn(service, 'update').and.callFake((model: Artist) => of(model));

		const name = 'Hrvatko';
		const savedModel = await service.createAndSave({ name }).toPromise();

		expect(appCollection.add).toHaveBeenCalledTimes(1);
		expect(service.update).toHaveBeenCalledTimes(1);
		expect(savedModel).toBeInstanceOf(Artist);
		expect(savedModel.name).toBe(name);
	});
});
