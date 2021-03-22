import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBanner'
})
export class FilterBannerPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args === '' ||args.length < 3) return value;
    const resultBanner = [];
    for(const banner of value){
      if(banner.text.toLowerCase().indexOf(args) > -1 || banner.title.toLowerCase().indexOf(args) > -1){
        //console.log('SIP');
        resultBanner.push(banner);
      };
    };
    return resultBanner;
  }

}
