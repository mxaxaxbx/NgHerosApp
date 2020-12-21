import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor(private heroesSvc: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(){
    this.loading = true;
    this.heroesSvc.getHeroes()  
      .subscribe(res => {
        this.heroes = res;
        this.loading = false;
      })
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está seguro de eliminar el heroe ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(res => {
      if(res.value) {
        this.heroes.splice(i, 1);
        this.heroesSvc.borrarHeroe(heroe.id)
          .subscribe();
      }
    });

  }

}
