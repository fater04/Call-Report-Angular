import {Component, OnInit} from '@angular/core';
import {Utilisateur} from '../../../models/utilisateur.model';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../services/user.service';
import {ExcelJson, ExportService} from '../../../services/export.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public data = this.getUsers();
  users?: Utilisateur[];

constructor(public datepipe: DatePipe,
            private exportService: ExportService,
            private userService: UserService,
            private message: ToastrService) {
  }
  exportToExcel(): void {

    const edata: Array<ExcelJson> = [];
    const udt: ExcelJson = {
      data: [
        { A: 'List of users' }, // title
        { A: 'ID', B: 'FULL NAME', C: 'USERNAME', D: 'EMAIL', E: 'PHONE', F: 'ROLE', G: 'STATUT', H: 'DATE' }, // table header
      ],
      skipHeader: true
    };
    this.users.forEach(user => {
      udt.data.push({
        A: user.id,
        B: user.nomcomplet,
        C: user.pseudo,
        D: user.email,
        E: user.phone,
        F: user.role,
        G: user.statut,
        H: this.datepipe.transform(user.updatedAt, 'yyyy-MM-dd hh:mm:ss')
      });
    });
    edata.push(udt);
    this.exportService.exportJsonToExcel(edata, 'user_data_customized');
  }

  ngOnInit(): void {
    this.getUsers();
  }

  refresh(): void {
    this.getUsers();
  }

  getUsers(): any {
    this.userService.getAll()
      .subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.message.error(error, 'Error');
        });
  }

  delete(id: number): void {
    this.userService.delete(id)
      .subscribe(
        response => {
          this.refresh();
          this.message.info('users Delete !');
        },
        error => {
          this.message.error(error, 'Error');
        });
  }
}
