import { encodeGetUrl} from '../src/urlBuilder';

describe('url encoding', () => {
  const root = 'https://api.airtable.com/v0';
  const apiKey = 'apikey';
  const defaultBase = 'testBase';
  const defaultTable = 'air';

  test('valid basic', () => {
    const link = encodeGetUrl(root)(apiKey)(defaultBase)(defaultTable)()
    const targetLink = 'https://api.airtable.com/v0/defaultBase/defaultTable?api_key=apiKey';
    expect(link).toBe(targetLink);
  });

});