import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { TdContentComponent } from '../../components/td-content/td-content.component';
import { TableData, TableStyles, FilterConfig, TableConfig, HeadersStyle, Configs } from './interfaces/interfaces';

@Component({
  selector: 'executive-grid-component',
  standalone: true,
  imports: [CommonModule, DragDropModule,FormsModule,TdContentComponent],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css', './icons.css']

})
export class ExecutiveGridComponent implements OnInit, OnChanges {
  // Input properties
  @Input() tableHeaders: TableConfig = {
    headers: [],
    subheaders: []
  }
  @Input() configs: Configs = {}
  @Input() filter: FilterConfig = {fieldToFilter: '',filters: []}

  @Input() rowData: TableData  = [];
  @Input() tableIdentifier: string = "frontek-grid-executive";

  @Input() styles:TableStyles = {
    thead: {
      fontSize: '15px',
      fontColor: '#fff',
      bgColor: '#2F3845',
      bgColorHover: '#3A4452',
      textAlignment: 'left'
    },
    tbody: {
      fontSize: '15px',
      fontColor: '#fff',
      bgColor: '#1D2634',
      bgColorHover: '#2F3845',
      textAlignment: 'left'
    },
    filterBox: {
      fontSize: '15px',
      fontColor: '#fff',
      bgColor: '#2F3845',
      bgColorHover: '#3A4452'
    },
    search: {
      fontSize: '15px',
      iconSize: '20px',
      fontColor: '#2F3845',
      text: 'Search...'
    }
  };

  // Style bindings
  subtableStyle: Record<string, string> = {};
  subtheadStyle: Record<string, string> = {};
  subtbodyStyle: Record<string, string> = {};
  searchIcon: Record<string, string> = {};
  filtersBox: Record<string, string> = {};
  activeFilter: Record<string, string> = {};
  input: Record<string, string> = {};

  // Column sizes
  headersWidths: { [id: number]: number } = {};
  subHeadersWidths?: number[] = [];
  headerHovered: boolean[] = [];
  bodyHovered: boolean[] = [];

  expandedRows: Set<number> = new Set();
  expandedRowsHeight: { [key: number]: string } = {};

  searchTerm: string = '';
  filteredData: TableData  = [];
  activeFilterValue: string = '';


  get localStorageKey(): string {
    return `gridConfig-${this.tableIdentifier}`;
  }

  ngOnInit() {
    const existingHeadersIds = new Set<number>(this.tableHeaders.headers?.map(h => h.id).filter(id => id !== undefined) as number[]);
    const existingDatasIds = new Set<number>(this.filteredData.map(row => row.map(item => item.id)).flat().filter(id => id !== undefined) as number[]);

    this.tableHeaders.headers = this.tableHeaders.headers?.map((header, index) => {
      return {...header,id:header.id || this.idGenerator(existingHeadersIds,existingDatasIds,'header')};
    });

    this.filteredData = this.rowData.map((row, rowIndex) => {
      return row.map(item => {
        return {...item, id: item.id || this.idGenerator(existingHeadersIds, existingDatasIds, 'data')};
      });
    });

    if (this.subHeadersWidths?.length === 0) {
      this.subHeadersWidths = this.tableHeaders.subheaders?.map(() => 200);
    }


    this.headersWidths = Object.fromEntries(
      this.tableHeaders.headers?.map(header => [header.id!, 200]) ?? []
    );

  }

  ngOnChanges() {
    this.subtheadStyle = {
      'background-color': `${this.styles.thead?.bgColor}`,
      'font-size': `13px`,
      'color': `${this.styles.thead?.fontColor}`,
      'text-align': `${this.styles.thead?.textAlignment}`,
    };
    this.subtbodyStyle = {
      'background-color': `${this.styles.tbody?.bgColor}`,
      'font-size': `13px`,
      'color': `${this.styles.tbody?.fontColor}`,
      'text-align': `${this.styles.tbody?.textAlignment}`,
    };

    this.searchIcon = {
      'font-size': `${this.styles.search?.iconSize}`,
      'color': `${this.styles.search?.fontColor}`
    };

    this.filtersBox = {
      'background-color': `${this.styles.filterBox?.bgColor}`,
      'font-size': `${this.styles.filterBox?.fontSize}`,
      'color': `${this.styles.filterBox?.fontColor}`,
    };
    this.activeFilter = {
      'background-color': `${this.styles.filterBox?.bgColorHover}`,
    };
    this.input = {
      'font-size': `${this.styles.search?.fontSize}`,
      'color': `${this.styles.search?.fontColor}`,
    };
  }



    getStyle(style:HeadersStyle ,isHovered:boolean = false,elementType:string = ""){
      let obj;
      if(!elementType) {
        obj= {
            'background-color': isHovered ? (style.bgColorHover || '#4a5568') : (style.bgColor || '#2F3845'),
            'font-size': style.fontSize || '14px',
            'color': style.fontColor || '#fff',
          }
      }

      return obj;
    }

    getConfigStyles(style:Configs ,isHovered:boolean = false,elementType:string){
      let obj;

      switch (elementType) {
        case 'container':
          obj = {
            'background-color': style.bgColor || '#1D2634',
          };
          break;
        case 'table':
          obj = {
            'font-family': style.fontFamily || 'Arial, sans-serif',
          };
          break;
        case 'tr':
          obj = {
            'border-bottom': `1px solid ${style.borderColor || '#2F3845'}`,
            'background-color': isHovered ? style.hoverColorOnDatas || '#2F3845' : style.bgColor || '#1D2634',
          };
          break;
        }

      return obj;
    }

    onHover(index: number, hovering: boolean,elementType:string) {
      switch (elementType) {
        case 'th':
          this.headerHovered[index] = hovering;
          break;
        case 'tr':
          this.bodyHovered[index] = hovering;
          break;
        }
    }

    toggleRowExpansion(index: number): void {
      if (this.expandedRows.has(index)) {
        this.expandedRows.delete(index);
      } else {
        this.expandedRows.add(index);
      }
    }

    isRowExpanded(index: number): boolean {
      return this.expandedRows.has(index);
    }

    idGenerator(headersIDs: Set<number>,dataIDs: Set<number>,type:string): number {
       let id;
        do {
          id = Math.floor(Math.random() * 1000000);
        } while (headersIDs.has(id) || dataIDs.has(id));

        if(type === 'data') {
          dataIDs.add(id);
        }
        if(type === 'header') {
          headersIDs.add(id);
        }

        return id;
    }

    onColumnDrop(event: CdkDragDrop<any>) {
      const droppedItem = event.item;
      const id = droppedItem.data.id;
      if (!event.isPointerOverContainer) {
          this.tableHeaders.headers = this.tableHeaders.headers?.filter(header => header.id !== id);
          return;
      }

      if (event.previousIndex !== event.currentIndex) {
        moveItemInArray(this.tableHeaders.headers || [], event.previousIndex, event.currentIndex);
      }
    }




  // Column Resize Handler
  onColumnResizeStart(event: MouseEvent, id: number) {
    event.preventDefault();
    const startX = event.pageX;
    const initialWidth = this.headersWidths ? this.headersWidths[id] : 200;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const updatedWidth = Math.max(initialWidth + deltaX, 150);

      requestAnimationFrame(() => {
        const headerRow = document.querySelector('.thead tr') as HTMLElement;
        const totalColumnWidth = Object.values(this.headersWidths).reduce((sum, width) => sum + width, 0);
        const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;

        if (totalColumnWidth > headerRowWidth && updatedWidth > initialWidth) {
          document.removeEventListener('mousemove', onMouseMove);
          return;
        } else {
          if (this.headersWidths) {
            this.headersWidths[id] = updatedWidth;
          }
        }
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Column Resize Handler
  onSubColumnResizeStart(event: MouseEvent, id: number) {
    event.preventDefault();
    const startX = event.pageX;
    const initialWidth = this.subHeadersWidths ? this.subHeadersWidths[id] : 200;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const updatedWidth = Math.max(initialWidth + deltaX, 150);

      // requestAnimationFrame(() => {
      //   const headerRow = document.querySelector('.custom-thead tr') as HTMLElement;
      //   const totalColumnWidth = this.subHeadersWidths?.reduce((sum, width) => sum + width, 0) || 0;
      //   const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;

      //   console.log('Header row width:', headerRowWidth);

      //   if (totalColumnWidth > headerRowWidth && updatedWidth > initialWidth) {
      //     document.removeEventListener('mousemove', onMouseMove);
      //     return;
      //   } else {
      //     if (this.subHeadersWidths) {
      //       this.subHeadersWidths[id] = updatedWidth;
      //     }
      //   }
      // });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  onTrHover(event: MouseEvent, columnIndex: number, reset: boolean = false) {
    const element = event.target as HTMLElement;
    element.style.backgroundColor = reset ? `${this.styles.tbody?.bgColorHover}` : `${this.styles.tbody?.bgColor}`;
  }


  // Persist and retrieve layout settings
  private persistGridConfig() {
    const config = {
      headers: this.tableHeaders.headers,
      columnWidths: this.headersWidths
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(config));
  }

  private loadStoredGridConfig() {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      try {
        const config = JSON.parse(stored);
        if (config?.headers && config?.columnWidths) {
          this.tableHeaders.headers = config.headers;
          this.headersWidths = config.columnWidths;
        }
      } catch (err) {
        console.error('Erro ao carregar configuração da tabela:', err);
      }
    }
  }

  // Toggle icon class (for expand/collapse)
  toggleArrowDirection(event: MouseEvent) {
    const arrowIcon = event.target as HTMLElement;
    arrowIcon.classList.toggle('closed');
    arrowIcon.classList.toggle('opened');
  }

  findData() {
    if (!this.searchTerm) {
      this.filteredData = [...this.rowData];
      return;
    }

    const term = this.searchTerm.toLowerCase();

    this.filteredData = this.rowData.filter(row => {
      const directMatch = Object.entries(row).some(([key, value]) => {
        if (key === 'subdatas' && typeof value === 'object' && value !== null) {
          return Object.values(value).some(subVal =>
            String(subVal).toLowerCase().includes(term)
          );
        } else {
          return String(value).toLowerCase().includes(term);
        }
      });
      return directMatch;
    });

    if (this.filteredData.length === 0) {
      this.filteredData = [];
    }
  }

  onFilterChange(event: MouseEvent,value:string){
    // const element = event.target as HTMLElement;
    // const filterValue = value;
    // const fieldToFilter = this.filter.fieldToFilter;
    // this.filteredData = [...this.rowData];
    // if (filterValue) {
    //   this.activeFilterValue = filterValue;
    //   this.filteredData = this.filteredData.filter(row => {
    //     const fieldValue = row[fieldToFilter];
    //     return fieldValue && String(fieldValue).toLowerCase().includes(filterValue.toLowerCase());
    //   });
    // } else {
    //   this.activeFilterValue = '';
    //   this.filteredData = [...this.rowData];
    // }

  }
}

