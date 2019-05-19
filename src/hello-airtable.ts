export class Airtable {
    apiKey: string | false;
    root: string;
    bases: Map<string, airtableBase>;

    constructor(rootUrl: string, apikey: string) {
        this.apiKey = !isNothing(apikey) ? apikey : false;
        this.root = !isNothing(rootUrl) ? rootUrl : 'https://api.airtable.com/v0/';
        this.bases = new Map();
    }

    isValid() {
        return typeof this.apiKey == 'string'
    }

    generateBaseUrl() {
    }

    addBase(baseId: string) {
        this.bases.set(baseId, new airtableBase(baseId))
    }

    removeBase(baseId: string) {
        this.bases.delete(baseId);
    }
}

class airtableBase {
    id: string
    tables: Map<string, airtableTable>

    constructor(baseId: string) {
        this.id = baseId;
    }

    addTable(table: airtableTable) {
        this.tables.set(table.name, table);
    }
}

class airtableTable {
    name: string
    columns: Map<string, AirtableColumn>
    
    addColumn(column: AirtableColumn) {
        this.columns.set(column.name, column);
    }
}

type AirtableColumn = ColumnSingleLineText
    | ColumnLongText
    | ColumnAttachment
    | ColumnCheckbox
    | ColumnMultipleSelect
    | ColumnSingleSelect
    | ColumnCollaborator
    | ColumnDate
    | ColumnPhoneNumber
    | ColumnEmail
    | ColumnUrl
    | ColumnNumber
    | ColumnCurrency
    | ColumnPercent
    | ColumnDuration
    | ColumnRating
    | ColumnForumula
    | ColumnRollup
    | ColumnCount
    | ColumnLookup
    | ColumnCreatedTime
    | ColumnLastModifiedTime
    | ColumnAutoNumber
    | ColumnBarcode

interface ColumnSingleLineText {
    type: 'single line text',
    name: string,
    data: string
}

interface ColumnLongText {
    type: 'long text',
    name: string,
    data: string
}

interface ColumnAttachment {
    type: 'attachment',
    name: string
}

interface ColumnCheckbox {
    type: 'checkbox',
    name: string,
    data: boolean
}

interface ColumnMultipleSelect {
    type: 'multiple select',
    name: string,
    data: [string]
}

interface ColumnSingleSelect {
    type: 'single select',
    name: string,
    data: string
}

interface ColumnCollaborator {
    type: 'collaborator'
    name: string,
}

interface ColumnDate {
    type: 'date'
    name: string,
}

interface ColumnPhoneNumber {
    type: 'phone number',
    name: string,
    data: number
}

interface ColumnEmail {
    type: 'email'
    name: string,
}

interface ColumnUrl {
    type: 'url',
    name: string,
    data: string
}

interface ColumnNumber {
    type: 'number',
    name: string,
    data: number
}

interface ColumnCurrency {
    type: 'currency'
    name: string,
}

interface ColumnPercent {
    type: 'percent'
    name: string,
}

interface ColumnDuration {
    type: 'duration'
    name: string,
}

interface ColumnRating {
    type: 'rating'
    name: string,
}

interface ColumnForumula {
    type: 'formula'
    name: string,
}

interface ColumnRollup {
    type: 'rollup'
    name: string,
}

interface ColumnLookup {
    type: 'lookup'
    name: string,
}

interface ColumnCount {
    type: 'count',
    name: string,
    data: number
}

interface ColumnCreatedTime {
    type: 'created time'
    name: string,
}

interface ColumnLastModifiedTime {
    type: 'last modified time'
    name: string,
}

interface ColumnAutoNumber {
    type: 'autonumber'
    name: string,
}

interface ColumnBarcode {
    type: 'barcode'
    name: string,
}

interface airtableSort {
    field: string,
    name: string,
    direction: 'asc' | 'desc'
}

interface queryParams {
    fields?: [string],
    maxRecords?: number,
    filterByFormula?: string,
    pageSize?: number,
    sort?: [airtableSort],
    view?: string,
    offset?: string
}

const isNothing =
    (any): boolean => {
        return any === NaN || any === null || any === undefined
    }

const buildParamString =
    (params: queryParams) =>
        (property: string): string | null => {
            if (isNothing(params[property])) {
                return null
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
        }

const buildFields =
    (fields: [string]): string => {
        return fields.map((f) => `fields%5B%5D=${encodeURIComponent(f).split('%20').join('+')}`).join('&')
    }

const buildFilterByFormula =
    (formula: string): string => {
        return `filterByFormula=${encodeURIComponent(formula.trim())}`
    }

const buildMaxRecords =
    (max: number): string => {
        return `maxRecords=${max}`
    }

const buildPageSize =
    (size: number): string => {
        return `pageSize=${size}`
    }

const buildSort =
    (sort: [airtableSort]): string => {
        return sort.map((s, i) => `sort%5B${i}%5D%5Bfield%5D=${s.field}&sort%5B${i}%5D%5Bdirection%5D=${s.direction}`).join('&');
    }

const buildView =
    (view: string): string => {
        return `view=${encodeURIComponent(view)}`;
    }

const buildOffset =
    (offset: string): string => {
        return `offset=${offset}`;
    }

const buildKey =
    (key: string): string => {
        return `api_key=${key}`;
    }

const aggregateParamStrings =
    (acc: string, cur: string): string => {
        if (!isNothing(cur)) {
            return `${acc}&${cur}`
        } else {
            return acc
        }
    }

export const encodeGetUrl =
    (root: string) =>
        (apiKey: string) =>
            (base: string) =>
                (table: string) =>
                    (params: queryParams) => {
                        const encodedParams = Object.keys(params)
                            .map(buildParamString(params))
                            .reduce(aggregateParamStrings);
                        return encodedParams
                    }

export const moduleValue = 'somethingsomething'


