import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'executive-grid-component',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',

})
export class ExecutiveGridComponent implements OnInit, OnChanges {
  // Input properties
  @Input() columnDefinitions: { field: string, header: string }[] = [];
  @Input() subColumnDefinitions: { field: string, header: string }[] = [];
  @Input() rowData: Record<string, any>[] = [];

  @Input() headerBgColor: string = '#2F3845';
  @Input() bodyBgColor: string = '#1D2634';
  @Input() fontColor: string = '#fff';
  @Input() fontSize: string = '14px';
  @Input() textAlignment: string = 'left';
  @Input() tableIdentifier: string = "frontek-grid-executive";

  // Style bindings
  tableStyle: Record<string, string> = {};
  subtableStyle: Record<string, string> = {};
  headerCellStyle: Record<string, string> = {};
  dataCellStyle: Record<string, string> = {};
  wrapperStyle: Record<string, string> = {};

  // Column sizes
  columnWidths: number[] = [];
  subColumnWidths: number[] = [];

  expandedRows: Set<number> = new Set();
  expandedRowsHeight: { [key: number]: string } = {};

  get localStorageKey(): string {
    return `gridConfig-${this.tableIdentifier}`;
  }

  ngOnInit() {
    console.log(this.subColumnDefinitions);

    this.loadStoredGridConfig();

    if (this.columnWidths.length === 0) {
      this.columnWidths = this.columnDefinitions.map(() => 200);
    }

    if (this.subColumnWidths.length === 0) {
      this.subColumnWidths = this.subColumnDefinitions.map(() => 200);
    }
  }

  ngOnChanges() {
    this.tableStyle = {
      'font-size': this.fontSize,
      'color': this.fontColor,
      'text-align': this.textAlignment,
      'font-family': 'IBM Plex Sans, sans-serif',
    };

    this.headerCellStyle = {
      'background-color': this.headerBgColor,
      'border-bottom': `1px solid ${this.bodyBgColor}`,
    };

    this.dataCellStyle = {
      // Optional customization for <td>
    };

    this.wrapperStyle = {
      'width': '100%',
      'background-color': this.bodyBgColor,
    };

    this.subtableStyle = {
      'border-bottom': `1px solid ${this.headerBgColor}`,
      'font-size': this.fontSize,
      'color': this.fontColor,
      'text-align': this.textAlignment,
    };
  }

  // Column Resize Handler
  onColumnResizeStart(event: MouseEvent, columnIndex: number) {
    event.preventDefault();
    const startX = event.pageX;
    const initialWidth = this.columnWidths[columnIndex];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const updatedWidth = Math.max(initialWidth + deltaX, 150);

      requestAnimationFrame(() => {
        const headerRow = document.querySelector('.custom-thead tr') as HTMLElement;
        const totalColumnWidth = this.columnWidths.reduce((sum, width) => sum + width, 0);
        const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;

        console.log('Header row width:', headerRowWidth);

        if (totalColumnWidth > headerRowWidth && updatedWidth > initialWidth) {
          document.removeEventListener('mousemove', onMouseMove);
          return;
        } else {
          this.columnWidths[columnIndex] = updatedWidth;
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
    element.style.backgroundColor = reset ? this.bodyBgColor : this.headerBgColor;
  }

  // Drag-and-drop column reorder
  onColumnDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columnDefinitions, event.previousIndex, event.currentIndex);
    moveItemInArray(this.columnWidths, event.previousIndex, event.currentIndex);
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
      headers: this.columnDefinitions,
      columnWidths: this.columnWidths
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(config));
  }

  private loadStoredGridConfig() {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      try {
        const config = JSON.parse(stored);
        if (config?.headers && config?.columnWidths) {
          this.columnDefinitions = config.headers;
          this.columnWidths = config.columnWidths;
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
}
