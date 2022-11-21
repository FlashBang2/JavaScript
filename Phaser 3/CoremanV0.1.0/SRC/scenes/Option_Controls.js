export class Scene13 extends Phaser.Scene
{
    constructor ()
    {
        super 
        ({
            key:"Scene13",
        })
    }
    create ()
    {
        this.add.image(480,520,'back').setScale(0.7).setName('back').setInteractive(this.input.makePixelPerfect())
        this.add.image(470,250,'controls_menu')
        this.add.image(575,100,'w')
        this.add.image(575,150,'s')
        this.add.image(575,200,'a')
        this.add.image(575,260,'d')
        this.add.image(575,310,'leftbutton','1')
        this.add.image(575,360,'rightbutton','1')
        this.add.image(575,410,'esc')
        this.add.image(575,470,'tab')
        this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER,(pointer,gameobject)=>
        {
            gameobject.setTint(0x787878)
        })
        this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT,(pointer,gameobject)=>
        {
            gameobject.clearTint()
        })
        this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN,(pointer,gameobject)=>
        {
            this.scene.stop("Scene13")
            this.scene.resume("Scene2")
        })
    }
}