import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonThumbnail,
  IonContent,
  IonList,
  IonRow,
  IonCol,
  IonLabel,
  IonChip,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { NewsArticlesService } from '../api/news-articles.service';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButton,
    IonChip,
    FormsModule,
    IonLabel,
    IonCol,
    IonRow,
    IonList,
    IonHeader,
    IonThumbnail,
    IonToolbar,
    IonTitle,
    IonContent,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
})
export class HomePage {
  apiData = [];
  Img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC4EqZx2NH-eSf4JwdwRolVWrhqJPY6rNK4w&s';
  selectedCategory = 'business';
  topHeadlines: any = [];
  userInput = '';
  categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  constructor(private newsService: NewsArticlesService, private router: Router) {
    this.getArticlesByCategory(this.selectedCategory);
  }

  private getArticlesByCategory(category: string) {
    this.newsService.getArticleByCategory(category).subscribe(
      (res: any) => {
        this.processArticles(res.articles);
      },
      (error) => {
        console.error('Error fetching category articles:', error);
      }
    );
  }

  getSearchedData() {
    this.newsService.getEveryThing(this.userInput).subscribe(
      (res: any) => {
        this.processArticles(res.articles);
      },
      (error) => {
        console.error('Error searching articles:', error);
      }
    );
  }

  private processArticles(articles: any[]) {
    this.topHeadlines = [];
    articles.forEach((news) => {
      if (this.isValidArticle(news)) {
        if (!news.urlToImage || news.urlToImage === '[removed]') {
          news.urlToImage = this.Img;
        }
        this.topHeadlines.push(news);
      }
    });
  }

  private isValidArticle(article: any): boolean {
    return (
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      article.source?.name !== '[Removed]' &&
      article.urlToImage &&
      article.urlToImage !== '[removed]'
    );
  }

  changeCategory(category: string) {
    this.selectedCategory = category.toLowerCase();
    if (this.selectedCategory === 'all') {
      this.getArticlesByCategory('');  // Fetch all categories
    } else {
      this.getArticlesByCategory(this.selectedCategory);  // Fetch specific category
    }
  }
  

  getDetails(selectedArticle: any) {
    const params: NavigationExtras = {
      queryParams: {
        author: selectedArticle.author,
        content: selectedArticle.content,
        description: selectedArticle.description,
        publishedAt: selectedArticle.publishedAt,
        title: selectedArticle.title,
        url: selectedArticle.url,
        urlToImage: selectedArticle.urlToImage,
        source: selectedArticle.source.name,
      },
    };
    this.router.navigate(['/details'], params);
  }
}
