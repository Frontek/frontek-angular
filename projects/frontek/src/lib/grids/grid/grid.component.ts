import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'grid-component',
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

  @Input() headers: { field: string, header: string }[] = [];
  @Input() data: Record<string, any>[] = [];
  @Input() headerBackgroundColor: string = '#28313E';
  @Input() bodyBackgroundColor: string = '#182230';
  @Input() textColor: string = '#fff';
  @Input() textFontSize: string = '1rem';
  @Input() textAlign: string = 'left';


  tableStyles: Record<string, string> = {};
  thStyles: Record<string, string> = {};
  tdStyles: Record<string, string> = {};

    ngOnChanges() {
      this.tableStyles = {
        'font-size': this.textFontSize,
        'color': this.textColor,
        'text-align': this.textAlign,
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      };
      this.thStyles = {
        'background-color': this.headerBackgroundColor,
      };
      this.tdStyles = {
        'background-color': this.bodyBackgroundColor,
      };
  }


}
