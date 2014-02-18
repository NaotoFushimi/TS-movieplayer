/// <reference path="jquery.d.ts" />
/// <reference path="Bar.ts" />
/// <reference path="SeekBarOption.ts" />
/// <reference path="Player.ts" />

class SeekBar extends Bar{
    options : SeekBarOption;
    seekbar : HTMLElement;
    width: number;
    appendMethods : {} = {};
    constructor(options:SeekBarOption, width:number){
        super();
        this.options = options;
        if(this.options == null){
            this.options = new SeekBarOption;
        }
        this.width = width;
    }
    
    public createElement(player:Player):HTMLElement{
        var newElement = document.createElement("div");
        newElement.style.width = this.width + "px";
        newElement.className = this.options.class
        if(this.options.height){
            newElement.style.height = this.options.height + "px";
        }
        if(this.options.zIndex){
            newElement.style.zIndex = this.options.zIndex + "";
        }
        if(this.options.railColor){
            newElement.style.backgroundColor = this.options.railColor
        }

        var options : SeekBarOption = this.options;

        this.createdElement = newElement;

        var width = this.width;

        var seekbar =  document.createElement("div");
        if(this.options.height){
            seekbar.style.height = this.options.height + "px";
        }
        seekbar.style.width = width + "px";

        var seekbarInner =  document.createElement("div");
        if(this.options.height){
            seekbarInner.style.height = this.options.height + "px";
        }
        seekbarInner.style.width = "0px";
        seekbarInner.style.position = "absolute";
        if(this.options.filledColor){
            seekbarInner.style.backgroundColor= this.options.filledColor;
        }

        seekbar.appendChild(seekbarInner);

        seekbar.addEventListener("click" , (e) => {
            var clickedX = e.pageX;
            var moveToSec = player.getDuration() * clickedX / width;
            player.setCurrentTime(moveToSec);
        } , false);

        player.hookTimeUpdate((player:Player , video:HTMLVideoElement) => {
            var current:number = video.currentTime;
            var duration:number = player.getDuration();
            var percent = current / duration;
            var filledWidth = width * percent;
            seekbarInner.style.width = filledWidth + "px";
        });
        newElement.appendChild(seekbar);
        this.seekbar = seekbar;
        return newElement;
    }
}