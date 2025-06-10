import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-content',
  imports: [CommonModule],
  templateUrl: './td-content.component.html',
  styleUrl: './td-content.component.scss'
})
export class TdContentComponent {
  @Input() data:any = {};

  ngOnInit() {
    console.log('td-content data:', this.data);
  }

  hexToRgba(hex: string, alpha: number): string {
    let r = 0, g = 0, b = 0;
      if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      console.log( `rgba(${r},${g},${b},0.${alpha})`)
      return `rgba(${r},${g},${b},0.${alpha})`;
  }
}
