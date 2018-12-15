import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../trainig.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  trainingForm: FormGroup;
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.trainingForm = new FormGroup({
      exercise: new FormControl('', {validators: Validators.required})
    });
    this.fetchExercises();
    this.subscribeService();
  }

  subscribeService() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
  }

  onStartTraining() {
    const currentExercise = this.trainingForm.value.exercise;
    this.trainingService.startExercise(currentExercise.id);
  }

  fetchExercises() {
    this.trainingService.fetchAvalaibleExercise();
  }

}
