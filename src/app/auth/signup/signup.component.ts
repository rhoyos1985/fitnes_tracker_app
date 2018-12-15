import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private uiSubs: Subscription;
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(private autService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.autService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
