import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { TdContentComponent } from '../../components/td-content/td-content.component';
import { TableData, TableStyles, FilterConfig, TableConfig, Styles, Configs } from './interfaces/interfaces';

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
  @Input() rowData: TableData  = [];


  @Input() configs: Configs = {}
  @Input() filter: FilterConfig = {fieldToFilter: '',filters: []}

  @Input() tableIdentifier: string = "frontek-grid-executive";

  @Input() styles:TableStyles = {
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
  // searchIcon: Record<string, string> = {};
  // filtersBox: Record<string, string> = {};
  // activeFilter: Record<string, string> = {};
  // input: Record<string, string> = {};

  // Column sizes
  headersWidths: { [id: number]: number } = {};
  subHeadersWidths: { [id: number]: number } = {};
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

    this.tableHeaders.headers = this.tableHeaders.headers?.map((header, index) => {return {...header,id:header.id || this.idGenerator(existingHeadersIds,existingDatasIds,'header')};});
    this.tableHeaders.subheaders = this.tableHeaders.subheaders?.map((subheader, index) => {return {...subheader,id:subheader.id || this.idGenerator(existingHeadersIds,existingDatasIds,'header')};});
    this.filteredData = this.rowData.map((row, rowIndex) => {
      return row.map(item => {
        return {...item, id: item.id || this.idGenerator(existingHeadersIds, existingDatasIds, 'data')};
      });
    });


    this.headersWidths = Object.fromEntries(this.tableHeaders.headers?.map(header => [header.id!, 200]) ?? []);
    this.subHeadersWidths = Object.fromEntries(this.tableHeaders.subheaders?.map(subheader => [subheader.id!, 200]) ?? []);
  }

  ngOnChanges() {}



    getStyle(style:Styles ,isHovered:boolean = false,elementType:string = ""){
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

    onColumnResizeStart(event: MouseEvent, id: number,column: 'header' | 'subheader') {
      event.preventDefault();
      const startX = event.pageX;
      let initialWidth = 200;
      if( column === 'header') {
        initialWidth = this.headersWidths ? this.headersWidths[id] : 200;
      }
      if( column === 'subheader') {
        initialWidth = this.subHeadersWidths ? this.subHeadersWidths[id] : 200;
      }

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - startX;
        const updatedWidth = Math.max(initialWidth + deltaX, 150);

        requestAnimationFrame(() => {
          const headerRow = document.querySelector('.thead tr') as HTMLElement;
          let totalColumnWidth = 0;

          if (column === 'header') {
            totalColumnWidth = Object.values(this.headersWidths).reduce((sum, width) => sum + width, 0);
          }
          if (column === 'subheader') {
            totalColumnWidth = Object.values(this.subHeadersWidths).reduce((sum, width) => sum + width, 0);
          }

          const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;

          if (totalColumnWidth > headerRowWidth && updatedWidth > initialWidth) {
            document.removeEventListener('mousemove', onMouseMove);
            return;
          } else {
            if (column === 'header') {
              if (this.headersWidths) {
                this.headersWidths[id] = updatedWidth;
              }
            }
            if (column === 'subheader') {
              if (this.subHeadersWidths) {
                this.subHeadersWidths[id] = updatedWidth;
              }
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

}

