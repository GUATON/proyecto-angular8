import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner';
import 'datatables.net-bs4';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  items: Banner[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  filterBanner ='';
  constructor(
    private bannerS: BannerService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
     setTimeout(() => {
      this.spinner.hide();
    }, 2000);
   }
  pageActual: number = 1;
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.bannerS.getBanners().subscribe(posts => {
    //console.log(posts)
    this.items = posts;
    this.dtTrigger.next();
    });
  }


  deleteItem(event, post){
    Swal.fire({
      title: 'Desea eliminar estos datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.bannerS.deletebanner(post);
        Swal.fire('Disco Eliminado!', '', 'success')
        
      } 
    })
    

  }

}
