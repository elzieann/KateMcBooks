import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsGQL, PostsQuery } from 'src/generated/graphql';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit, OnDestroy {
  posts: Observable<PostsQuery['blogposts']>

  constructor(private postsGQL: PostsGQL) { 
    this.posts = postsGQL.watch().valueChanges.pipe(map((result) => result.data.blogposts));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}
}
