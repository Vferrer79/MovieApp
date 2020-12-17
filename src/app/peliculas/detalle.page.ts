import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

export interface Pelicula{
  titulo: string;
  idPelicula: string;
  descripcion: string;
  Duracion: number;
  Genero: string[];
  imagen: string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  idPelicula: string;
  pelicula: Pelicula;
  titulo: string;
  descripcion: string;
  Duracion: string;
  Genero: string;
  imagen: string;

  constructor(private dataService: DataService,
    private router: Router, private activatedRoute: ActivatedRoute) { 

      this.idPelicula = this.activatedRoute.snapshot.params["idPelicula"];

      // this.router.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // }

      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
          window.scrollTo(0, 0);
        }
      });

  }

  ngOnInit() {
    this.mostrar()
  }

  mostrar(){
      this.dataService.GetPeliculaId(this.idPelicula).subscribe(
        data => {
          console.log(data)
          this.titulo=data.title
          this.descripcion=data.overview
          this.Duracion=data.runtime
          this.Genero=data.genres
          this.imagen=data.backdrop_path

        },
        error => {
          console.log(error)
        }
      )
  }
}
