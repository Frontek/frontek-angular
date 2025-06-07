import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'executive-grid-component',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class ExecutiveGridComponent implements OnInit, OnChanges {
  @Input() headers: { field: string, header: string }[] = [];
  @Input() data: Record<string, any>[] = [];
  @Input() headerBackgroundColor: string = '#2F3845';
  @Input() bodyBackgroundColor: string = '#1D2634';
  @Input() textColor: string = '#fff';
  @Input() textFontSize: string = '14px';
  @Input() textAlign: string = 'left';
  @Input() tableId: string = "frontek-grid-executive";


  tableStyles: Record<string, string> = {};
  thStyles: Record<string, string> = {};
  tdStyles: Record<string, string> = {};
  containerStyles: Record<string, string> = {};
  columnWidths: number[] = [];


    get storageKey(): string {
      return `gridConfig-${this.tableId}`;
    }

  ngOnInit() {
    this.loadGridConfig();
    if (this.columnWidths.length === 0) {
      this.columnWidths = this.headers.map(() => 200);
    }
  }

  ngOnChanges() {
    this.tableStyles = {
      'font-size': this.textFontSize,
      'color': this.textColor,
      'text-align': this.textAlign,
      'font-family': 'IBM Plex Sans, sans-serif',
    };
    this.thStyles = {
      'background-color': this.headerBackgroundColor,
      'border-bottom': `1px solid ${this.bodyBackgroundColor}`,
    };
    this.tdStyles = {
      // 'border-bottom': `1px solid ${this.headerBackgroundColor}`,
    };
    this.containerStyles = {
      'width': '100%',
      'background-color': this.bodyBackgroundColor,
      'border-radius': '8px',
    };
  }

  startResize(event: MouseEvent, index: number) {
    event.preventDefault();
    const startX = event.pageX;
    const startWidth = this.columnWidths[index];

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.pageX - startX;
      const newWidth = Math.max(startWidth + dx, 150);

      requestAnimationFrame(() => {
        const headerRow = document.querySelector('.custom-thead tr') as HTMLElement;
        const sumColumns = this.columnWidths.reduce((acc, width, idx) => {return  acc + width ;}, 0);

        const headerRowWidth = headerRow?.getBoundingClientRect().width || 0;
        console.log('Header row width:', headerRowWidth);

        if (sumColumns > headerRowWidth && newWidth > startWidth) {
          document.removeEventListener('mousemove', onMouseMove);
          return;
        }else{
          this.columnWidths[index] = newWidth;
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

  thHoverEffect(event: MouseEvent, index: number,remove: boolean = false) {
    const target = event.target as HTMLElement;
    if (remove) {
      target.style.backgroundColor = this.bodyBackgroundColor;
    } else {
      target.style.backgroundColor = this.headerBackgroundColor;
    }
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
    moveItemInArray(this.columnWidths, event.previousIndex, event.currentIndex);
    this.saveGridConfig();

    const trashbox = document.querySelector('.trash-columns') as HTMLElement;
    trashbox.style.opacity = '0';
    trashbox.style.left = '-100%';
  }
  initalDrag(){
    const trashbox = document.querySelector('.trash-columns') as HTMLElement;
    trashbox.style.left = '0';
    trashbox.style.opacity = '1';
  }

    private saveGridConfig() {
      const config = {
        headers: this.headers,
        columnWidths: this.columnWidths
      };
      localStorage.setItem(this.storageKey, JSON.stringify(config));
    }

  private loadGridConfig() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config?.headers && config?.columnWidths) {
          this.headers = config.headers;
          this.columnWidths = config.columnWidths;
        }
      } catch (err) {
        console.error('Erro ao carregar configuração da tabela:', err);
      }
    }
  }

 rotateArrow(event: MouseEvent) {
  const target = event.target as HTMLElement;

  // Exemplo: alternar classe 'closed'
  if (target.classList.contains('closed')) {
    target.classList.remove('closed');
    target.classList.add('opened');
  } else {
    target.classList.remove('opened');
    target.classList.add('closed');
  }

  // Ou use classList.toggle para simplificar
  // target.classList.toggle('closed');
}

}
