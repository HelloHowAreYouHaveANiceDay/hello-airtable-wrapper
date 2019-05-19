import { isNothing } from './helpers';
import { Base } from './base';

export class Airtable {
  apiKey: string | false;
  root: string;
  bases: Map<string, Base>;

  constructor(rootUrl: string, apikey: string) {
    this.apiKey = !isNothing(apikey) ? apikey : false;
    this.root = !isNothing(rootUrl) ? rootUrl : 'https://api.airtable.com/v0/';
    this.bases = new Map();
  }

  isValid() {
    return typeof this.apiKey == 'string';
  }

  generateBaseUrl() {}

  addBase(baseId: string) {
    this.bases.set(baseId, new Base(baseId));
  }

  removeBase(baseId: string) {
    this.bases.delete(baseId);
  }
}
