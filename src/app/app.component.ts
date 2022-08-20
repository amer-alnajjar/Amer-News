import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from './service/news.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  sources: any[] = [];
  articles: any[] = [];
  headlines: string = 'Top 10 Trindings News ';

  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private service: NewsService
  ) {}
  ngOnInit(): void {
    this.getAllArticales();
    this.getAllSources();
  }
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }
  getAllArticales() {
    this.service.getAllArticlesNews().subscribe((res: any) => {
      console.log(res);
      this.articles = res.articles;
    });
  }

  getAllSources() {
    this.service.getAllSourcesNews().subscribe((res: any) => {
      console.log(res);
      this.sources = res.sources;
    });
  }

  getHeadlineSelected(item: any) {
    this.service.getArticleHeadlinesWithId(item.id).subscribe((res: any) => {
      console.log(res);
      this.articles = res.articles;
      this.headlines = item.name;
    });
  }
}
