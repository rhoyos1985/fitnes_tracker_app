import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
   this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onLogout() {
    this.authService.logut();
  }

  onToggleSideNav() {
    this.sideNavClose.emit();
  }

}
