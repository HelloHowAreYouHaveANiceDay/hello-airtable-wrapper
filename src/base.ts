import { Table } from './table';

export class Base {
  id: string;
  tables: Map<string, Table>;

  constructor(baseId: string) {
    this.id = baseId;
  }

  addTable(table: Table) {
    this.tables.set(table.name, table);
  }
}
