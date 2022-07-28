import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[apptextColor]'
})
export class TextColorDirective {
  constructor(private el: ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    
  }

  private highlight(color: string) {
   
      this.el.nativeElement.style.color = color; 
      if (color) {
      this.el.nativeElement.style.textDecoration = "underline";
    }
    else
      this.el.nativeElement.style.textDecoration = "";
  }
}
