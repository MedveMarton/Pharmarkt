import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PharmService } from 'src/app/services/pharm.service';
import { Pharm } from 'src/app/shared/models/Pharm';
//import { cards } from 'src/app/shared/models/cards';

@Component({
  selector: 'app-pharmstore',
  templateUrl: './pharmstore.component.html',
  styleUrls: ['./pharmstore.component.scss']
})

export class PharmstoreComponent {

  Pharms : Array<Pharm>= new Array<Pharm>();
  //cards: any = cards;>

  PharmLoadingSubscription?: Subscription;

  breakpoint: number | undefined;

  public Pharmsslice : Array<Pharm>= new Array<Pharm>();

  constructor(
    private PharmService : PharmService
  ) { }

  OnPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.Pharms.length){
      endIndex = this.Pharms.length;
    }
    this.Pharmsslice = this.Pharms.slice(startIndex, endIndex);
  }


  loadImg(PharmImg : Pharm){
    return PharmImg.image;
  }

  loadHeaderImg(PharmImg : Pharm){
    return PharmImg.headerimg;
  }


ngOnInit() {

  if (window.innerWidth <= 1200 && window.innerWidth  >= 900) {
    this.breakpoint = 3
  } else if (window.innerWidth  <= 900 && window.innerWidth  >= 600){
    this.breakpoint = 2
  } else if (window.innerWidth <= 600){
    this.breakpoint = 1
  } else {
    this.breakpoint = 4;
  }

  this.PharmLoadingSubscription = this.PharmService.loadPharms().subscribe((data: Array<Pharm>) => {
    this.Pharms = data;

   data.forEach(pharm => {
      this.PharmService.loadPharmImg(pharm.image).subscribe(data => {
          pharm.imgurl = data;
        this.PharmService.loadPharmImg(pharm.headerimg).subscribe(data => {
          pharm.headerurl = data;
        });
      });
    });

    this.Pharmsslice = this.Pharms.slice(0, 4);
  });

}

onResize(event: any) {
  switch (true) {
    case event.target.innerWidth <= 1200 && event.target.innerWidth >= 900:
      this.breakpoint = 3;
      break;
    case event.target.innerWidth <= 900 && event.target.innerWidth >= 600:
      this.breakpoint = 2;
      break;
    case event.target.innerWidth <= 600:
      this.breakpoint = 1;
      break;
    default:
      this.breakpoint = 4;
  }
}

ngOnDestroy(): void {
  this.PharmLoadingSubscription?.unsubscribe();
}

}
