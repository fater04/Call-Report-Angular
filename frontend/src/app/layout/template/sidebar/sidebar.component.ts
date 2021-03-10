import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage.service';
import {UserService} from '../../../services/user.service';
import {Utilisateur} from '../../../models/utilisateur.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  Utilisateur = Utilisateur;
  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.Utilisateur = this.tokenStorage.getUser();
    }else{
      this.router.navigate(['/Connexion']);
    }
  }

}
