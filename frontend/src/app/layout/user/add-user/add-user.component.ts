import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private message: ToastrService, private userService: UserService,  private router: Router) {
  }


  ngOnInit(): void {
  }
    onSubmit(form: NgForm): void {
    const data = {
      nomcomplet: form.value.fullname,
      email: form.value.email,
      pseudo: form.value.username,
      role: form.value.role,
      phone: form.value.phone,
      password: form.value.password
    };
    this.createUser(data);
    this.router.navigate(['/USERS']);
  }

  createUser( data: any): void {
    this.userService.create(data)
      .subscribe(
        response => {
          this.message.info('User Created !');
        },
        error => {
          this.message.error(error.error.errors[0].msg);
        });
  }
}
