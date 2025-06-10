import { Component } from '@angular/core';
import { SimpleGridComponent,ExecutiveGridComponent } from '../../projects/frontek/src/public-api';

@Component({
  selector: 'app-root',
  imports: [SimpleGridComponent,ExecutiveGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontek-angular';

  headers = [
    { field: 'fullName', header: 'Full Name' },
    { field: 'department', header: 'Department' },
    { field: 'position', header: 'Position' },
    { field: 'email', header: 'Email' },
    { field: 'status', header: 'Status' }
  ];

  subheaders = [
    { field: 'projectName', header: 'Project' },
    { field: 'role', header: 'Role' },
    { field: 'status', header: 'Status' }
  ];

  filter = {
    fieldToFilter: 'status',
    filters: [
      { label: 'Todos', value: '' },
      { label: 'Ativo', value: 'active' },
      { label: 'On Leave', value: 'on leave' },
    ]
  };

  data = [
    {
      fullName: { text: 'Alice',},
      department: { text: 'Marketing'},
      position: { text: 'Marketing Strategist'},
      email: { text: 'Alice@gmail.com'},
      phone: { text: '555-1234'},
      office: { text: 'New York Office'},
      hireDate: { text: '2020-05-15'},
      employeeId: { text: 'EMP001'},
      status: { text: 'Active', color: 'green' },
      subdatas: {
        projectName: 'Product Launch Q3',
        role: 'Lead Strategist',
        status: 'In Progress'
      }
    },
    // {
    //   fullName: 'Brian Smith',
    //   department: 'Engineering',
    //   position: 'Senior Developer',
    //   email: 'brian.smith@company.com',
    //   phone: '555-5678',
    //   office: 'Remote',
    //   hireDate: '2019-07-01',
    //   employeeId: 'EMP002',
    //   status: 'Active',
    //   subdatas: {
    //     projectName: 'Platform Migration',
    //     role: 'Backend Developer',
    //     status: 'Completed'
    //   }
    // },
    // {
    //   fullName: 'Carla Mendes',
    //   department: 'Human Resources',
    //   position: 'HR Specialist',
    //   email: 'carla.mendes@company.com',
    //   phone: '555-8765',
    //   office: 'São Paulo Office',
    //   hireDate: '2021-01-10',
    //   employeeId: 'EMP003',
    //   status: 'On Leave',
    //   subdatas: {
    //     projectName: 'Onboarding Revamp',
    //     role: 'Coordinator',
    //     status: 'Pending'
    //   }
    // }
  ];

  headerBackgroundColor = 'lightgray';
  bodyBackgroundColor = 'red';
  textColor = 'black';
  textFontSize = '16px';
  textAlign = 'left';

}
