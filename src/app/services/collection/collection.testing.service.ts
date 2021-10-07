import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IModelConstructor, IRawModel, IType } from '@datx/core';
import { IRequestOptions } from '@datx/jsonapi';
import { Response } from '@datx/jsonapi-angular';
import { Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppCollection } from '../../collections/app.collection';
import { BaseModel } from '../../models/base-model';
import { ExtractPublic } from '../../testing/extract-public.testing.type';
import { asyncData } from '../../testing/helpers';
import { CollectionService } from './collection.service';

@Injectable()
export abstract class CollectionTestingService<TModel extends BaseModel>
	implements ExtractPublic<CollectionService<TModel>>
{
	protected abstract ctor: IModelConstructor<TModel>;

	constructor(protected readonly collection: AppCollection) {}

	// tslint:disable-next-line: no-any
	public setData(data: Array<IRawModel | Record<string, any>>): Array<TModel> {
		this.collection.removeAll(this.ctor);
		return this.collection.add(data, this.ctor);
	}

	// tslint:disable-next-line: no-any
	public create(rawModel: IRawModel | Record<string, any>): TModel {
		return this.collection.add(rawModel, this.ctor);
	}

	// tslint:disable-next-line: no-any
	public createAndSave(rawModel: IRawModel | Record<string, any>): Observable<TModel> {
		const model = this.create(rawModel);
		return this.update(model);
	}

	public findAll(): Array<TModel> {
		return this.collection.findAll(this.ctor);
	}

	public getAllModels(_options?: IRequestOptions): Observable<Array<TModel>> {
		return asyncData(this.collection.findAll(this.ctor));
	}

	public getMany(_options?: IRequestOptions): Observable<Response<TModel>> {
		const data = this.collection.findAll(this.ctor);
		return asyncData({ data, meta: { total_count: data.length } } as Response<TModel>);
	}

	public getManyModels(_options?: IRequestOptions): Observable<Array<TModel>> {
		return asyncData(this.collection.findAll(this.ctor));
	}

	public getOne(id: IType, _options?: IRequestOptions): Observable<Response<TModel>> {
		return asyncData({ data: this.collection.findOne(this.ctor, id) } as Response<TModel>);
	}

	public getOneModel(id: IType, _options?: IRequestOptions): Observable<TModel | null> {
		const model = this.collection.findOne(this.ctor, id);

		if (!model) {
			return throwError(
				new HttpErrorResponse({
					status: 404,
				})
			).pipe(delay(0));
		}

		return asyncData(model);
	}

	public findOne(id: IType): TModel | null {
		return this.collection.findOne(this.ctor, id);
	}

	public update(model: TModel): Observable<TModel> {
		return asyncData(model);
	}
}
