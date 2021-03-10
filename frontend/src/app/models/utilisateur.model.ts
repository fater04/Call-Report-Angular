export class Utilisateur {
  id?: any;
  nomcomplet?: string;
  pseudo?: string;
  email?: string;
  role?: string;
  phone?: string;
  avatar?: any;
  password?: any;
  statut?: any;
  createdAt?: any;
  updatedAt?: any;

  constructor(nomcomplet, pseudo, email, role ) {
    this.nomcomplet = nomcomplet;
    this.pseudo = pseudo;
    this.email = email;
    this.role = role;
  }


}
