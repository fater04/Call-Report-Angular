import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AppelService} from '../../../services/appel.service';
import {Appel} from '../../../models/appel.model';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Utilisateur} from '../../../models/utilisateur.model';
import {Router} from '@angular/router';
import {ExcelJson, ExportService} from '../../../services/export.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-appel',
  templateUrl: './list-appel.component.html',
  styleUrls: ['./list-appel.component.css']
})
export class ListAppelComponent implements OnInit {
appels?: Appel[];
  Utilisateur = Utilisateur;
  constructor(private appelService: AppelService,
              public datepipe: DatePipe,
              private exportService: ExportService,
              private message: ToastrService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.Utilisateur = this.tokenStorage.getUser();

      // @ts-ignore
      if (this.Utilisateur.role === 'user'){
        // @ts-ignore
      this.getAppels(this.Utilisateur.id);
      }else{
        this.getAppelAdmin();
      }

    }else{
      this.router.navigate(['/Connexion']);
    }
  }

  exportToExcel(): void {

    const edata: Array<ExcelJson> = [];
    const udt: ExcelJson = {
      data: [
        { A: 'LIST of CALL' }, // title
        { A: 'ID', B: 'TELEPHONE', C: 'NOM', D: 'PRENOM', E: 'IDENTITE', F: 'INSTITUTION',
          G: 'QUESTION', H: 'ACTION', I: 'REMARQUE', J: 'SUIVI', K: 'SUGGESTION', L: 'DATE' }, // table header
      ],
      skipHeader: true
    };
    this.appels.forEach(ap => {
      udt.data.push({
        A: ap.id,
        B: ap.telephone,
        C: ap.nom,
        D: ap.prenom,
        E: ap.identite,
        F: ap.institution,
        G: ap.question,
        H: ap.action,
        I: ap.remarque,
        J: ap.suivi,
        K: ap.suggestion,
        L: this.datepipe.transform(ap.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      });
    });
    edata.push(udt);
    this.exportService.exportJsonToExcel(edata, 'call_report');
  }

  refresh(): void {
    // @ts-ignore
    this.getAppels(this.Utilisateur.id);
  }

  getAppels(id: any): void {
    this.appelService.getAll(id)
      .subscribe(
        (data) => {

          this.appels = data;
        },
        (error) => {
          this.message.error(error, 'Error');
        });
  }
  getAppelAdmin(): void {
    this.appelService.getAllAdmin()
      .subscribe(
        (data) => {

          this.appels = data;
        },
        (error) => {
          this.message.error(error, 'Error');
        });
  }

  delete(id: number): void {
    this.appelService.delete(id)
      .subscribe(
        response => {
          this.refresh();
          this.message.info('Calls Delete !');
        },
        error => {
          this.message.error(error, 'Error');
        });
  }
}
