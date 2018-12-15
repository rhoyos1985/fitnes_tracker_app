import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <mat-dialog-content>
              <p>You already got {{ passData.progress }}%</p>
            </mat-dialog-content>
            <mat-card-actions>
              <button mat-button [mat-dialog-close]="true">Yes</button>
              <button mat-button [mat-dialog-close]="false">No</button>
            </mat-card-actions>`
})
export class StopTrainingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passData: any) {}
}
