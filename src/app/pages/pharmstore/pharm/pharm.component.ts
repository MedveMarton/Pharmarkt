import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { PharmService } from 'src/app/services/pharm.service';
import { Pharm } from 'src/app/shared/models/Pharm';

@Component({
  selector: 'app-pharm',
  templateUrl: './pharm.component.html',
  styleUrls: ['./pharm.component.scss']
})
export class PharmComponent {

  user?: firebase.default.User;
  pharms?: Array<Pharm>;
  pharm?: Pharm;

  pharmLoadingSubscription?: Subscription;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private pharmService: PharmService,
    private cartService: CartService,
    private router: Router
    ) { }


  ngOnInit(): void {
  const routeParams = this.route.snapshot.paramMap;
  const pharmIdFromRoute = routeParams.get('PharmId');
  
  this.user = JSON.parse(localStorage.getItem('user') as string);
  
  this.pharmLoadingSubscription = this.pharmService.loadPharms().subscribe((data: Array<Pharm>) => {
    this.pharms = data;
    this.pharm = this.pharms?.find(pharm => pharm.id === pharmIdFromRoute);

    if(this.pharm){
      this.pharmService.loadPharmImg(this.pharm.image).subscribe(data => {
        if (this.pharm) {
            this.pharm.imgurl = data;
        }
    });
    }
  })
}

addToCart(pharm: Pharm) {
  if(this.user){
    this.cartService.addToCart(pharm);
    window.alert('Pharm product added to cart!');
  }
  else{
    window.alert('You must log in!');
    this.router.navigateByUrl('/login');
  }
}

goBack(){
  this.location.back();
}

ngOnDestroy(): void {
  this.pharmLoadingSubscription?.unsubscribe();
}

}
