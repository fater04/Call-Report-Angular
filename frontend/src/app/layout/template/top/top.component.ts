import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
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

  logout(): void {
    this.tokenStorage.signOut();
    this.message.info('logout ! ');
    this.router.navigate(['/Connexion']);
  }
}
