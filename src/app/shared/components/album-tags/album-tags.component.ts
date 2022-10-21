import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-tags',
  templateUrl: './album-tags.component.html',
  styleUrls: ['./album-tags.component.scss']
})
export class AlbumTagsComponent implements OnInit {

  public albumTags;

  @Input() tags
  @Input() itunesGenre
  constructor() { }

  ngOnInit(): void {
    if(this.tags){
      this.albumTags = this.findHyphen(this.tags);
      console.log('tags',this.albumTags);
    }
    console.log('tags',this.itunesGenre);
  }

  findHyphen(list){
    let hasHyphen = list.some(item => item.name.includes("-"));
    if(hasHyphen){
      list.forEach((cur) => {
        Object.keys(cur).forEach(key => {
            if (typeof cur[key] === 'string') {
                cur[key]=cur[key].replace(/-/g, ' ');
            }
        })
      });
      return this.getUniqueListBy(list, 'name')
    }else{
      return this.getUniqueListBy(list, 'name')
    }
   
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

}
