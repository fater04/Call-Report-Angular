import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../../models/utilisateur.model';
import {FormGroup, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  user?: Utilisateur;
  userForm: FormGroup;

  constructor(private message: ToastrService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          this.message.error(error);
        });
  }

  onSubmit(form: NgForm): void {
    const id = this.route.snapshot.params.id;
    const data = {
      nomcomplet: form.value.fullname,
      email: form.value.email,
      pseudo: form.value.username,
      role: form.value.role,
      phone: form.value.phone,
    };
    this.updateUser(id, data);
    this.router.navigate(['/USERS']);
  }

  updateUser(id: number, data: any): void {
    this.userService.update(id, data)
      .subscribe(
        response => {
          this.message.info(response.message);
        },
        error => {
          this.message.error(error.error.errors[0].msg);
        });
  }


}
