import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from 'src/app/interface/pet';

const PET_LIST: Pet[] = [
  { name: 'Ciro', age: 2, race: 'Golden', weight: '30 kg', color: 'Dorado' },
  { name: 'Milton', age: 6, race: 'Golden', weight: '37 kg', color: 'Dorado' },
  {
    name: 'Bartolo',
    age: 3,
    race: 'Dogo Argentino',
    weight: '60 kg',
    color: 'Blanco',
  },
  {
    name: 'Aquiles',
    age: 5,
    race: 'Ovejero Aleman',
    weight: '67 kg',
    color: 'Negro',
  },
  { name: 'Homero', age: 1, race: 'Labrador', weight: '44 kg', color: 'Negro' },
  { name: 'Mark', age: 1, race: 'Callejero', weight: '25 kg', color: 'Negro' },
];

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'age', 'race', 'weight', 'color'];
  dataSource = new MatTableDataSource<Pet>(PET_LIST);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
  }
}
