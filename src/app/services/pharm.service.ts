import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Pharm } from '../shared/models/Pharm';

@Injectable({
  providedIn: 'root'
})
export class PharmService {

  constructor(
    private afs: AngularFirestore, 
    private storage: AngularFireStorage     
    ) { }

  loadPharms() : Observable<Array<Pharm>> {
    return this.afs.collection<Pharm>('Pharm').valueChanges();
  }

  loadPharmImg(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
