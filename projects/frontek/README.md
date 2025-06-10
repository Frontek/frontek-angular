# @frontek/angular

An Angular library for rendering dynamic tables with support for columns, subcolumns, and customizable filters.

## 📦 Installation

To use this library in your Angular project, install it with:

```bash
npm install @frontek/angular
```

### Peer Dependencies (install if not already present):

```bash
npm install @angular/cdk@^19.2.18 \
            @angular/common@^19.2.0 \
            @angular/core@^19.2.0 \
            @angular/forms@^19.2.0 \
            tslib@^2.3.0 \
            zone.js@~0.15.0
```

## 🧩 Usage

Import the module in your `AppModule` or any feature module:

```ts
import { ExecutiveGridComponent  } from '@frontek/angular';

@NgModule({
  imports: [ExecutiveGridComponent]
})
export class AppModule {}
```

Use the component in your template:

```html
<executive-grid-component
  [columnDefinitions]="columnDefs"
  [subColumnDefinitions]="subColumnDefs"
  [filter]="filterOptions"
  [rowData]="dataRows">
</executive-grid-component>
```

## ⚙️ Component Inputs

### `columnDefinitions`

Defines the main columns of the table.

```ts
columnDefs = [
  { field: 'name', header: 'Name' },
  { field: 'age', header: 'Age' }
];
```

---

### `subColumnDefinitions`

(Optional) Defines additional subcolumns for each row.

```ts
subColumnDefs = [
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone' }
];
```

---

### `filter`

Enables filtering based on a specific field.

```ts
filterOptions = {
  fieldToFilter: 'age',
  filters: [
    { value: '20', label: '20 Years' },
    { value: '30', label: '30 Years' }
  ]
};
```

---

### `rowData`

Defines the data to be rendered in the table.

```ts
dataRows = [
  { field: 'name', content: { value: 'John' } },
  { field: 'age', content: { value: 30 } }
];
```

## 📚 Full Example

```ts
columnDefs = [
  { field: 'name', header: 'Name' },
  { field: 'age', header: 'Age' }
];

subColumnDefs = [
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone' }
];

filterOptions = {
  fieldToFilter: 'age',
  filters: [
    { value: '20', label: '20 Years' },
    { value: '30', label: '30 Years' }
  ]
};

dataRows = [
  { field: 'name', content: { value: 'Maria' } },
  { field: 'age', content: { value: 30 } }
];
```

---

## ❗ Notes

- This library is intended for **external use only**. You should **not modify** its source code.
- Ensure your project is using Angular version `^19.2.0` or compatible.

## 🪪 License

MIT © Frontek
