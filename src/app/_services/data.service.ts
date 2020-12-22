import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const api_key = "a336bda54c7428329d1b9f521055fd14"

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  GetPeliculas(texto: string): any {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=a336bda54c7428329d1b9f521055fd14&language=es-ES&query='+texto+'&page=1&include_adult=false');
  }

  GetPeliculaId(num: string): any {
    console.log(num)
    return this.http.get('https://api.themoviedb.org/3/movie/'+ num +'?api_key=a336bda54c7428329d1b9f521055fd14&language=es-ES');
  }
}
