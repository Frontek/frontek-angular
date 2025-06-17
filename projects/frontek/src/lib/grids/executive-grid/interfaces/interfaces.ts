export interface Tag {
  text: string;
}


export type RowData = DataItem[];
export type TableData = RowData[];

export interface Styles {
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
  bgColorHover?: string;
  textAlignment?: string;
}
export interface Header {
  id?:number;
  field: string;
  header: string;
  styles? : Styles
}

export interface FieldDataItem {
  text?: string;
  image?: string;
  description?: string;
  tags?: Tag[];
}
export interface DataItem {
  id?: number;
  field: string;
  content: FieldDataItem;
  styles?: Styles;
}

export interface TableConfig {
  headers?: Header[];
  subheaders?: Header[];
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


export interface Configs {
  borderColor?: string;
  hoverColorOnDatas?: string;
  bgColor?: string;
  fontFamily?: string;
}
