import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../trainig.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainigService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.trainigService.fetchCompletedAndCancelledExercises();
    this.store.select(fromTraining.getFinishedExercises).subscribe(
      (exerecises: Exercise[]) => {
        this.dataSource.data = exerecises;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
