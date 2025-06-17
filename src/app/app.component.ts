import { DataItem, TableConfig, TableData } from './../../projects/frontek/src/lib/grids/executive-grid/interfaces/interfaces';
import { Component } from '@angular/core';
import { SimpleGridComponent,ExecutiveGridComponent } from '../../projects/frontek/src/public-api';

@Component({
  selector: 'app-root',
  imports: [ExecutiveGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontek-angular';

  //  header example { field: 'item', header: 'MLB', styles: { fontSize: '16px', fontColor: 'black', bgColor: 'lightgray',bgColorHover:'red'} }
  // headers = [
  //   { field: 'item', header: 'MLB' },
  //   { field: 'fornecedor', header: 'Fornecedor' },
  //   { field: 'envio', header: 'Envio' },
  //   { field: 'status', header: 'Status' },
  //   { field: 'preco_ativo', header: 'Preço Ativo' },
  //   { field: 'margem_ativa', header: 'Margem Ativa' },
  //   { field: 'preco_ganhar_catalogo', header: 'Preço Ganhar Catálogo' },
  //   { field: 'margem_ganhar_catalogo', header: 'Margem Ganhar Catálogo' },
  //   { field: 'margem_minima', header: 'Margem Mínima' },
  //   { field: 'margem_objetivo', header: 'Margem Objetivo' },
  //   { field: 'comissao', header: 'Comissão' },
  //   { field: 'imposto', header: 'Imposto' },
  //   { field: 'taxa_fixa', header: 'Taxa Fixa' },
  //   { field: 'frete', header: 'Frete' },
  //   { field: 'custo_sku', header: 'Custo Sku' },
  // ];
  headers: TableConfig = {
    headers:[
      { field: 'item', header: 'MLB'},
      { field: 'fornecedor', header: 'Fornecedor' },
      { field: 'envio', header: 'Envio' },
    ],
    subheaders: [
      { field: 'fornecedor', header: 'Fornecedor' },
    ]
  }

  filter = {
    fieldToFilter: 'status',
    filters: [
      { label: 'Todos', value: '' },
      { label: 'Ativo', value: 'active' },
      { label: 'On Leave', value: 'on leave' },
    ]
  };

  data: TableData = [
   [
      {
        field:'item',
        content:[
          {text:"MLB231846",type:"text"},
          {text:"SKU12894",type:"description"},
          {type:"image",link:"www.google.com",imgSrc:"https://http2.mlstatic.com/D_NQ_NP_654999-MLU72565367548_112023-O.webp"}
        ],
      },
      {
        field: 'fornecedor',
        content: [
          {text:"Fornecedor",type:"text"},
          {text:"SP-Brazil",type:"description"}
        ]
      },
      {
        field: 'envio',
        content: [
          {text:"ME2",type:"tag"},
          {text:"ME1",type:"tag"}
        ]
      },
      // { field: 'status', content: { text: 'perdendo', type: 'badge', color: 'red' } },
      // { field: 'preco_ativo', content: { text: 'R$ 335,15' } },
      // { field: 'margem_ativa', content: { text: 'R$ 78,64' } },
      // { field: 'preco_ganhar_catalogo', content: { text: 'R$ 395,00' } },
      // { field: 'margem_ganhar_catalogo', content: { text: '0,07%' } },
      // { field: 'margem_minima', content: { text: '5,00%' } },
      // { field: 'margem_objetivo', content: { text: '10,00%' } },
      // { field: 'comissao', content: { text:'R$ 72,91' } },
      // { field: 'imposto', content: { text:'R$ 64,35' } },
      // { field: 'taxa_fixa', content:{text:'R$ 0,00'}},
      // { field: 'frete', content:{text:'R$ 98,95'}},
      // { field: 'custo_sku', content:{text:'R$ 139,19'}},

   ],
  ]
}
