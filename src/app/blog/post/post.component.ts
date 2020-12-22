import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SinglePostGQL, SinglePostQuery } from 'src/generated/graphql';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  post: Observable<SinglePostQuery['blogposts']> | undefined
  postSubscription: Subscription | undefined;
  paramSubscription: Subscription | undefined;
  postContent: SafeHtml | undefined;


  constructor(private router: Router, private route: ActivatedRoute, private postGQL: SinglePostGQL, private domSanitizer: DomSanitizer) { 
    this.paramSubscription = this.route.params.subscribe((params) => {
      const slug = params['slug'];    
      const where = {
        slug: slug,
      };

      this.post = this.postGQL.watch({whereClause: where}).valueChanges.pipe(map((result) => result.data.blogposts))
      this.postSubscription = this.post.subscribe((result) => {
        if (result?.length) {
          let workingContent = result[0]?.content?.replace(
            'src="/uploads/',
            'src="https://cms.mattie.lgbt/uploads/'
          ); 

          if (workingContent) {
            this.postContent = this.domSanitizer.bypassSecurityTrustHtml(workingContent);
          }
        }
      })
    })
  } 

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }
}
