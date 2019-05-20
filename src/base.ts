import { Table } from './table';

export class Base {
  id: string;
  tables: {
      [key: string]: Table
  };

  constructor(baseId: string) {
    this.id = baseId;
  }

  addTable(table: Table) {
    this.tables[table.name], table;
  }
}
