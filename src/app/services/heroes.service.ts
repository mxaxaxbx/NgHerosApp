import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url = 'https://crud-62ae6.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((res: any) => {
          heroe.id = res['name'];
          return heroe;
        })
      )
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( this.crearArreglo ),
        delay(1500)
      )
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    if(heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key

      heroes.push(heroe)
    })

    return heroes;
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
