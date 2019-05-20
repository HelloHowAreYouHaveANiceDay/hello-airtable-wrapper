import { encodeGetUrl} from '../src/urlBuilder';

describe('url encoding', () => {
  const root = 'https://api.airtable.com/v0';
  const apiKey = 'apiKey';
  const defaultBase = 'defaultBase';
  const defaultTable = 'defaultTable';

  test('valid basic', () => {
    const link = encodeGetUrl(root)(apiKey)(defaultBase)(defaultTable)()
    const targetLink = "https://api.airtable.com/v0/defaultBase/defaultTable?api_key=apiKey";
    expect(link).toBe(targetLink);
  });

  const fields = ['name', 'description']

  test('fields filter', () => {
    const link = encodeGetUrl(root)(apiKey)(defaultBase)(defaultTable)({
        fields: fields
    })
    const targetLink = "https://api.airtable.com/v0/defaultBase/defaultTable?api_key=apiKey&fields%5B%5D=name&fields%5B%5D=description";
    expect(link).toBe(targetLink);
  });

});