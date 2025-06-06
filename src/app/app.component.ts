import { Component } from '@angular/core';
import { GridComponent } from '../../projects/frontek/src/public-api';

@Component({
  selector: 'app-root',
  imports: [GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontek-angular';

  headers = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'email', header: 'Email' }
  ];

  data = [
    { name: 'Ana', age: 25, email: 'ana@email.com' },
    { name: 'Carlos', age: 30, email: 'carlos@email.com' },
    { name: 'João', age: 28, email: 'joao@email.com' }
  ];

  headerBackgroundColor = 'lightgray';
  bodyBackgroundColor = 'red';
  textColor = 'black';
  textFontSize = '16px';
  textAlign = 'left';

}
