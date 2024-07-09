import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pharmarkt';
  page = 'main';

  currentUser?: firebase.default.User | null;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify(null));
    });
  }

  onToggleSideNav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if (event === true){
      sidenav.close();
    }
  }

  logOut(_?: boolean){
    this.authService.logOut().then(() => {
      console.log('Logged out successfuly!');
    }).catch(error => {
      console.log(error);
    });
  }

}
