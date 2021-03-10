import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Router} from '@angular/router';
import {Utilisateur} from '../../../models/utilisateur.model';
import {ToastrService} from 'ngx-toastr';
import {AppelService} from '../../../services/appel.service';

@Component({
  selector: 'app-add-appel',
  templateUrl: './add-appel.component.html',
  styleUrls: ['./add-appel.component.css']
})
export class AddAppelComponent implements OnInit {
  Utilisateur = Utilisateur;
  constructor(private appelService: AppelService,
              private tokenStorage: TokenStorageService,
              private message: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.Utilisateur = this.tokenStorage.getUser();
    }else{
      this.router.navigate(['/Connexion']);
    }
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
    // @ts-ignore
    this.addCall(this.Utilisateur.id, data);
    this.router.navigate(['/CALLS']);
  }

  addCall(id: any, data: any): void {
    this.appelService.create(id, data)
      .subscribe(
        response => {
          this.message.info('Call added !');
        },
        error => {
          this.message.error(error.error.errors[0].msg);
          console.log(error);
        });
  }
}
