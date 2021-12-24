import { jsonapiAngular } from '@datx/jsonapi-angular';
import { IRawModel, PatchType, PureCollection, IType, Model } from '@datx/core';
import { getMeta } from '@datx/utils';
import { BehaviorSubject, Observable } from 'rxjs';

export class BaseModel extends jsonapiAngular(Model) {
	private _observables: Record<string, BehaviorSubject<any>> = {};

	public $: { [key in 'id' | keyof Omit<this, keyof BaseModel | '$'>]: Observable<this[key]> } = {} as any;

	constructor(rawData?: IRawModel, collection?: PureCollection) {
		super(rawData, collection);

		const fields = [...Object.keys(getMeta(this, 'fields', {})), 'id'];
		fields.forEach((key) => {
			this._observables[key] = new BehaviorSubject((this as any)[key]);
			(this.$ as any)[key] = this._observables[key].asObservable();
		});

		this.onPatch((patch) => {
			if (patch.patchType === PatchType.UPDATE) {
				const newValue = patch.newValue!;
				Object.keys(newValue).forEach((key) => {
					if (key in this._observables) {
						this._observables[key].next((newValue as any)[key]);
					} else {
						this._observables[key] = new BehaviorSubject((newValue as any)[key]);
						(this.$ as any)[key] = this._observables[key].asObservable();
					}
				});
			}
		});
	}

	public get id(): IType {
		return this.meta.id;
	}
}
