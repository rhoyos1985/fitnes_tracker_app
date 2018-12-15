import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainingd';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRINING = '[Training] Start Training';
export const STOP_TRINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRINING;
}

export type TrainingActions = SetAvailableTrainings
| SetFinishedTrainings
| StartTraining
| StopTraining;
