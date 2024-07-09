import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PharmcommentService } from 'src/app/services/pharmcomment.service';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/shared/models/Review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  currentUser?: firebase.default.User | null;
  reviews: Array<Review> = [];
  user?: User

  reviewsLoadingSubscription?: Subscription;
  
  reviewsForm = this.createForm({
    id: '',
    username: '',
    pharm_id: '',
    review: '',
    date: new Date().getTime()
  });

  constructor(
    private formBuilder: FormBuilder,
    private pharmreviewService : PharmcommentService,
    private userService : UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pharmIdFromRoute = routeParams.get('PharmId');
    this.reviewsForm.get('pharm_id')?.setValue(pharmIdFromRoute);
    
    this.reviewsLoadingSubscription = this.pharmreviewService.getReviewsByPharmId(pharmIdFromRoute as string)
    .subscribe(reviews => {
      this.reviews = reviews;
    })

    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.reviewsForm.get('username')?.setValue(this.user?.userName as string);
    }, error => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.reviewsLoadingSubscription?.unsubscribe();
  }

  createForm(model: Review) {
    let formGroup = this.formBuilder.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('review')?.addValidators([Validators.required]);
    return formGroup;
  }

  DeleteReview(username: string, id: string){
    if(this.user?.userName === username){
      this.pharmreviewService.delete(id);
    } else {
      alert("You cannot delete other user's reviews!");
    }
  }

  addReview() {
    if (this.reviewsForm.valid) {
      if (this.reviewsForm.get('username') && this.reviewsForm.get('review')) {
        this.pharmreviewService.create(this.reviewsForm.value as Review).then(_ => {
          this.reviewsForm.get('review')?.setValue('');
        }).catch(error => {
          console.error(error);
        });
      }
    }else{
      window.alert('Invalid Review!');
    }
  }

}
