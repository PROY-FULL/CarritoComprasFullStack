import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  producto: any[] = [];
  private apiUrl = 'https://localhost:7208/api/';

  constructor(private http: HttpClient) { }

  //Realizamos las peticiones Http get,post, put, delete

  get(url: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get(this.apiUrl + url, { headers });//https://localhost:7208/api/Productos
  }

  post(url: string, body: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })

    return this.http.post(this.apiUrl + url, body, { headers });
  }

  put(url: string, body: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })

    return this.http.put(this.apiUrl + url, body, { headers });
  }
  //Fin de Las peticiones

  agregarProducto(producto: any) {
    console.log(producto)
    this.producto.push(producto);

  }

  mostrarProducto() {
    return this.producto.length;
  }
}
