import { Attribute } from '@datx/core';
import { BaseModel } from './base-model';

export class Artist extends BaseModel {
	public static endpoint = 'artists';
	public static type = 'artist';

	@Attribute()
	public name!: string;
}
