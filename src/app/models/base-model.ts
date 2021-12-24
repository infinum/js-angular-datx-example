import { jsonapiAngular } from '@datx/jsonapi-angular';
import { IRawModel, PatchType, PureCollection, IType, Model } from '@datx/core';
import { getMeta } from '@datx/utils';
import { BehaviorSubject, Observable } from 'rxjs';

export class BaseModel extends jsonapiAngular(Model) {
	protected _observables: Record<string, Observable<any>> = {};

	constructor(rawData?: IRawModel, collection?: PureCollection) {
		super(rawData, collection);

		const fields = getMeta(this, 'fields');
		Object.keys(fields).forEach((key) => {
			// @ts-ignore
			this._observables[key] = new BehaviorSubject(this[key]);
		});
		this.onPatch((patch) => {
			if (patch.patchType === PatchType.UPDATE) {
				Object.keys(patch.newValue || {}).forEach((key) => {
					// @ts-ignore
					console.log('next', key, patch.newValue[key]);
					// @ts-ignore
					this._observables[key].next(this[key]);
				});
			}
		});
		console.log(fields);
	}

	public get id(): IType {
		return this.meta.id;
	}
}
