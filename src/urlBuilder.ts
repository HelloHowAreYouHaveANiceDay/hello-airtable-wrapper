import { isNothing } from './helpers';

interface airtableSort {
    field: string;
    name: string;
    direction: 'asc' | 'desc';
}

interface queryParams {
    fields?: string[];
    maxRecords?: number;
    filterByFormula?: string;
    pageSize?: number;
    sort?: airtableSort[];
    view?: string;
    offset?: string;
}

const buildParamString = (params: queryParams) => (property: string): string | null => {
    if (isNothing(params[property])) {
        return null;
    } else {
        switch (property) {
            case 'fields':
                return buildFields(params[property]);
            case 'maxRecords':
                return buildMaxRecords(params[property]);
            case 'filterByFormula':
                return buildFilterByFormula(params[property]);
            case 'pageSize':
                return buildPageSize(params[property]);
            case 'sort':
                return buildSort(params[property]);
            case 'view':
                return buildView(params[property]);
            case 'offset':
                return buildOffset(params[property]);
            default:
                break;
        }
    }
};

const buildFields = (fields: string[]): string => {
    return fields
        .map(
            f =>
                `fields%5B%5D=${encodeURIComponent(f)
                    .split('%20')
                    .join('+')}`,
        )
        .join('&');
};

const buildFilterByFormula = (formula: string): string => {
    return `filterByFormula=${encodeURIComponent(formula.trim())}`;
};

const buildMaxRecords = (max: number): string => {
    return `maxRecords=${max}`;
};

const buildPageSize = (size: number): string => {
    return `pageSize=${size}`;
};

const buildSort = (sort: airtableSort[]): string => {
    return sort
        .map((s, i) => `sort%5B${i}%5D%5Bfield%5D=${s.field}&sort%5B${i}%5D%5Bdirection%5D=${s.direction}`)
        .join('&');
};

const buildView = (view: string): string => {
    return `view=${encodeURIComponent(view)}`;
};

const buildOffset = (offset: string): string => {
    return `offset=${offset}`;
};

const buildKey = (key: string): string => {
    return `api_key=${key}`;
};

const aggregateParamStrings = (acc: string, cur: string): string => {
    if (!isNothing(cur)) {
        return `${acc}&${cur}`;
    } else {
        return acc;
    }
};

export const encodeGetUrl = (root: string) => (apiKey: string) => (base: string) => (table: string) => (
    params?: queryParams,
) => {
    const encodedParams = params ? Object.keys(params)
        .map(buildParamString(params))
        .reduce(aggregateParamStrings) : '';

    let url = `${root}/${base}/${table}?${buildKey(apiKey)}`

    url = params ? `${url}&${encodedParams}` : url

    return url
};
