import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../dialogs/error/error.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private auth: AuthService, public dialog:MatDialog) {}

  logout() {
    this.auth.logout();
    window.location.reload();
  }

  deleteUser() {
    if (
      confirm('Are you sure you want to delete your account?') &&
      localStorage.getItem('token') != null
    ) {
      this.auth.deleteUser(localStorage.getItem('token')!).subscribe({
        next: (data) => {
          if (data['message'] == 'User deleted') {
            this.logout();
          }
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.openError(error.message);
        },
      });
      
    }
  }

  openError(error: string) {
    this.dialog.open(ErrorComponent, {
      data: error,
      panelClass: 'error-dialog',
    });

    this.dialog.afterAllClosed.subscribe(() => {
      take(1);
    });
  }
}
