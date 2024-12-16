import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartOutline, shareOutline, bookmarkOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton , IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {
  author:any
  content:any
  title:any
  url:any
  image:any
  source:any
  description:any
  publishedAt:any
  urlToImage:any


  constructor(private router:Router, private routes:ActivatedRoute) {

    this.author= this.routes.snapshot.queryParamMap.get('author')
    this.content= this.routes.snapshot.queryParamMap.get('content')
    this.url= this.routes.snapshot.queryParamMap.get('url')
    this.image= this.routes.snapshot.queryParamMap.get('image')
    this.source= this.routes.snapshot.queryParamMap.get('source')
    this.description= this.routes.snapshot.queryParamMap.get('description')
    this.publishedAt= this.routes.snapshot.queryParamMap.get('publishedAt')
    this.urlToImage= this.routes.snapshot.queryParamMap.get('urlToImage')
    this.title= this.routes.snapshot.queryParamMap.get('title')
    addIcons({heartOutline,shareOutline,bookmarkOutline,});
   }

  ngOnInit() {
    
  }

async readmore(url:string){
  await Browser.open({url})

}


}
