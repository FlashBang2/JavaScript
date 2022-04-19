/** @type {import("../phaser/phaser")} */
var omegalus
var dial
var firesound
export class Prompt1 extends Phaser.Scene
{
    constructor ()
    {
        super
        ({
         key:"Prompt1"
        })
        
    }
    init (data)
    {
        omegalus=data.origin
        dial=data.dial
        firesound=data.firesound
    }
    create ()
    {
        this.add.image(500,300,'background')
        var button=this.add.image(689,400,'button').setName('button')
        var button2=this.add.image(600,400,'view_prompt').setName('view')
        button.setInteractive(this.input.makePixelPerfect())    
        button2.setInteractive(this.input.makePixelPerfect())
        this.input.on (Phaser.Input.Events.GAMEOBJECT_OVER,(pointer,gameObject)=>
        {
            gameObject.setTint(0x787878);
        })
        this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT,(pointer,gameObject)=>{
            gameObject.clearTint()
        })
        this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer,gameObject)=>
        {
            if (pointer.leftButtonDown() && gameObject.name=="button")
            {
               this.scene.stop('Prompt1')
               this.scene.resume('Scene3')   
            }
            if (pointer.leftButtonDown() && gameObject.name=="view")
            {
                firesound.pause()
                this.scene.stop('Prompt1')
                this.scene.setVisible(false,omegalus)
                this.scene.start('Scene12',{origin:omegalus,dial:dial})
                
            }
        })
    }
}
