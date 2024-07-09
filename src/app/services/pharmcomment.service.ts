import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../shared/models/Review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmcommentService {

  collectionName = 'Reviews';

  constructor(
    private afs: AngularFirestore,
    ) { }

  create(review: Review) {
    review.id = this.afs.createId();
    return this.afs.collection<Review>(this.collectionName).doc(review.id).set(review);
  }

  getAll(): Observable<Array<Review>> {
    return this.afs.collection<Review>(this.collectionName).valueChanges();
  }

  update(review: Review) {
    return this.afs.collection<Review>(this.collectionName).doc(review.id).set(review);
  }

  delete(id: string) {
    return this.afs.collection<Review>(this.collectionName).doc(id).delete();
  }

  getReviewsByPharmId(id: string) {
    return this.afs.collection<Review>(this.collectionName, ref => ref.where('pharm_id', '==', id).orderBy('date', 'asc')).valueChanges();
  }

}
