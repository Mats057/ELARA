import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';
import { take } from 'rxjs';
import { ErrorComponent } from 'src/app/dialogs/error/error.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    feather.replace();
    let token = localStorage.getItem('token');
    if (token != null && token != undefined) {
      this.auth.getUser(token).subscribe({
        next: (data) => {
          this.userForm.setValue({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phone: data.phone,
          });
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.openError(error.message);
        },
      });
    } else {
      this.openError("You don't have permission!");
    }
  }

  openError(error: string) {
    this.dialog.open(ErrorComponent, {
      data: error,
      panelClass: 'error-dialog',
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.router.navigate(['/login']);
      take(1);
    });
  }

  submit() {
    this.loading = true;
    let token = localStorage.getItem('token');
    if (token != null && token != undefined) {
      this.auth.updateUser(token, this.userForm.value).subscribe({
        next: (data) => {
          this.loading = false;
          this.router
            .navigateByUrl('/home/account', { skipLocationChange: true })
            .then(() => this.router.navigate([this.router.url]));
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.openError(error.message);
        },
      });
    } else {
      this.openError("You don't have permission!");
    }
  }

}
