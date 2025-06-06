import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'grid-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit, OnChanges {
  @Input() headers: { field: string, header: string }[] = [];
  @Input() data: Record<string, any>[] = [];
  @Input() headerBackgroundColor: string = '#2F3845';
  @Input() bodyBackgroundColor: string = '#1D2634';
  @Input() textColor: string = '#fff';
  @Input() textFontSize: string = '14px';
  @Input() textAlign: string = 'left';

  tableStyles: Record<string, string> = {};
  thStyles: Record<string, string> = {};
  tdStyles: Record<string, string> = {};
  containerStyles: Record<string, string> = {};
  columnWidths: number[] = [];

  ngOnInit() {
    this.columnWidths = this.headers.map(() => 150);
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
      'border-bottom': `1px solid ${this.headerBackgroundColor}`,
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
      const newWidth = startWidth + dx;
      this.columnWidths[index] = newWidth;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
