import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesSvc: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo') {
      this.heroesSvc.getHeroe(id)
        .subscribe((res: HeroeModel) => {
          this.heroe = res;
          this.heroe.id = id;
        });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return console.log('formulario no valido');
    }

    Swal.fire({
      title: 'Por favor espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id) {
      peticion = this.heroesSvc.actualizarHeroe(this.heroe);

    } else {
      peticion = this.heroesSvc.crearHeroe(this.heroe);

    }
    
    peticion.subscribe(res => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se guardó correctamente',
        icon: 'success'
      });
    })
  }

}
