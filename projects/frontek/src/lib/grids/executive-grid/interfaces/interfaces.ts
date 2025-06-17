export interface Styles {
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
  bgColorHover?: string;
  textAlignment?: string;
}

export interface Field{
  text?: string;
  type: 'text' | 'badge' | 'image' | 'link' | 'description' | 'tag';
  styles?: Styles;
  link?: string;
  imgSrc?: string;
}
export interface DataItem {
  id?: number;
  field: string;
  content: Field[];
}

export interface Header {
  id?:number;
  field: string;
  header: string;
  styles? : Styles
}

export interface TableConfig {
  headers?: Header[];
  subheaders?: Header[];
}

export type RowData = DataItem[];
export type TableData = RowData[];




//NEED IMPROVEMENT

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
