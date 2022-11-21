/** @type {import("../phaser/phaser")} */
var key;
var scene;
var monsterspot="";
var playerhealth
var playermaxhealth
var playerweapon
var playerdamage
var playernormalvelocity
var playerdiagonalvelocity
var playerdropchance
var playeritemdropchance
var playerX=0;
var playerY=0;
var mode
var playerpoints
var press=0
export class Scene5 extends Phaser.Scene
{
    constructor()
    {
        super({
                key:'Scene5'
        });
    }
    init (date)
    {
        playerY=date.playerY
        playerX=date.playerX
        scene=date.origin
        playerhealth=date.playerhealth
        monsterspot=date.monsterspot
        mode=date.mode
        playerpoints=date.playerpoints
        playermaxhealth=date.playermaxhealth
        playerweapon=date.playerweapon
        playerdamage=date.playerdamage
        playernormalvelocity=date.playernormalvelocity
        playerdiagonalvelocity=date.playerdiagonalvelocity
        playerdropchance=date.playerdropchance
        playeritemdropchance=date.playeritemdropchance
    }
    create ()
    {
        key = this.input.keyboard.addKey("ESC");
        press=0;
        this.add.image(500,300,'backgrounds');
        this.add.image(500,40,'Pause')
        const activeGameObjects=
        [
        this.add.image(500,130,'Resume').setName('Resume'),
        this.add.image(430,250,'Load').setName('Load'),
        this.add.image(569,250,'Save').setName('Save'),
        this.add.image(500,365,'Options').setName('Options'),
        this.add.image(500,480,'Exit').setName('Exit')
        ];
        activeGameObjects.forEach(activeGameObjects=>activeGameObjects.setInteractive(this.input.makePixelPerfect()));
        this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if (
                activeGameObjects.find(activeGameObject => activeGameObject === gameObject)
                )
             {
                gameObject.setTint(0x787878);
            }
            this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT, (pointer, gameObject) => {
                if (
                    activeGameObjects.find(activeGameObject => activeGameObject === gameObject)
                )
                 {
                    gameObject.clearTint();
                }
            });
        });
        this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer, gameObject) => 
            {
                if (gameObject.name==='Resume')
                {
                    this.scene.resume(scene,{origin:"Scene5"})
                    this.scene.stop('Scene5')
                }
                if (gameObject.name==='Exit')
                {
                    if(this.fire!=undefined)
                    {
                        this.fire.stop()
                    }
                    this.scene.stop(scene)
                    this.scene.start('Scene2',{origin:"Scene5"})
                }
                if (gameObject.name==='Options')
                {
                    this.scene.start('Scene2',{previous:scene,mode:1})
                    this.scene.setVisible(false,scene)
                }
                if (gameObject.name==='Load')
                {
                    this.scene.start('Scene2',{previous:scene,mode:2})
                    this.scene.setVisible(false,scene)
                }
                if (gameObject.name==='Save')
                {
                    this.scene.start("Scene2",{previous:scene,origin:scene,playerY:playerY,playerX:playerX,playerhealth:playerhealth,monsterspot:monsterspot,playeritemdropchance:playeritemdropchance,playerdropchance:playerdropchance,playerpoints:playerpoints,playermaxhealth:playermaxhealth,mode:3,playerweapon:playerweapon,playerdamage:playerdamage,playernormalvelocity:playernormalvelocity,playerdiagonalvelocity:playerdiagonalvelocity})
                    this.scene.setVisible(false,scene)
                }
            });
    }
    update ()
    {

        var myself=this
        key.on('down', function() { 
            if (press==1) {
                myself.scene.resume(scene,{origin:"Scene5"})
                myself.scene.stop('Scene5')
            }
            
        });
        key.on('up', function() { 
            press=1;
        });

    }
}
