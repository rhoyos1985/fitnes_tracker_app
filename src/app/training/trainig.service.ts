import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';


@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];


  constructor(private db: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromTraining.State>) {}

  fetchAvalaibleExercise() {
    this.store.dispatch(new UI.StartLoading);
    this.fbSubs.push(this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(map(dataArray => dataArray.map(doc => {
        const data = doc.payload.doc.data() as Exercise;
        const id = doc.payload.doc.id;
        return { id: id,
                 name: data.name,
                 duration: data.duration,
                 calories: data.calories
              };
      }))
    )
    .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading);
      this.store.dispatch(new Training.SetAvailableTrainings(exercises));
    }, err => {
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackBar('Fetching exercises failed, please try again later.', null, 3000);
    }));
  }

  fetchCompletedAndCancelledExercises() {
    this.fbSubs.push(this.db
          .collection('finishedExercises')
          .valueChanges()
          .subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
          }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(subs => subs.unsubscribe());
  }
}
