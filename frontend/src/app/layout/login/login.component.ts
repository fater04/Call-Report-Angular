import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formConnecte: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  errorMessageFromServer = '';
  user = [];
  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private message: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
    }
  }
  onSubmit(): void {
    const username = this.formConnecte.username;
    const password = this.formConnecte.password;


    this.userService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.user = this.tokenStorage.getUser();
        this.router.navigate(['/Dashboard']);
        this.message.info('login successfully ! ');
      },
      err => {
        this.errorMessage = err.error.message;
        this.message.error( err.error.message);
        this.isLoginFailed = true;
      }
    );
  }
}
