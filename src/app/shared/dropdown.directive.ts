import { Directive, Input, HostListener} from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})

export class DropdownDirective {
    constructor(){}
    @Input('appDropDown')elemref: HTMLElement;
    isOpen = false;
    @HostListener("click")showMenu(){
        if(this.isOpen == false){
            this.elemref.classList.add("show")
        }
        else{
            this.elemref.classList.remove("show")
        }
        this.isOpen = !this.isOpen;
    }
}
