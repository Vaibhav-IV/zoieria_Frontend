import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  isPrevious: boolean = false;
  isNext: boolean = false;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  ngOnInit(): void {
  }


  previousStep()
  {
      this.isPrevious = true;
      this.carousel.prev();
  }

  nextStep()
  {
      this.isNext = true;
      this.carousel.next();

  }

}
