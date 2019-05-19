import { Column } from './column';

export class Table {
  name: string;
  columns: Map<string, Column>;

  addColumn(column: Column) {
    this.columns.set(column.name, column);
  }
}
