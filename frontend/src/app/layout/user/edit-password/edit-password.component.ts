import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, NgForm} from '@angular/forms';
import {TokenStorageService} from '../../../services/token-storage.service';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  userForm: FormGroup;
  user = [];
  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private message: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
    this.user = this.tokenStorage.getUser();
  } else {
    this.router.navigate(['/Connexion']);
  }
  }

  onSubmit(form: NgForm): void {
    const pass1 = form.value.password1;
    const pass2 = form.value.password2;
    // tslint:disable-next-line:triple-equals
    if (pass2 != pass1){
      this.message.info('Password a not the same!');
    }else{
      const data = {
        password: bcrypt.hashSync(pass1, 8)
      };
      // @ts-ignore
      this.updateUser(this.user.id, data);
      this.router.navigate(['/Connexion']);
    }
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
