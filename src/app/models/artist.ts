import { Attribute } from '@datx/core';
import { Observable } from 'rxjs';
import { BaseModel } from './base-model';

export class Artist extends BaseModel {
	public static endpoint = 'artists';
	public static type = 'artist';

	public get $(): { [key in keyof Omit<Artist, keyof BaseModel | '$'>]: Observable<Artist[key]> } {
		return this._observables as any;
	}

	@Attribute()
	public name!: string;
}
