import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  isLoading: boolean = false;
  form: FormGroup;
  currentUserData: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getUserData();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)]}
      ),
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }

  onSubmit() { 
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

  getUserData() {
    this.authService.getUserData().then((currentUserData) => {
      this.currentUserData = currentUserData;
      console.log('currentUserData: ', currentUserData);
    }).catch((error) => {
      console.log('error: ', error);
    });
    
  }

}