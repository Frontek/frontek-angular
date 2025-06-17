import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataItem, Field, Styles } from '../../grids/executive-grid/interfaces/interfaces';

@Component({
  selector: 'td-content',
  imports: [CommonModule],
  templateUrl: './td-content.component.html',
  styleUrl: './td-content.component.scss'
})
export class TdContentComponent {
  @Input() data:any = {};
  @Input() styles: Styles = {};

  content:Field[] = [];

ngOnInit() {
  console.log('Data received in TdContentComponent:', this.data);
  console.log('Styles received in TdContentComponent:', this.styles);

  this.content = this.data;

  if (this.content && this.content.length > 0) {
    const imageItems = this.content.filter((item : Field) => item.type === 'image' && item.imgSrc);
    const otherItems = this.content.filter((item : Field) => !(item.type === 'image' && item.imgSrc));

    this.content = [...imageItems, ...otherItems].map((item: Field) => {
      if (item.type === 'image' && item.imgSrc) {
        return {...item };
      }
      return item;
    });
  }
  console.log('Reorganized content:', this.content);
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

  copyText(text: string = "",event: MouseEvent) {
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

      getStyle(style:Styles ,isHovered:boolean = false,elementType:string = ""){
        let obj;
        switch (elementType) {
          case "image":
            obj = {
              'width':'50px',
              'min-height': '50px',
              'max-height': '50px',
              'height': 'auto',
              'display': 'block',
              'border-radius': '.4rem',
              'margin-right': '.5rem',
              'object-fit': 'cover',
              'object-position': 'center',
            };
              break;
          case "text":
            obj = {
              'color': style.fontColor || '#fff',
            };
              break;
          case "description":
            obj = {
              'color': style.fontColor || '#94a3b8',
              'font-size': style.fontSize || '11px',
              'font-style': 'italic',
              'font-weight': 'bold',
            };
              break;
          case "tag":
            obj = {
              'font-size': style.fontSize || '11px',
              'padding': '.1rem .3rem',
              'border-radius': '.4rem',
              'color': style.fontColor || '#94a3b8',
              'border': `1px solid ${style.bgColor || '#f3f4f6'}`,
              'background-color': style.bgColor || '#f3f4f6',
            };
              break;
            };

        return obj;
      }
}
