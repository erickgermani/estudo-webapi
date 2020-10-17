import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  _filtroLista = '';
  // tslint:disable-next-line: typedef
  get filtroLista(){
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
    console.log(this.filtroLista);
    console.log(this.eventosFiltrados);
  }

  constructor(private http: HttpClient) { }

  eventosFiltrados: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  // tslint:disable-next-line: typedef
  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }
  // tslint:disable-next-line: typedef
  getEventos(){
    this.http.get('http://localhost:5000/weatherforecast/').subscribe(response => {
      this.eventos = response;
    }, error => {
      console.log(error);
    });
  }
}
