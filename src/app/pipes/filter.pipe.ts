import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args === '' ||args.length < 3) return value;
    const resultPost = [];
    for(const post of value){
      if(post.band.toLowerCase().indexOf(args) > -1 || post.name.toLowerCase().indexOf(args) > -1){
        //console.log('SIP');
        resultPost.push(post);
      };
    };
    return resultPost;
  }

}
