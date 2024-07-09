import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagemenu',
  templateUrl: './pagemenu.component.html',
  styleUrls: ['./pagemenu.component.scss']
})
export class PagemenuComponent {

  currentUser?: firebase.default.User | null;

  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout : EventEmitter<boolean> = new EventEmitter();
  @Input() isLoggedIn?: firebase.default.User | null;

  close(logout?: boolean){
    if(logout === true){
      this.onLogout.emit(logout);
    }
    this.onCloseSidenav.emit(true);
  }
}
