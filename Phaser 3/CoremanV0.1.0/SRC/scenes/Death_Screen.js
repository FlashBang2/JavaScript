/** @type {import("../phaser/phaser")} */
var monsterspot=""
var mus=0
var sfx=0
var fromdead
export class Scene6 extends Phaser.Scene
{
    constructor()
    {
        super
        ({
            key: 'Scene6'
        });
    }
    init(data)
    {
        monsterspot=data.monsterspot
        mus=data.mus
        sfx=data.sfx
    }
    create ()
        {
            this.add.image(500,250,'Death_Screen');
            const button=this.add.image(500,250,'Death_Screen_Respawn').setName('Death_Screen_Respawn');
            const button2=this.add.image(500,300,'Death_Screen_Exit').setName('Death_Screen_Exit');
            button.setInteractive(this.input.makePixelPerfect())  
            button2.setInteractive(this.input.makePixelPerfect())
            this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer,gameObject)=>
            {
            if (pointer.leftButtonDown() && gameObject.name=="Death_Screen_Exit")
            {
               this.scene.stop('Scene4')
               this.scene.stop('Scene9')
               this.scene.start('Scene2',{origin:'Scene5'}) 
            }
            if (pointer.leftButtonDown() && gameObject.name=="Death_Screen_Respawn")
            {
                this.scene.stop('Scene4')
                this.scene.stop('Scene9') 
                this.scene.start('Scene3',{origin:"Scene6",prompt:1,monsterspot:monsterspot,mus:mus,sfx:sfx})
            }
            })
        }
}
