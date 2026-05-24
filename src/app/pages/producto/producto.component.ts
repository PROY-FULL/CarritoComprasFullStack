import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IProducto } from '../../models/Productos';
import { CarritoService } from '../../servicios/carrito.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
@Component({
  selector: 'app-producto',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements AfterViewInit, OnInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['acciones', 'nombre', 'descripcion', 'precio', 'ruta', 'stock'];
  dataSource: MatTableDataSource<IProducto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private carritoService: CarritoService) {

  }
  ngOnInit(): void {
    this.cargarProductos();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarProductos() {
    this.carritoService.get('Productos/productos').subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      console.log(this.dataSource.data)
    }, error => {
      console.log("Hubo un erro al obtener los productos", error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarProducto(producto: any) {
    console.log(producto)
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      data: { producto },
      minWidth: '30%',
      minHeight: '50%',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cargarProductos();
    });

  }

  agregarProducto() {
    const dialog = this.dialog.open(AgregarProductoComponent, {
      minWidth: '30%',
      minHeight: '50%',
      disableClose: true,
      panelClass: 'custom-dialog-container'

    });

    dialog.afterClosed().subscribe(result => {
      this.cargarProductos();
    });
  }
}
