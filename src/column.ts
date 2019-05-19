// export class Column {

// }

export type Column =
  | ColumnSingleLineText
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
  | ColumnBarcode;

interface ColumnSingleLineText {
  type: 'single line text';
  name: string;
  data: string;
}

interface ColumnLongText {
  type: 'long text';
  name: string;
  data: string;
}

interface ColumnAttachment {
  type: 'attachment';
  name: string;
}

interface ColumnCheckbox {
  type: 'checkbox';
  name: string;
  data: boolean;
}

interface ColumnMultipleSelect {
  type: 'multiple select';
  name: string;
  data: [string];
}

interface ColumnSingleSelect {
  type: 'single select';
  name: string;
  data: string;
}

interface ColumnCollaborator {
  type: 'collaborator';
  name: string;
}

interface ColumnDate {
  type: 'date';
  name: string;
}

interface ColumnPhoneNumber {
  type: 'phone number';
  name: string;
  data: number;
}

interface ColumnEmail {
  type: 'email';
  name: string;
}

interface ColumnUrl {
  type: 'url';
  name: string;
  data: string;
}

interface ColumnNumber {
  type: 'number';
  name: string;
  data: number;
}

interface ColumnCurrency {
  type: 'currency';
  name: string;
}

interface ColumnPercent {
  type: 'percent';
  name: string;
}

interface ColumnDuration {
  type: 'duration';
  name: string;
}

interface ColumnRating {
  type: 'rating';
  name: string;
}

interface ColumnForumula {
  type: 'formula';
  name: string;
}

interface ColumnRollup {
  type: 'rollup';
  name: string;
}

interface ColumnLookup {
  type: 'lookup';
  name: string;
}

interface ColumnCount {
  type: 'count';
  name: string;
  data: number;
}

interface ColumnCreatedTime {
  type: 'created time';
  name: string;
}

interface ColumnLastModifiedTime {
  type: 'last modified time';
  name: string;
}

interface ColumnAutoNumber {
  type: 'autonumber';
  name: string;
}

interface ColumnBarcode {
  type: 'barcode';
  name: string;
}
