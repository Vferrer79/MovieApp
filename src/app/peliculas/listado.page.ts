import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

export interface Pelicula{
  titulo: string;
  idPelicula: string;
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

  constructor(private dataService: DataService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
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
    console.log(this.idPelicula)
    this.router.navigateByUrl("/detalle/" + this.idPelicula)
  }
}
