import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data = {
    title: '',
    description: ''
  }
  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._adminService.getInfo()
      .subscribe(
        res => this.data = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Is not correct TOKEN!!!!');
              // this._router.navigate(['/users']);
            }
          }
        }
      );
  }

}
