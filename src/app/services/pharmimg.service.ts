import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pharm } from '../shared/models/Pharm';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PharmimgService {

  collectionName = 'Pharm';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage    
    ) { }

  loadPharmImgMeta(): Observable<Array<Pharm>> {
    return this.afs.collection<Pharm>(this.collectionName).valueChanges();
  }

  loadPharmImg(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
