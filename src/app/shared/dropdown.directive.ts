import { Directive, Input, HostListener} from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})

export class DropdownDirective {
    constructor(){}
    @Input('appDropDown')elem: HTMLElement;
    isOpen = false;
    @HostListener("document:click",['$event.target'])showMenu(target: HTMLElement){
        if(this.isOpen == false && target === this.elem.previousElementSibling){
            this.elem.classList.add("show")
        }
        else{
            this.elem.classList.remove("show")
        }
        this.isOpen = !this.isOpen;
    }
}
