// Representa uma tag individual
export interface Tag {
  text: string;
}

// Representa o conteúdo associado a um campo
export interface FieldContent {
  text?: string;
  image?: string;
  description?: string;
  tags?: Tag[];
}

// Representa um campo com identificador (ex: 'mlb') e seu conteúdo
export interface FieldItem {
  field: string;
  content: FieldContent;
}

// Uma linha da tabela (ou seja, um conjunto de campos)
export type RowData = FieldItem[];

// A tabela completa: várias linhas
export type TableData = RowData[];
