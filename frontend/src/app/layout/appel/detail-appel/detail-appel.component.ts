import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AppelService} from '../../../services/appel.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Utilisateur} from '../../../models/utilisateur.model';
import {Appel} from '../../../models/appel.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-detail-appel',
  templateUrl: './detail-appel.component.html',
  styleUrls: ['./detail-appel.component.css']
})
export class DetailAppelComponent implements OnInit {
  Utilisateur: Utilisateur;
  appel: Appel;
  constructor(private appelService: AppelService,
              private tokenStorage: TokenStorageService,
              private message: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.Utilisateur = this.tokenStorage.getUser();
      this.getAppel(this.route.snapshot.params.id);
    }else{
      this.router.navigate(['/Connexion']);
    }
  }
  getAppel(id: string): void {
    this.appelService.getOne(id)
      .subscribe(
        (data) => {
          this.appel = data;
          console.log(data);
        },
        (error) => {
          this.message.error(error);
        });
  }
  onSubmit(form: NgForm): void {
    const data = {
      nom: form.value.nom,
      prenom: form.value.prenom,
      telephone: form.value.telephone,
      identite: form.value.identite,
      institution: form.value.institution,
      questions: form.value.question,
      action: form.value.action,
      remarque: form.value.remarque,
      suivi: form.value.suivi,
      suggestion: form.value.suggestion,
    };
    this.updateCall(this.appel.id, data);
    this.router.navigate(['/CALLS']);
  }

  updateCall(id: number, data: any): void {
    this.appelService.update(id, data)
      .subscribe(
        response => {
          this.message.info(response.message);
        },
        error => {
          this.message.error(error.error.errors[0].msg);
          console.log(error);
        });
  }


}
