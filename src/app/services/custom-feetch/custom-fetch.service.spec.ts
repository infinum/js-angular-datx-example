import { TestBed } from '@angular/core/testing';
import { CustomFetchService } from './custom-fetch.service';

describe('CustomFetchService', () => {
	let service: CustomFetchService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CustomFetchService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
