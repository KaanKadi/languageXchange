import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAge, lastSeen } from 'src/app/extras/utils';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  userId: string;
  user: any;

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if(id) this.userId = id;
    this.getUserData();
  }

  async getUserData() {
    // getting user data from the database while using getUserData() method in auth.service.ts
    this.user = await this.authService.getUserData(this.userId);
    console.log('userData: ', this.user);
  }

  lastSeen(d: any) { 
    if (!d) return null;
    let a = new Date(d.seconds * 1000)
    return lastSeen(a);
   }

  getAge(d: any) {
    if (!d) return null;
    let a = new Date(d.seconds * 1000)
    return getAge(a);
  }

}