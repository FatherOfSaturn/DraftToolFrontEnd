import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [ 
            MatDialogModule,
            MatButtonModule],
  template: `
<h2 mat-dialog-title>Under Construction!</h2>
<mat-dialog-content>
  <p>Add Scryfall API, Add error handling, parsing garbage inputs, etc...</p>
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</mat-dialog-actions>
  `,
  styles: ``
})
export class DialogContentComponent {

}
