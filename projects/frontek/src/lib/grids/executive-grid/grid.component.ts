import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { TdContentComponent } from '../../components/td-content/td-content.component';
import { TableData,Headers, TableStyles, FilterConfig } from './interfaces/interfaces';

@Component({
  selector: 'executive-grid-component',
  standalone: true,
  imports: [CommonModule, DragDropModule,FormsModule,TdContentComponent],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css', './icons.css']

})
export class ExecutiveGridComponent implements OnInit, OnChanges {
  // Input properties
  @Input() headers: Headers = [];
  @Input() subColumnDefinitions: Headers = [];
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
  tableStyle: Record<string, string> = {};
  subtableStyle: Record<string, string> = {};
  theadStyle: Record<string, string> = {};
  subtheadStyle: Record<string, string> = {};
  tbodyStyle: Record<string, string> = {};
  subtbodyStyle: Record<string, string> = {};
  searchIcon: Record<string, string> = {};
  filtersBox: Record<string, string> = {};
  activeFilter: Record<string, string> = {};
  input: Record<string, string> = {};
  trWithDropStyle: Record<string, string> = {};

  // Column sizes
  headersWidths: number[] = [];
  subHeadersWidths: number[] = [];

  expandedRows: Set<number> = new Set();
  expandedRowsHeight: { [key: number]: string } = {};

  searchTerm: string = '';
  filteredData: TableData  = [];
  activeFilterValue: string = '';


  get localStorageKey(): string {
    return `gridConfig-${this.tableIdentifier}`;
  }

  ngOnInit() {
    this.filteredData = [...this.rowData];

    if (this.headersWidths.length === 0) {
      this.headersWidths = this.headers.map(() => 200);
    }

    if (this.subHeadersWidths.length === 0) {
      this.subHeadersWidths = this.subColumnDefinitions.map(() => 200);
    }

    // map para padroznar o value dos filters
    this.filter.filters = this.filter.filters.map(f => ({
      ...f,
      value: f.value.toLowerCase().trim()
    }));
  }

  ngOnChanges() {
    this.tableStyle = {
      'font-size': `${this.styles.tbody?.fontSize}`,
      'font-family': 'Arial, sans-serif',
    };

    this.theadStyle = {
      'background-color': `${this.styles.thead?.bgColor}`,
      'font-size': `${this.styles.thead?.fontSize}`,
      'color': `${this.styles.thead?.fontColor}`,
      'text-align': `${this.styles.thead?.textAlignment}`,
    };
    this.subtheadStyle = {
      'background-color': `${this.styles.thead?.bgColor}`,
      'font-size': `13px`,
      'color': `${this.styles.thead?.fontColor}`,
      'text-align': `${this.styles.thead?.textAlignment}`,
    };

    this.tbodyStyle = {
      'width': '100%',
      'background-color': `${this.styles.tbody?.bgColor}`,
      'font-size': `${this.styles.tbody?.fontSize}`,
      'color': `${this.styles.tbody?.fontColor}`,
      'text-align': `${this.styles.tbody?.textAlignment}`,
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
    this.trWithDropStyle = {
      'border-bottom': `1px solid ${this.styles.thead?.bgColorHover}`,
    }
  }

  // Column Resize Handler
  onColumnResizeStart(event: MouseEvent, columnIndex: number) {
    event.preventDefault();
    const startX = event.pageX;
    const initialWidth = this.headersWidths[columnIndex];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const updatedWidth = Math.max(initialWidth + deltaX, 150);

      requestAnimationFrame(() => {
        const headerRow = document.querySelector('.custom-thead tr') as HTMLElement;
        const totalColumnWidth = this.headersWidths.reduce((sum, width) => sum + width, 0);
        const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;

        if (totalColumnWidth > headerRowWidth && updatedWidth > initialWidth) {
          document.removeEventListener('mousemove', onMouseMove);
          return;
        } else {
          this.headersWidths[columnIndex] = updatedWidth;
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
  onSubColumnResizeStart(event: MouseEvent, columnIndex: number) {
    event.preventDefault();
    const startX = event.pageX;
    const initialWidth = this.subHeadersWidths[columnIndex];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const updatedWidth = Math.max(initialWidth + deltaX, 150);

      requestAnimationFrame(() => {
        const headerRow = document.querySelector('.custom-thead tr') as HTMLElement;
        const totalColumnWidth = this.headersWidths.reduce((sum, width) => sum + width, 0);
        const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;

        console.log('Header row width:', headerRowWidth);

        if (totalColumnWidth > headerRowWidth && updatedWidth > initialWidth) {
          document.removeEventListener('mousemove', onMouseMove);
          return;
        } else {
          this.subHeadersWidths[columnIndex] = updatedWidth;
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

  // Header Hover Styling
  onHeaderHover(event: MouseEvent, columnIndex: number, reset: boolean = false) {
    const element = event.target as HTMLElement;
    element.style.backgroundColor = reset ? `${this.styles.thead?.bgColorHover}` : `${this.styles.thead?.bgColor}`;
  }
  onTrHover(event: MouseEvent, columnIndex: number, reset: boolean = false) {
    const element = event.target as HTMLElement;
    element.style.backgroundColor = reset ? `${this.styles.tbody?.bgColorHover}` : `${this.styles.tbody?.bgColor}`;
  }

  // Drag-and-drop column reorder
  onColumnDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
    moveItemInArray(this.headersWidths, event.previousIndex, event.currentIndex);
    this.persistGridConfig();

    const trashArea = document.querySelector('.trash-columns') as HTMLElement;
    trashArea.style.opacity = '0';
    trashArea.style.left = '-100%';
  }

  onColumnDragStart() {
    const trashArea = document.querySelector('.trash-columns') as HTMLElement;
    trashArea.style.left = '0';
    trashArea.style.opacity = '1';
  }

  // Persist and retrieve layout settings
  private persistGridConfig() {
    const config = {
      headers: this.headers,
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
          this.headers = config.headers;
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

  toggleRowExpansion(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  // Função opcional para simplificar a verificação no template
  isRowExpanded(index: number): boolean {
    return this.expandedRows.has(index);
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

