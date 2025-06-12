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
    { field: 'item', header: 'MLB' },
    // { field: 'fornecedor', header: 'Fornecedor' },
    // { field: 'envio', header: 'Envio' },
    // { field: 'status', header: 'Status' },
    // { field: 'preco_ativo', header: 'Preço Ativo' },
    // { field: 'margem_ativa', header: 'Margem Ativa' },
    // { field: 'preco_ganhar_catalogo', header: 'Preço Ganhar Catálogo' },
    // { field: 'margem_ganhar_catalogo', header: 'Margem Ganhar Catálogo' },
    // { field: 'margem_minima', header: 'Margem Mínima' },
    // { field: 'margem_objetivo', header: 'Margem Objetivo' },
    // { field: 'comissao', header: 'Comissão' },
    // { field: 'imposto', header: 'Imposto' },
    // { field: 'taxa_fixa', header: 'Taxa Fixa' },
    // { field: 'frete', header: 'Frete' },
    // { field: 'custo_sku', header: 'Custo Sku' },
  ];

  subheaders = [
    { field: 'nome', header: 'Nome' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'ativo', header: 'Ativo' },
    { field: 'margem', header: 'Margem' },
    { field: 'rebate', header: 'Rebate' },
    { field: 'data_inicio', header: 'Data Inicio' },
    { field: 'data_termino', header: 'Data Término' },
    { field: 'campanha_valida', header: 'Campanha Válida' },
    { field: 'comissao_vendedor', header: 'Comissão Vendedor' },
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
   [
      { field:'item',content:{text:'MLB4563170846',image:`https://http2.mlstatic.com/D_796127-MLU70370396427_072023-O.jpg`,},},
      { field: 'fornecedor', content: { text: 'KAPPESBERG' } },
      { field: 'envio', content: { text: 'me2' } },
      { field: 'status', content: { text: 'perdendo', type: 'badge', color: 'red' } },
      { field: 'preco_ativo', content: { text: 'R$ 335,15' } },
      { field: 'margem_ativa', content: { text: 'R$ 78,64' } },
      { field: 'preco_ganhar_catalogo', content: { text: 'R$ 395,00' } },
      { field: 'margem_ganhar_catalogo', content: { text: '0,07%' } },
      { field: 'margem_minima', content: { text: '5,00%' } },
      { field: 'margem_objetivo', content: { text: '10,00%' } },
      { field: 'comissao', content: { text:'R$ 72,91' } },
      { field: 'imposto', content: { text:'R$ 64,35' } },
      { field: 'taxa_fixa', content:{text:'R$ 0,00'}},
      { field: 'frete', content:{text:'R$ 98,95'}},
      { field: 'custo_sku', content:{text:'R$ 139,19'}},

   ]
  ]

  // data = [
  //   {
  //     fullName: {
  //       text: 'Alice',
  //       image: `https://http2.mlstatic.com/D_NQ_NP_783991-MLB84824567917_052025-O-cadeira-kappesberg-sala-de-jantar-cozinha-metal-marrom-2-un.webp`,
  //       description: 'De Abreu'
  //     },
  //     department: {
  //       text: 'Marketing',
  //       tags:[
  //         { text: 'Digital Marketing' },
  //         { text: 'Content Creation' },
  //         { text: 'SEO' }
  //       ]
  //     },
  //     position: { text: 'Marketing Strategist'},
  //     email: { text: 'Alice@gmail.com'},
  //     phone: { text: '555-1234'},
  //     office: { text: 'New York Office'},
  //     hireDate: { text: '2020-05-15'},
  //     employeeId: { text: 'EMP001'},
  //     status: { text:'Active',type:'badge', color: 'green' },
  //     subdatas: {
  //       projectName: 'Product Launch Q3',
  //       role: 'Lead Strategist',
  //       status: 'In Progress'
  //     }
  //   },
  // ];

  headerBackgroundColor = 'lightgray';
  bodyBackgroundColor = 'red';
  textColor = 'black';
  textFontSize = '16px';
  textAlign = 'left';

}
