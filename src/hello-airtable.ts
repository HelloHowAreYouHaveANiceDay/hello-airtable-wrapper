import { isNothing } from './helpers';
import { Base } from './base';

export class Airtable {
  apiKey: string | false;
  root: string;
  bases: {
      [key: string]: Base
  };

  constructor(rootUrl: string, apikey: string) {
    this.apiKey = !isNothing(apikey) ? apikey : false;
    this.root = !isNothing(rootUrl) ? rootUrl : 'https://api.airtable.com/v0/';
    this.bases = {}
  }

  isValid() {
    return typeof this.apiKey == 'string';
  }

  generateBaseUrl() {}

  addBase(baseId: string) {
    this.bases[baseId] = new Base(baseId);
  }

  removeBase(baseId: string) {
    delete this.bases[baseId];
  }

  inspect(){
    return {
        apiKey: this.apiKey,
        root: this.root,
        bases: this.bases
    }   
  }
}
