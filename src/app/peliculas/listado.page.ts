import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../_services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

export interface Pelicula{
  titulo: string;
  idPelicula: string;
  imagen: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  pelicula: Pelicula;
  total: number = 1; // de momento no sirve para nada, espor sihago un paginador
  listaPeliculas: Pelicula[] = [];
  miBuscador = '';
  idPelicula = '';

  @HostListener('window:keydown.enter') enterEvent(){
    this.mostrar()
  }

  constructor(private dataService: DataService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.listaPeliculas=[];
  }

  mostrar(){
    this.listaPeliculas=[];
    if(this.miBuscador != ''){
      this.dataService.GetPeliculas(this.miBuscador).subscribe(
        data => {
          data["results"].forEach(element => {

            this.pelicula = {
              idPelicula: element.id,
              titulo: element.title,
              imagen: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + element.poster_path,
            }
            this.total = data['total_pages'];
            this.listaPeliculas.push(this.pelicula)
  
          });
          this.miBuscador = '';
        },
        error => {
          console.log(error)
        }
      )
    } 
  }

  verDetalles(id: string) {
    this.idPelicula = id
    this.router.navigateByUrl("/detalle/" + this.idPelicula)
  }
}
