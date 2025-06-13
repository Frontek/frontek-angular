export interface Tag {
  text: string;
}

export interface FieldContent {
  text?: string;
  image?: string;
  description?: string;
  tags?: Tag[];
}

export interface FieldItem {
  field: string;
  content: FieldContent;
}

export type RowData = FieldItem[];
export type TableData = RowData[];

export interface HeadersStyle {
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
  bgColorHover?: string;
  textAlignment?: string;
}
export interface Header {
  field: string;
  header: string;
  styles? : HeadersStyle
}

export interface TableConfig {
  headers?: Header[];
  subheaders?: Header[]; // Se quiser manter subheaders
}
export interface TableSectionStyle {
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
  bgColorHover?: string;
  textAlignment?: string;
}

export interface FilterBoxStyle {
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
  bgColorHover?: string;
}

export interface SearchStyle {
  fontSize?: string;
  iconSize?: string;
  fontColor?: string;
  text?: string;
}

export interface TableStyles {
  thead?: TableSectionStyle;
  tbody?: TableSectionStyle;
  filterBox?: FilterBoxStyle;
  search?: SearchStyle;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  fieldToFilter: string;
  filters: FilterOption[];
}
