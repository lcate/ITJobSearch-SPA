import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [
    {image: 'https://cdn.mos.cms.futurecdn.net/vZLMcEg5JqfGeXydVkkxhk-970-80.jpg.webp'},
    {image: 'https://thumbs.dreamstime.com/z/web-design-concept-tiny-people-building-webpage-website-interface-design-software-development-process-programming-coding-seo-227595659.jpg'},
    {image: 'https://miro.medium.com/max/2000/0*mfUNFSHyrXnH7ZKf'}
  ];

  constructor() {}

  ngOnInit(): void {
  }

}
