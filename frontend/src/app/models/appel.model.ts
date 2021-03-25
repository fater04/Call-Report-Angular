export class Appel {
  id?: any;
  telephone?: string;
  nom?: string;
  prenom?: string;
  institution?: string;
  identite?: string;
  question?: string;
  action?: string;
  remarque?: string;
  suivi?: string;
  suggestion?: string;
  User?: any;
  createdAt?: any;
  updatedAt?: any;

  constructor(telephone, nom, prenom, institution, identite, question, action, remarque, suivi, suggestion, User) {
    this.telephone = telephone;
    this.nom = nom;
    this.prenom = prenom;
    this.institution   = institution;
    this.identite = identite;
    this.question = question;
    this.action = action;
    this.remarque = remarque;
    this.suivi = suivi;
    this.suggestion = suggestion;
    this.User = User;
  }

}
