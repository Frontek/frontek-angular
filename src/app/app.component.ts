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

  // headers = [
  //   { field: 'name', header: 'Name' },
  //   { field: 'age', header: 'Age' },
  //   { field: 'email', header: 'Email' },
  //   { field: 'phone', header: 'Phone' },
  //   { field: 'address', header: 'Address' },
  //   { field: 'city', header: 'City' },
  //   { field: 'state', header: 'State' },
  //   { field: 'country', header: 'Country' },
  //   { field: 'zipcode', header: 'Zip Code' },
  //   { field: 'gender', header: 'Gender' },
  //   { field: 'birthdate', header: 'Birthdate' },
  //   { field: 'profession', header: 'Profession' },
  //   { field: 'company', header: 'Company' },
  //   { field: 'salary', header: 'Salary' },
  //   { field: 'maritalStatus', header: 'Marital Status' },
  //   { field: 'children', header: 'Children' },
  //   { field: 'education', header: 'Education' },
  //   { field: 'hobby', header: 'Hobby' },
  //   { field: 'language', header: 'Language' },
  //   { field: 'notes', header: 'Notes' }
  // ];
  headers = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'address', header: 'Address' },
  ];

data = [
  {
    name: 'Ana',
    age: 25,
    email: 'ana@email.com',
    phone: '11999999999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipcode: '01000-000',
    gender: 'Feminino',
    birthdate: '1999-01-01',
    profession: 'Engenheira',
    company: 'TechCorp',
    salary: 7000,
    maritalStatus: 'Solteira',
    children: 0,
    education: 'Superior Completo',
    hobby: 'Leitura',
    language: 'Português',
    notes: 'Nenhuma'
  },
  {
    name: 'Carlos',
    age: 30,
    email: 'carlos@email.com',
    phone: '21988888888',
    address: 'Av. Central, 456',
    city: 'Rio de Janeiro',
    state: 'RJ',
    country: 'Brasil',
    zipcode: '20000-000',
    gender: 'Masculino',
    birthdate: '1994-05-15',
    profession: 'Designer',
    company: 'DesignPro',
    salary: 6000,
    maritalStatus: 'Casado',
    children: 1,
    education: 'Superior Incompleto',
    hobby: 'Fotografia',
    language: 'Português',
    notes: 'Prefere contato por email'
  },
  {
    name: 'João',
    age: 28,
    email: 'joao@email.com',
    phone: '31977777777',
    address: 'Rua Verde, 789',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brasil',
    zipcode: '30000-000',
    gender: 'Masculino',
    birthdate: '1996-07-20',
    profession: 'Desenvolvedor',
    company: 'CodeHouse',
    salary: 8000,
    maritalStatus: 'Solteiro',
    children: 0,
    education: 'Mestrado',
    hobby: 'Jogos',
    language: 'Inglês',
    notes: 'Disponível para viagens'
  }
];

  headerBackgroundColor = 'lightgray';
  bodyBackgroundColor = 'red';
  textColor = 'black';
  textFontSize = '16px';
  textAlign = 'left';

}
