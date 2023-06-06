import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from 'src/app/interface/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'name',
    'age',
    'race',
    'weight',
    'color',
    'actions',
  ];
  dataSource = new MatTableDataSource<Pet>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPets();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPets() {
    this.loading = true;
    this.petService.getPets().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: () => {
        this.loading = false;
        alert('¡Ocurrió un error!');
      },
      complete: () => console.log('getPets complete'),
    });
  }

  deletePet(id: number) {
    this.loading = true;

    this.petService.deletePet(id).subscribe({
      next: () => {
        this.petService.successMessage('¡La mascota fue eliminada con éxito!');
        this.loading = false;
        this.getPets();
      },
      error: () => console.log('Ha ocurrido un error al eliminar la mascota'),
      complete: () => {
        console.log('deletePet complete');
      },
    });
  }
}
