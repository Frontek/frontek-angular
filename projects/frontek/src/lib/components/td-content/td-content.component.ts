import { Component, Input } from '@angular/core';

@Component({
  selector: 'td-content',
  imports: [],
  templateUrl: './td-content.component.html',
  styleUrl: './td-content.component.scss'
})
export class TdContentComponent {
  @Input() data:any = {};

  ngOnInit() {
    console.log('td-content data:', this.data);
  }
}
