var key
var press=0
export class Scene10 extends Phaser.Scene
{
    constructor ()
    {
        super ({key:"Scene10"})
    }
    create ()
    {
       key=this.input.keyboard.addKey("TAB")
       press=0;
    }
    update ()
    {
        
        var myself=this
        key.on('down', function() { 
            if (press==1) {
                myself.scene.stop('Scene10')
                if (myself.scene.isPaused('Scene4')) {
                    myself.scene.resume('Scene4')
                }
                if (myself.scene.isPaused('Scene9')) {
                    myself.scene.resume('Scene9')
                }
            }
            
        });
        key.on('up', function() { 
            press=1;
        });

        
    }
}