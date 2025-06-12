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
    // console.log('Data received in TdContentComponent:', this.data);
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

  copyText(text: string,event: MouseEvent) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const x = event.clientX;
        const y = event.clientY;
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Copiado';
        tooltip.style.position = 'absolute';
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.backgroundColor = 'green';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.zIndex = '1000';
        document.body.appendChild(tooltip);
        //animate the tooltip
        tooltip.style.transition = 'opacity 0.5s ease-in-out';
        tooltip.style.opacity = '1';
        setTimeout(() => {
          tooltip.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(tooltip);
          }, 300);
        }, 500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      console.warn('Clipboard API not supported');
    }
  }
}
