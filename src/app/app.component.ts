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
  headers = {
    headers:[
      { field: 'item', header: 'MLB'},
      { field: 'fornecedor', header: 'Fornecedor' }
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

   ],
  ]

  headerBackgroundColor = 'lightgray';
  bodyBackgroundColor = 'red';
  textColor = 'black';
  textFontSize = '16px';
  textAlign = 'left';

}
