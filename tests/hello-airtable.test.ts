import { Airtable } from '../src/hello-airtable';

describe('class setup', () => {
  const root = 'https://api.airtable.com/v0';
  const apiKey = 'apikey';
  const defaultBase = 'testBase';
  const defaultTable = 'air';

  test('valid construction', () => {
    const airtable = new Airtable(root, apiKey);
    expect(airtable.isValid()).toBe(true);
  });

  test('build basic get link', () => {
    const airtable = new Airtable(root, apiKey);
  });

  const targetLink = 'https://api.airtable.com/v0/testBase/air?api_key=apikey';
});
