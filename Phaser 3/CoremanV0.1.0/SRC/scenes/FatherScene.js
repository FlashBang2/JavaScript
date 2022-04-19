
import {Player} from './Player.js'
import {Naked_Player} from './Naked_Player.js'
/** @type {import("../phaser/phaser")} */
var player;
var crap;
var kasztan;
var ub=1;
var block=0
var mapopened
var damageplayerlock=0
var prompted=0
var beenthere
var monsterspot
var monsters
var strzaly;
var przen=0;
var heptun
var health_full
var health_empty
var playerhead
export class FatherScene extends Phaser.Scene
{
    constructor (namescene)
    {
        super ({
            key:namescene
        })
        this.mus=0.1
        this.sfx=0.2
        this.dial=0.2     
    }
    init (data)
    {
        
    }
    preload ()
    {
        
    }
    create ()
    {
        /*  var activeGameObjects=
            [
                this.add.image(50,100,'icoaxe').setName('icoaxe').setDepth(1000000).setScrollFactor(0),
                this.add.image(85,100,'icoboots').setName('icoboots').setDepth(1000000).setScrollFactor(0),
                this.add.image(50,140,'icobow').setName('icobow').setDepth(1000000).setScrollFactor(0),
                this.add.image(85,140,'icomilk').setName('icomilk').setDepth(1000000).setScrollFactor(0),
                this.add.image(50,180,'icopencil').setName('icopencil').setDepth(1000000).setScrollFactor(0)
            ]; 
        activeGameObjects.forEach(activeGameObjects=>{activeGameObjects.setVisible(false)}); */
        this.szsound=this.sound.add('szdamage');
        this.slsound=this.sound.add('sldamage');
        this.gsound=this.sound.add('gdamage');
        this.tsound=this.sound.add('tdamage');
        this.sound2=this.sound.add('takingdamage');
        this.bsound=this.sound.add('bdamage');
        this.gasound=this.sound.add('gadamage');  
        monsters=this.physics.add.group()   
        crap=1
        block=0
        mapopened=0
        if (beenthere==0)
        {
            prompted=0
        }
        if (ub==1)
        {
            player=new Player(this,this.spawnPoint.x,this.spawnPoint.y).setDepth(10)   
        }
        if (ub==0) {
            player=new Naked_Player(this,this.spawnPoint.x,this.spawnPoint.y).setDepth(10)  
        }
        this.pointer=this.input.activePointer;
        return player
        
    }
    update ()
    {
        if (this.sound2!=undefined) 
        {
            this.sound2.volume=this.sfx
            this.szsound.volume=this.sfx
            this.slsound.volume=this.sfx
            this.gsound.volume=this.sfx
            this.tsound.volume=this.sfx
            this.bsound.volume=this.sfx
            this.gasound.volume=this.sfx
        }
            if (prompted==1)
            {
                this.keys = this.input.keyboard.addKeys("W,A,S,D,ESC,TAB");
            }
            if (crap==1 &&ub==1 && prompted==1)
            {
                player.setDepth(player.y)
                player.getByName('Atak_right').setDepth(10000)
                player.getByName('Atak_left').setDepth(10000)
                player.getByName('Atak_up').setDepth(10000)
                player.getByName('Atak_down').setDepth(10000)
                player.getByName('Atak_right_down').setDepth(10000)
                player.getByName('Atak_right_up').setDepth(10000)
                player.getByName('Atak_left_down').setDepth(10000)
                player.getByName('Atak_left_up').setDepth(10000)
                player.update()
                if (this.keys.ESC.isDown)
                {
                    if(this.theme!==undefined){
                    this.theme.pause()
                    }
                    if(this.fire!==undefined)
                    {
                        this.fire.stop()
                    }
                    this.game.renderer.snapshot((image) => {
                        localStorage.setItem("Screenshot", image.src);
                    });
                    if (this.scene.key=="Scene4")
                    {
                        monsterspot=""
                        for (var g=0;g<monsters.getChildren().length;g++)
                        {
                            monsterspot+=monsters.getChildren()[g].x+" "+monsters.getChildren()[g].y+" "+monsters.getChildren()[g].name+" "
                        }
                        this.scene.pause(this.scene.key)
                        this.scene.launch("Scene5",{origin:this.scene.key,playerX:player.x,playerY:player.y,monsterspot:monsterspot,playeritemdropchance:player.itemdropchance,playerdropchance:player.dropchance,playerhealth:player.health,mode:1,playerpoints:player.points,playermaxhealth:player.maxhealth,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity})
                    }
                    if (this.scene.key=="Scene3")
                    {
                        this.scene.pause(this.scene.key)
                        this.scene.launch("Scene5",{origin:this.scene.key,playerX:player.x,playerY:player.y,monsterspot:monsterspot,playeritemdropchance:player.itemdropchance,playerdropchance:player.dropchance,playerhealth:player.health,mode:1,playerpoints:player.points,playermaxhealth:player.maxhealth,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,mode:1})
                    }
                    if (this.scene.key=="Scene9")
                    {
                        monsterspot=""
                        for (var g=0;g<monsters.getChildren().length;g++)
                        {
                            monsterspot+=monsters.getChildren()[g].x+" "+monsters.getChildren()[g].y+" "+monsters.getChildren()[g].name+" "
                        }
                        this.scene.pause(this.scene.key)
                        this.scene.launch("Scene5",{origin:this.scene.key,playerX:player.x,playerY:player.y,monsterspot:monsterspot,playeritemdropchance:player.itemdropchance,playerdropchance:player.dropchance,playerhealth:player.health,mode:1,playerpoints:player.points,playermaxhealth:player.maxhealth,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity})
                    }
                    
                }
                if (this.keys.TAB.isDown)
                {
                    if (this.scene.key=="Scene4")
                    {
                        if (mapopened==0)
                        {
                            mapopened=1
                            this.scene.pause("Scene4")
                            this.cameras.main.visible=false
                            this.minimap.visible=false
                            health_full.getChildren().forEach((child)=>{
                                child.visible=false
                            })
                            health_empty.getChildren().forEach((child)=>{
                                child.visible=false
                            })
                            heptun=this.cameras.add(0,0,960,540)
                            heptun.scrollX=1275
                            heptun.scrollY=1375
                            heptun.setZoom(0.36,0.000009) //(0.36,0.000009)
                            this.monstershead=this.add.group()
                            monsters.getChildren().forEach((child)=>
                            {
                                if (child.name=="skeleton")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead','1').setDepth(10000).setScale(4)
                                }
                                if (child.name=="goblin")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead','0').setDepth(10000).setScale(4)
                                }
                                if (child.name=="slime")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead','3').setDepth(10000).setScale(4)
                                }
                                if (child.name=="treeman")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead','2').setDepth(10000).setScale(4)
                                }
                            })
                            if (this.cancel!=undefined || this.cancel!=null)
                            {
                                heptun.ignore(this.cancel)
                            }
                            playerhead=this.add.sprite(player.x,player.y,'monstershead','4').setDepth(10000).setScale(4)
                            heptun.ignore(monsters)
                            heptun.ignore(this.thatsnice)
                            heptun.ignore(this.evenfunnierstuff)
                            heptun.ignore(this.funnystuff)
                            heptun.ignore(player)
                            this.scene.launch("Scene10")
                            this.events.once('resume', ()=>
                            {
                                this.MAPPER()
                            })
                        }
                    }
                    if (this.scene.key=="Scene9")
                    {
                        if (mapopened==0)
                        {
                            mapopened=1
                            this.scene.pause("Scene9")
                            this.cameras.main.visible=false
                            this.minimap.visible=false
                            health_full.getChildren().forEach((child)=>{
                                child.visible=false
                            })
                            health_empty.getChildren().forEach((child)=>{
                                child.visible=false
                            })
                            heptun=this.cameras.add(0,0,960,540)
                            heptun.scrollX=1275
                            heptun.scrollY=1375
                            heptun.setZoom(0.36,0.000009) //(0.36,0.000009)
                            this.monstershead=this.add.group()
                            monsters.getChildren().forEach((child)=>
                            {
                                if (child.name=="devilskeleton")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead2','1').setDepth(10000).setScale(4)
                                }
                                if (child.name=="goblinarcher")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead2','0').setDepth(10000).setScale(4)
                                }
                                if (child.name=="fireslime")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead2','3').setDepth(10000).setScale(4)
                                }
                                if (child.name=="barbarian")
                                {
                                    this.monstershead.get(child.x,child.y,'monstershead2','2').setDepth(10000).setScale(4)
                                }
                            })
                            playerhead=this.add.sprite(player.x,player.y,'monstershead2','4').setDepth(10000).setScale(4)
                            heptun.ignore(monsters)
                            heptun.ignore(this.thatsnice)
                            heptun.ignore(this.evenfunnierstuff)
                            heptun.ignore(this.funnystuff)
                            heptun.ignore(player)
                            this.scene.launch("Scene10")
                            var elo=this.events.once('resume', ()=>
                            {
                                this.MAPPER()
                            })
                        }
                    }
                   
                }
        }
        if (crap==1&&ub==0 && prompted==1)
        {
            player.setDepth(player.y)
            player.update()
            if (this.keys.ESC.isDown)
            {
                if(this.fire!==undefined)
                {
                    this.fire.pause()
                }
                this.game.renderer.snapshot((image) => {
                    localStorage.setItem("Screenshot", image.src);
                });
                this.scene.pause(this.scene.key)
                this.scene.launch("Scene5",{origin:this.scene.key,playerX:player.x,playerY:player.y})
            }
        }

    }
    WARDROBE ()
    {
        crap=0
    }
    WARDROBEDone ()
    {
        player=new Player(this,635,600).setDepth(10);
        crap=1
        player.atack_cooldown=1
        player.hook_cooldown=1
        return player
    }
     AI(monster,string,player,heart_full,heart_empty)
    {
        var ligas=this
       if (monster.health!=0)
       {
        switch (string)
        {
            case "skeleton":{string="s";break;} 
            case "goblin":{string="g";break;}
            case "slime":{string="sl";break;}
            case "treeman":{string="t";break;}
            case "fireslime":{string="fs";break;}
            case "goblinarcher":{string="ag";break;}
            case "barbarian":{string="b";break;}
            case "devilskeleton":{string="ds";break;}
        }
        if (string=="ds"  && monster.movement==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<400 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)>150)
        {
            monster.movement=1
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(112.5) ) //GOBLIN DOWN
            {
                monster.setVelocity(0,90)
                monster.play('dsdol')
                this.time.addEvent({delay:500,callback:()=>
                {
                    monster.setVelocity(0,0)
                    monster.movement=0
                }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=112.5) //GOBLIN UP
            {
                monster.setVelocity(0,-90)
                monster.play('dsgora')
                this.time.addEvent({delay:500,callback:()=>
                {
                    monster.setVelocity(0,0)
                    monster.movement=0
                }})
            }
            
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=-(22.5))// GOBLIN LEFT
            {
                monster.setVelocity(-90,0)
                monster.play('dslewo')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if ((Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=157.5)) // GOBLIN RIGHT
            {
                monster.setVelocity(90,0)
                monster.play('dsprawo')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(157.5))//GOBLIN RIGHT-DOWN
            {
                monster.setVelocity(63,63)
                monster.play('dsskos_frontP')
                this.time.addEvent({delay:500,callback:()=>
                {
                    monster.setVelocity(0,0)
                    monster.movement=0
                }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(67.5)) //GOBLIN RIGHT-UP
            {
                monster.setVelocity(-63,63)
                monster.play('dsskos_frontL')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=67.5) //GOBLIN LEFT-UP
            {
                monster.setVelocity(-63,-63)
                monster.play('dsskos_tylL')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if ( Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<157.5) //GOBLIN RIGHT-DOWN
            {
                monster.setVelocity(63,-63)
                monster.play('dsskos_tylP')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            } 
        } 
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.movement==0 && monster.devilscoll==0 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(112.5))
        {
           monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_dol"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_dol",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            this.time.addEvent({delay:10,callback:()=>{
                obj.getChildren().forEach((child)=>{
                    child.rotation+=0.1
                })
            },loop:true})
            this.physics.add.collider(player,obj,(stuff,imx)=>
            {
                imx.destroy()
                this.DAMAGE(player,heart_full,heart_empty,monster)
            })
            obj.getChildren()[0].setVelocityY(270)
            obj.getChildren()[1].setVelocity(-190,190)
            obj.getChildren()[2].setVelocity(190,190)
            this.time.addEvent({ delay: 1500, callback: ()=>
              {
                    obj.clear(true,true)
              }, callbackScope: this });
            this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
           })
           
        }
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0 && monster.movement==0 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=112.5)
        {
            monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_gora"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_gora",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            this.time.addEvent({delay:10,callback:()=>{
                obj.getChildren().forEach((child)=>{
                    child.rotation+=0.1
                })
            },loop:true})
            this.physics.add.collider(player,obj,(stuff,imx)=>
            {
                imx.destroy()
                this.DAMAGE(player,heart_full,heart_empty,monster)
            })
            obj.getChildren()[0].setVelocityY(-270)
            obj.getChildren()[1].setVelocity(-190,-190)
            obj.getChildren()[2].setVelocity(190,-190)
            this.time.addEvent({ delay: 1500, callback: ()=>{
                 obj.clear(true,true)
              }, callbackScope: this });
            this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
           })               
        }
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0 && monster.movement==0 &&(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=157.5))
        {
           monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_prawo"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_prawo",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            obj.get(monster.x,monster.y,'bone').setDepth(10000)
            this.time.addEvent({delay:10,callback:()=>
                       {
                           obj.getChildren().forEach((child)=>
                           {
                            child.rotation+=0.1
                           })
                       },loop:true})
                       this.physics.add.collider(player,obj,(stuff,imx)=>
                       {
                           imx.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.getChildren()[0].setVelocityX(270)
                       obj.getChildren()[1].setVelocity(190,-190)
                       obj.getChildren()[2].setVelocity(190,190)
                       this.time.addEvent({ delay: 1500, callback: ()=>{
                           obj.clear(true,true)
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
        })
        }
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0 && monster.movement==0 &&Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=-(22.5))
        {
            monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_lewo"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_lewo",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.getChildren().forEach((child)=>{
                              child.rotation+=0.1
                           })
                       },loop:true})
                       this.physics.add.collider(player,obj,(stuff,imx)=>
                       {
                           imx.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.getChildren()[0].setVelocityX(-270)
                       obj.getChildren()[1].setVelocity(-190,-190)
                       obj.getChildren()[2].setVelocity(-190,190)
                       this.time.addEvent({ delay: 1500, callback: ()=>{
                           obj.clear(true,true)
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
            })
        }
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0 && monster.movement==0 &&Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(157.5))
        {
           monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_skos_dolP"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_dolP",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
                       obj.get(monster.x,monster.y,'bone').setDepth(10000)
                       obj.get(monster.x,monster.y,'bone').setDepth(10000)
                       obj.get(monster.x,monster.y,'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.getChildren().forEach((child)=>{
                            child.rotation+=0.1
                           })
                       },loop:true})
                       this.physics.add.collider(player,obj,(stuff,imx)=>
                       {
                           imx.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.getChildren()[0].setVelocity(190,190)
                       obj.getChildren()[1].setVelocityX(270)
                       obj.getChildren()[2].setVelocityY(270)
                       this.time.addEvent({ delay: 1500, callback: ()=>{
                           obj.clear(true,true)
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
                        })
        }
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0 && monster.movement==0 &&  Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(67.5))
        {
           monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_skos_dolL"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_dolL",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
                       obj.get(monster.x,monster.y,'bone').setDepth(10000)
                       obj.get(monster.x,monster.y,'bone').setDepth(10000)
                       obj.get(monster.x,monster.y,'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.getChildren().forEach((child)=>{
                                child.rotation+=0.1
                           })
                       },loop:true})
                       this.physics.add.collider(player,obj,(stuff,imx)=>
                       {
                           imx.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.getChildren()[0].setVelocity(-190,190)
                       obj.getChildren()[1].setVelocityX(-270)
                       obj.getChildren()[2].setVelocityY(270)
                       this.time.addEvent({ delay: 1500, callback: ()=>{
                            obj.clear(true,true)
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
                        })
        } 
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0  && monster.movement==0 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=67.5)
        {
           monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_skos_goraL"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_goraL",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.getChildren().forEach((child)=>{
                               child.rotation+=0.1
                           })
                       },loop:true})
                       this.physics.add.collider(player,obj,(stuff,imx)=>
                       {
                           imx.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.getChildren()[0].setVelocity(-190,-190)
                       obj.getChildren()[1].setVelocityX(-270)
                       obj.getChildren()[2].setVelocityY(-270)
                       this.time.addEvent({ delay: 1500, callback: ()=>{
                           obj.clear(true,true)
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
                        })
        } 
        if (string=="ds"  && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<=150 && monster.devilscoll==0 && monster.movement==0 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<157.5)
        {
           monster.devilscoll=1
           monster.movement=1
           monster.play({key:string+"atak_skos_goraP"})
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_goraP",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.group()
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       obj.get(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.getChildren().forEach((child)=>{
                                child.rotation+=0.1
                           })
                       },loop:true})
                       this.physics.add.collider(player,obj,(stuff,imx)=>
                        {
                            imx.destroy()
                            this.DAMAGE(player,heart_full,heart_empty,monster)
                        })
                       obj.getChildren()[0].setVelocity(190,-190)
                       obj.getChildren()[1].setVelocityX(270)
                       obj.getChildren()[2].setVelocityY(-270)
                       this.time.addEvent({ delay: 1500, callback: ()=>{
                           obj.clear(true,true)
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 3000, callback: ()=>{monster.devilscoll=0},callbackScope:this})
           })
        }  
        if (string=="t" && monster.plant==0 && monster.trapmax<=3)
        { 
        monster.plant=1
        monster.movement=1
        monster.trapmax++
        switch (Phaser.Math.Between(1,8))
        {
            case 1:
                {
                    
                    if(this.layer5.getTileAtWorldXY(monster.x,monster.y+32)==null&& this.layer2.getTileAtWorldXY(monster.x,monster.y+32)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+'plantdown')
                    monster.once("animationcomplete-"+string+"plantdown",()=>
                    {
                        monster.setMaxVelocity(1000,1000)
                        monster.movement=0
                    })
                    var lig=this.physics.add.sprite(monster.x,monster.y+32,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lig.destroy()
                                    lubudu.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 2:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x,monster.y-32)==null&& this.layer2.getTileAtWorldXY(monster.x,monster.y-32)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+'plantup')
                    monster.once("animationcomplete-"+string+"plantup",()=>{
                        monster.setMaxVelocity(1000,1000)
                        monster.movement=0
                    })
                    var lig=this.physics.add.sprite(monster.x,monster.y-32,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lig.destroy()
                                    lubudu.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 3:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x+32,monster.y)==null&&this.layer2.getTileAtWorldXY(monster.x+32,monster.y)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+'plantright')
                    monster.once("animationcomplete-"+string+"plantright",()=>{
                        monster.setMaxVelocity(1000,1000)
                        monster.movement=0
                    })
                    var lig=this.physics.add.sprite(monster.x+32,monster.y,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lig.destroy()
                                    lubudu.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 4:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x-32,monster.y)==null&& this.layer2.getTileAtWorldXY(monster.x-32,monster.y)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+"plantleft")
                    monster.once("animationcomplete-"+string+"plantleft",()=>{
                        monster.setMaxVelocity(1000,1000)
                        monster.movement=0
                    })
                    var lig=this.physics.add.sprite(monster.x-32,monster.y,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lubudu.destroy()
                                    lig.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 5:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x-32,monster.y-32)==null&& this.layer2.getTileAtWorldXY(monster.x-32,monster.y-32)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+"plantleftup")
                    monster.once("animationcomplete-"+string+"plantleftup",()=>{
                        monster.setMaxVelocity(1000,1000)
                        monster.movement=0
                    })
                    var lig=this.physics.add.sprite(monster.x-32,monster.y-32,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lubudu.destroy()
                                    lig.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 6:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x+32,monster.y-32)==null&& this.layer2.getTileAtWorldXY(monster.x+32,monster.y-32)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+"plantrightup")
                    monster.once("animationcomplete-"+string+"plantrightup",()=>
                    {
                        monster.setMaxVelocity(1000,1000)
                        monster.movement=0
                    })
                    var lig=this.physics.add.sprite(monster.x+32,monster.y-32,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lubudu.destroy()
                                    lig.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 7:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x-32,monster.y+32)==null&& this.layer2.getTileAtWorldXY(monster.x-32,monster.y+32)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+"plantleftdown")
                    monster.once("animationcomplete-"+string+"plantleftdown",()=>{
                        monster.movement=0
                        monster.setMaxVelocity(1000,1000)
                    })
                    var lig=this.physics.add.sprite(monster.x-32,monster.y+32,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lig.destroy()
                                    lubudu.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
            case 8:
                {
                    if(this.layer5.getTileAtWorldXY(monster.x+32,monster.y+32)==null&& this.layer2.getTileAtWorldXY(monster.x+32,monster.y+32)==null)
                    {
                    monster.setMaxVelocity(0,0)
                    monster.play(string+"plantrightdown")
                    monster.once("animationcomplete-"+string+"plantrightdown",()=>{
                        monster.movement=0
                        monster.setMaxVelocity(1000,1000)
                    })
                    var lig=this.physics.add.sprite(monster.x+32,monster.y+32,'trap').setDepth(monster.y).setPushable(false)
                    lig.play('planting')
                    lig.once("animationcomplete-planting",()=>
                    {
                        ligas.PLANT_REFRESHER(monster)
                        this.time.addEvent({delay:15000,callback:()=>{
                            lig.destroy()
                            monster.trapmax--
                        }})
                        lig.play({key:"planted_loop",repeat:-1})
                        var extra=this.physics.add.collider(player,lig,()=>
                        {
                            lig.play("exploding_anticipation")
                            lig.once("animationcomplete-exploding_anticipation",()=>
                            {
                                var lubudu=ligas.physics.add.sprite(lig.x,lig.y,'bone').setBodySize(50,30)
                                var osman=ligas.physics.add.overlap(lubudu,player,()=>
                                {
                                    osman.destroy()
                                    player.body.setMaxVelocity(70,70)
                                    if (this.cancel==undefined || this.cancel==null)
                                    {
                                        player.getByName('indicator_speed_down').setVisible(true)
                                        player.getByName('indicator_speed_down').play('speednerf_on')
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                        {
                                            player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                        {
                                            player.getByName('indicator_speed_down').play('speednerf_off')
                                        })
                                        player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                        {
                                            player.getByName('indicator_speed_down').setVisible(false)
                                            player.getByName('indicator_speed_up').setVisible(true)
                                            player.getByName('indicator_speed_up').play('speedbuff_on')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                        {
                                            player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                        {
                                            player.getByName('indicator_speed_up').play('speedbuff_off')
                                        })
                                        player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                        {
                                            player.getByName('indicator_speed_up').setVisible(false)
                                        })
                                        this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                        this.minimap.ignore(this.cancel)
                                        this.cancel.active=true
                                        this.cancel.setScrollFactor(0)
                                        this.cancel.alpha=0.25
                                    }else{
                                        if (this.cancel._eventsCount==0) {
                                            player.getByName('indicator_speed_down').setVisible(true)
                                            player.getByName('indicator_speed_down').play('speednerf_on')
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_on",()=>
                                            {
                                                player.getByName('indicator_speed_down').play({key:'speednerf_loop',repeat:3})
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_loop",()=>
                                            {
                                                player.getByName('indicator_speed_down').play('speednerf_off')
                                            })
                                            player.getByName('indicator_speed_down').once("animationcomplete-speednerf_off",()=>
                                            {
                                                player.getByName('indicator_speed_down').setVisible(false)
                                                player.getByName('indicator_speed_up').setVisible(true)
                                                player.getByName('indicator_speed_up').play('speedbuff_on')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                                            {
                                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                                            {
                                                player.getByName('indicator_speed_up').play('speedbuff_off')
                                            })
                                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                                            {
                                                player.getByName('indicator_speed_up').setVisible(false)
                                            })
                                            this.cancel=ligas.add.image(480,270,'slow_treeman').setDepth(20000)
                                            this.minimap.ignore(this.cancel)
                                            this.cancel.active=true
                                            this.cancel.setScrollFactor(0)
                                            this.cancel.alpha=0.25
                                        }
                                    }
                                    ligas.time.addEvent({delay:3000,callback:()=>
                                    {   
                                            player.body.setMaxVelocity(1000,1000)
                                            this.cancel.destroy()
                                    }})
                                })
                                lig.play("explosion")
                                lig.once("animationcomplete-explosion",()=>{
                                    lig.destroy()
                                    lubudu.destroy()
                                })
                            })
                            extra.destroy()
                        })
                    })
                }
                else
                {
                    monster.plant=0
                    monster.movement=0   
                }
                    break;
                }
        }
        }
        if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(112.5) && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_dol"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_dol",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
            this.time.addEvent({delay:10,callback:()=>{
                obj.rotation+=0.1
            },loop:true})
            obj.setDepth(10)
            this.physics.add.collider(player,obj,()=>
            {
                obj.destroy()
                this.DAMAGE(player,heart_full,heart_empty,monster)
            })
            obj.setVelocityY(270)
            this.time.addEvent({ delay: 2500, callback: ()=>
                {
                obj.destroy()
                monster.movement=0
              }, callbackScope: this });
            this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
           })
           
        }
        if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=112.5  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_gora"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_gora",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
            const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
            this.time.addEvent({delay:10,callback:()=>{
                obj.rotation+=0.1
            },loop:true})
            obj.setDepth(10)
            this.physics.add.collider(player,obj,()=>
            {
                obj.destroy()
                this.DAMAGE(player,heart_full,heart_empty,monster)
            })
            obj.setVelocityY(-270)
            this.time.addEvent({ delay: 2500, callback: ()=>{
                obj.destroy()
                monster.movement=0
              }, callbackScope: this });
            this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
           })               
        }
        if (string=="s" && (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=157.5)  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_prawo"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_prawo",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
                       const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.rotation+=0.1
                       },loop:true})
                       obj.setDepth(10)
                       this.physics.add.collider(player,obj,()=>
                       {
                           obj.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.setVelocityX(270)
                       this.time.addEvent({ delay: 2500, callback: ()=>{
                           obj.destroy()
                           monster.movement=0
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
        })
        }
        if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=-(22.5)  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_lewo"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_lewo",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
                       const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.rotation+=0.1
                       },loop:true})
                       obj.setDepth(10)
                       this.physics.add.collider(player,obj,()=>
                       {
                           obj.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.setVelocityX(-270)
                       this.time.addEvent({ delay: 2500, callback: ()=>{
                           obj.destroy()
                           monster.movement=0
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
            })
        }
         if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(157.5)  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_skos_dolP"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_dolP",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
                       const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.rotation+=0.1
                       },loop:true})
                       obj.setDepth(10)
                       this.physics.add.collider(player,obj,()=>
                       {
                           obj.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.setVelocityX(190)
                       obj.setVelocityY(190)
                       this.time.addEvent({ delay: 2500, callback: ()=>{
                           obj.destroy()
                           monster.movement=0
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
                        })
        }
        if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(67.5)  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_skos_dolL"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_dolL",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
                       const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.rotation+=0.1
                       },loop:true})
                       obj.setDepth(10)
                       this.physics.add.collider(player,obj,()=>
                       {
                           obj.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.setVelocityX(-190)
                       obj.setVelocityY(190)
                       this.time.addEvent({ delay: 2500, callback: ()=>{
                           obj.destroy()
                           monster.movement=0
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
                        })
        } 
        if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=67.5  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_skos_goraL"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_goraL",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
                       const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.rotation+=0.1
                       },loop:true})
                       obj.setDepth(10)
                       this.physics.add.collider(player,obj,()=>
                       {
                           obj.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.setVelocityX(-190)
                       obj.setVelocityY(-190)
                       this.time.addEvent({ delay: 2500, callback: ()=>{
                           obj.destroy()
                           monster.movement=0
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
                        })
        } 
        if (string=="s" && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<157.5  && monster.scoll==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<200)
        {
           monster.play({key:string+"atak_skos_goraP"})
           monster.scoll=1
           monster.movement=1
           monster.setMaxVelocity(0,0)
           monster.once("animationcomplete-"+string+"atak_skos_goraP",()=>
           {
            monster.movement=0
            monster.setMaxVelocity(1000,1000)
                       const obj=this.physics.add.image(monster.x,monster.y, 'bone').setDepth(10000)
                       this.time.addEvent({delay:10,callback:()=>{
                           obj.rotation+=0.1
                       },loop:true})
                       obj.setDepth(10)
                       this.physics.add.collider(player,obj,()=>
                       {
                           obj.destroy()
                           this.DAMAGE(player,heart_full,heart_empty,monster)
                       })
                       obj.setVelocityX(190)
                       obj.setVelocityY(-190)
                       this.time.addEvent({ delay: 2500, callback: ()=>{
                           obj.destroy()
                           monster.movement=0
                         }, callbackScope: this });
                       this.time.addEvent({ delay: 4000, callback: ()=>{monster.scoll=0},callbackScope:this})
           })
        }  
        if (monster.atakor==0 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<100 && string=='g')
        {
            monster.atakor=1
            monster.movement=1
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(112.5)) //DOL
            {
                monster.play('gatak_dol')
                monster.once('animationcomplete-gatak_dol',()=>
                {
                    var yebudup=this.physics.add.sprite(monster.x,monster.y+50,'bone')
                    yebudup.setBodySize(45,37)
                    yebudup.setOffset(-10,0)
                    this.physics.add.overlap(player,yebudup,()=>
                    {
                        yebudup.destroy()
                        this.DAMAGE(player,heart_full,heart_empty,monster)
                    })
                    monster.atakor=0
                    monster.movement=0
                    if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=112.5) //GORA
            {
                monster.play('gatak_gora')
                monster.once('animationcomplete-gatak_gora',()=>
                {  
                   var yebudup=this.physics.add.sprite(monster.x,monster.y-50,'bone')
                   yebudup.setBodySize(45,37)
                   yebudup.setOffset(-10,-2)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                       yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                   monster.atakor=0
                   monster.movement=0
                   if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=-(22.5)) //LEWO
            {
                monster.play({key:'gatak_lewo'})
                monster.once('animationcomplete-gatak_lewo',()=>
                {
                   
                    var yebudup=this.physics.add.sprite(monster.x-50,monster.y,'bone')
                    yebudup.setBodySize(60,62)
                    yebudup.setOffset(-20,-15)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                      yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                   monster.atakor=0
                   monster.movement=0
                   if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
            if ((Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=157.5)) //PRAWO
            {
                monster.play('gatak_prawo')
                monster.once('animationcomplete-gatak_prawo',()=>
                {   
                    var yebudup=this.physics.add.sprite(monster.x+50,monster.y,'bone')
                    yebudup.setBodySize(77,62)
                    yebudup.setOffset(-27,-15)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                       yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                    monster.atakor=0
                    monster.movement=0
                    if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                           yebudup.destroy()
                        }})
                    }
                })
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(157.5)) //RIGHT-DOWN
            {
                monster.play('gatak_skos_pdol')
                monster.once('animationcomplete-gatak_skos_pdol',()=>
                {
                    var yebudup=this.physics.add.sprite(monster.x+50,monster.y+50,'bone')
                    yebudup.setBodySize(65,45)
                    yebudup.setOffset(-15,-8)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                       yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                    monster.atakor=0
                    monster.movement=0
                    if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(67.5)) //LEFT-DOWN
            {
                monster.play('gatak_skos_ldol')
                monster.once('animationcomplete-gatak_skos_ldol',()=>
                {
                    var yebudup=this.physics.add.sprite(monster.x-50,monster.y+50,'bone')
                    yebudup.setBodySize(60,45)
                    yebudup.setOffset(-20,-8)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                       yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                    monster.atakor=0
                    monster.movement=0
                    if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=67.5) //LEFT UP
            {
                monster.play('gatak_skos_goral')
                monster.once('animationcomplete-gatak_skos_goral',()=>
                {
                   var yebudup=this.physics.add.sprite(monster.x-50,monster.y-50,'bone')
                   yebudup.setBodySize(60,60)
                   yebudup.setOffset(-20,-2)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                       yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                    monster.atakor=0
                    monster.movement=0
                    if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<157.5) //RIGHT UP
            {
                monster.play('gatak_skos_gora')
                monster.once('animationcomplete-gatak_skos_gora',()=>
                {
                   var yebudup=this.physics.add.sprite(monster.x+50,monster.y-50,'bone')
                   yebudup.setBodySize(65,60)
                   yebudup.setOffset(-14,-2)
                   this.physics.add.overlap(player,yebudup,()=>
                   {
                       yebudup.destroy()
                       this.DAMAGE(player,heart_full,heart_empty,monster)
                   })
                    monster.atakor=0
                    monster.movement=0 
                    if (yebudup!==undefined)
                    {
                        this.time.addEvent({delay:500,callback:()=>
                        {
                            yebudup.destroy()
                        }})
                    }
                })
            }
        }
        if (monster.movement==0 && string=="g" && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)<300 && Phaser.Math.Distance.Between(player.x,player.y,monster.x,monster.y)>100 && monster.atakor==0)
        {
            monster.movement=1
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(112.5) ) //GOBLIN DOWN
            {
                monster.setVelocity(0,90)
                monster.play('gdol')
                this.time.addEvent({delay:500,callback:()=>
                {
                    monster.setVelocity(0,0)
                    monster.movement=0
                }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=112.5) //GOBLIN UP
            {
                monster.setVelocity(0,-90)
                monster.play('ggora')
                this.time.addEvent({delay:500,callback:()=>
                {
                    monster.setVelocity(0,0)
                    monster.movement=0
                }})
            }
            
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=-(22.5))// GOBLIN LEFT
            {
                monster.setVelocity(-90,0)
                monster.play('glewo')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if ((Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>=157.5)) // GOBLIN RIGHT
            {
                monster.setVelocity(90,0)
                monster.play('gprawo')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(157.5))//GOBLIN RIGHT-DOWN
            {
                monster.setVelocity(63,63)
                monster.play('gskos_frontP')
                this.time.addEvent({delay:500,callback:()=>
                {
                    monster.setVelocity(0,0)
                    monster.movement=0
                }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>-(67.5)) //GOBLIN RIGHT-UP
            {
                monster.setVelocity(-63,63)
                monster.play('gskos_frontL')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<=67.5) //GOBLIN LEFT-UP
            {
                monster.setVelocity(-63,-63)
                monster.play('gskos_tylL')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
            if ( Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x,player.y,monster.x,monster.y))<157.5) //GOBLIN RIGHT-DOWN
            {
                monster.setVelocity(63,-63)
                monster.play('gskos_tylP')
                this.time.addEvent({delay:500,callback:()=>
                    {
                        monster.setVelocity(0,0)
                        monster.movement=0
                    }})
            }
        } 
        if ( string=="fs" && monster.movement==0) {
            monster.fireslimefire.get(monster.x,monster.y,'fire').setImmovable().setDepth(monster.y).play({key:"Loopfire",repeat:-1})
            while(monster.fireslimefire.getChildren().length>5){
                
                monster.fireslimefire.getChildren()[0].destroy()  
            
            }
            this.physics.add.collider(player,monster.fireslimefire,(stuff,imx)=>
                {
                    imx.destroy()
                    this.DAMAGE(player,heart_full,heart_empty,monster)
                })
        }
     if (monster.movement==0)
      {
        switch ((Math.floor(Math.random() * 8)+1))
       {
           case 1:
               {
                   monster.play({key:string+"dol",repeat:-1})
                   monster.setVelocityY(90)
                   break;
               }
           case 2:
               {
                   monster.play({key:string+"gora",repeat:-1})
                   monster.setVelocityY(-(90))
                   break;
               }
           case 3:
               {  
                   monster.play({key:string+"prawo",repeat:-1})
                   monster.setVelocityX(90)
                   break;
               }
           case 4:
               {
                   monster.play({key:string+"skos_frontP",repeat:-1})
                   monster.setVelocity(63,63)
                   break;
               }
           case 5:
               {
                   monster.play({key:string+"skos_tylP",repeat:-1})
                   monster.setVelocity(63,-(63))
                   break;
               }
           case 6:
               {
                   monster.play({key:string+"lewo",repeat:-1})
                   monster.setVelocityX(-90)
                   break;
               }
           case 7:
               {
                   monster.play({key:string+"skos_frontL",repeat:-1})
                   monster.setVelocity(-(63),63)
                   break;
               }
           case 8:
               {
                   monster.play({key:string+"skos_tylL",repeat:-1})
                   monster.setVelocity(-(63),-(63))
                   break;
               }
           } 
        }    
       
       } 
       
    }
     DAMAGE (player,heart_full,heart_empty,monster)
     {
        if (damageplayerlock==0)
        {
        damageplayerlock=1
        this.sound2.play()
        this.cameras.main.shake(250,0.009)
        if (monster.name=="barbarian")
        {
            player.health--
            heart_full.getChildren()[player.health].visible=false
            heart_empty.getChildren()[player.health].setDepth(10000)
            player.health--
        }
        else
        {
            player.health--
        }
        if(player.health>-1)
        {
        heart_full.getChildren()[player.health].visible=false
        heart_empty.getChildren()[player.health].setDepth(10000)
        player.getByName('Player').setTint(0xFF0000)
        this.time.addEvent({delay:1000,callback:()=>
        {
            player.getByName('Player').clearTint()
            damageplayerlock=0
         
        }})
        }
        if(player.health<=0)
        {
            crap=0
            player.body.setVelocity(0,0)
            player.body.checkCollision.none = false;
            this.time.removeEvent(player.troz)
            this.time.removeEvent(player.tz)
            this.time.removeEvent(player.tz1)
            this.time.removeEvent(player.tz2)
            player.getByName('Player').play({key:"dead"},true)
            player.getByName('Player').once('animationcomplete-dead',()=>
            {
                this.theme.stop()
                this.scene.pause("Scene4")
                this.scene.pause("Scene9")
                player.destroy()
                this.scene.launch("Scene6",{monsterspot:monsterspot,mus:this.mus,sfx:this.sfx})
            })  
        }
       
        }
     }
     KASZTELAN ()
     {
        kasztan=0
     }
     PODLASKI ()
     {
         kasztan=1
     }
     PASTERYZOWANE ()
    {
        return kasztan
    }
    UBRANY ()
    {
        ub=1
    }
    ROZEBRANY ()
    {
        ub=0
    }
    RESET_ABI (monster)
    {
        if (monster.name=='skeleton')
        {   
            monster.scoll=0
        }
    }
    HEALTH_RESTORATION (heart_full,heart_empty)
    {
        if(player.health<player.maxhealth){
            heart_full.getChildren()[player.health].visible=true
            heart_empty.getChildren()[player.health].setDepth(0)
            player.health++
        }
    }
   
    RESETIMMORTALFRAME()
    {
        damageplayerlock=0
    }
    BETTERSTART ()
    {
        prompted=1
    }
    BETTERMIND ()
    {
        beenthere=1
    }
    WORSEN ()
    {
        beenthere=0
    }
    RETYPO(monstersx)
    {
        monsters=monstersx
    }
    jumpSlime(enemy,layer)
    {
        enemy.body.checkCollision.none = true;
        przen=0
        enemy.movement=1;
        enemy.setVelocity(0,0)
        enemy.play({key:"deadsl"})
        enemy.once('animationcomplete-deadsl', ()=>
        {
            while (przen==0){
                var xs=Phaser.Math.Between(0, 3214);
                var ys=Phaser.Math.Between(0, 3227);
                if(layer.getTileAtWorldXY(xs,ys)===null&&xs>=0&&ys>=0&&xs<=3200&&ys<=3200){
                    enemy.x=xs;
                    enemy.y=ys; 
                    przen=1
                    enemy.playReverse("deadsl")
                }
            }
            enemy.once('animationcomplete-deadsl', ()=>
            {
                enemy.body.checkCollision.none = false;
                enemy.movement=0;
            })
        })
    }
    MAPPER ()
    {
        mapopened=0
        this.cameras.main.visible=true
        this.minimap.visible=true
        this.monstershead.clear(true,true)
        for (let i = 0; i < player.health; i++) {
        health_full.getChildren()[i].visible=true  
            
        }
        for (let i = 0; i < player.maxhealth; i++) {
            health_empty.getChildren()[i].visible=true    
            }
        playerhead.destroy()
        heptun.visible=false
    }
    REBIND_HEALTH (h_f,h_e)
    {
        health_full=h_f
        health_empty=h_e
    }
    CRAP_SETTER ()
    {
        crap=1
    }
    CRAP_TURNER ()
    {
        return crap
    }
    DROPPINGITEMS()
    {
        if (player.itemdropchance==10)
        {
            while(player.itemdropchance!=0){
                var xit =Phaser.Math.Between(50,80);
                var yit =Phaser.Math.Between(50,80);
                if (Phaser.Math.Between(0,100)%2==0) {
                    xit *=-1;
                }
                if (Phaser.Math.Between(0,100)%2==0) {
                    yit *=-1;
                }

                if (this.scene.key=="Scene4") 
                {
                if(this.layer5.getTileAtWorldXY(player.x+xit,player.y+yit)==null&& this.layer2.getTileAtWorldXY(player.x+xit,player.y+yit)==null&&player.x+xit>=0&&player.y+yit>=0&&player.x+xit<=3200&&player.y+yit<=3200){
                    switch (Phaser.Math.Between(1,5))
                    {
                    case 1:
                    {
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'milk').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.getByName('indicator_hp').setVisible(true)
                            player.getByName('indicator_hp').play('hpbuff_on')
                            player.getByName('indicator_hp').once("animationcomplete-hpbuff_on",()=>
                            {
                                player.getByName('indicator_hp').play({key:'hpbuff_loop',repeat:2})
                            })
                            player.getByName('indicator_hp').once("animationcomplete-hpbuff_loop",()=>
                            {
                                player.getByName('indicator_hp').play('hpbuff_off')
                            })
                            player.getByName('indicator_hp').once("animationcomplete-hpbuff_off",()=>
                            {
                                player.getByName('indicator_hp').setVisible(false)
                            })
                            player.maxhealth++;
                            if(player.maxhealth<=10)
                            {
                            health_full.getChildren()[player.maxhealth-1].visible=false
                            health_empty.getChildren()[player.maxhealth-1].visible=true
                            health_empty.getChildren()[player.maxhealth-1].setDepth(10000)
                            }
                            this.HEALTH_RESTORATION(health_full,health_empty)
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_milk',repeat:-1})
                        player.itemdropchance=0
                        break;
                    }
                    case 2:
                    {
                        if (player.weapon=='Bow') {
                        break;
                        }else{
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'bow').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.weapon='Bow'
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_bow',repeat:-1})

                        player.itemdropchance=0
                        break;
                        }
                        
                    }
                    case 3:
                    {
                        if (player.weapon=='Axe') 
                        {
                            break;
                            }else{
                            var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'axe').setDepth(player.y).setPushable(false)
                            var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                            var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                            {
                                player.weapon='Axe'

                                przedmiot.destroy()
                                shadowek.destroy()
                                wah.destroy()
                            })
                            shadowek.play({key:"Howering_shadow",repeat:-1})
                            itemek.play({key:'Howering_axe',repeat:-1})
    
                            player.itemdropchance=0
                            break;
                            }
                    }
                    case 4:
                    {
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'pencil').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.getByName('indicator_dmg').setVisible(true)
                            player.getByName('indicator_dmg').play('dmgbuff_on')
                            player.getByName('indicator_dmg').once("animationcomplete-dmgbuff_on",()=>
                            {
                                player.getByName('indicator_dmg').play({key:'dmgbuff_loop',repeat:2})
                            })
                            player.getByName('indicator_dmg').once("animationcomplete-dmgbuff_loop",()=>
                            {
                                player.getByName('indicator_dmg').play('dmgbuff_off')
                            })
                            player.getByName('indicator_dmg').once("animationcomplete-dmgbuff_off",()=>
                            {
                                player.getByName('indicator_dmg').setVisible(false)
                            })
                            player.damage+=1;
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_pencil',repeat:-1})
                        player.itemdropchance=0
                        break;
                    }
                    case 5:
                    {
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'boots').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.getByName('indicator_speed_up').setVisible(true)
                            player.getByName('indicator_speed_up').play('speedbuff_on')
                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_on",()=>
                            {
                                player.getByName('indicator_speed_up').play({key:'speedbuff_loop',repeat:2})
                            })
                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_loop",()=>
                            {
                                player.getByName('indicator_speed_up').play('speedbuff_off')
                            })
                            player.getByName('indicator_speed_up').once("animationcomplete-speedbuff_off",()=>
                            {
                                player.getByName('indicator_speed_up').setVisible(false)
                            })
                            player.normal_velocity*=1.20
                            player.diagonal_velocity*=1.20
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_boots',repeat:-1})
                        player.itemdropchance=0
                        break;
                    }
                    case 6:
                        {
                            
                            var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'wand').setDepth(player.y).setPushable(false)
                            var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                            var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                            {

                                wah.destroy()
                            })
                            shadowek.play({key:"Howering_shadow",repeat:-1})
                            itemek.play({key:'Howering_wand',repeat:-1})
                            player.itemdropchance=0
                            break;
                            
                        }
                }
                }
            
            
                }
                else if (this.scene.key=="Scene9")
                {
                if(this.layer5.getTileAtWorldXY(player.x+xit,player.y+yit)==null&&player.x+xit>=0&&player.y+yit>=0&&player.x+xit<=3200&&player.y+yit<=3200){
                    switch (Phaser.Math.Between(1,5))
                    {
                    case 1:
                    {
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'milk').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.maxhealth++;
                            if(player.maxhealth<=10){
                            health_full.getChildren()[player.maxhealth-1].visible=false
                            health_empty.getChildren()[player.maxhealth-1].visible=true
                            health_empty.getChildren()[player.maxhealth-1].setDepth(10000)
                            }
                            this.HEALTH_RESTORATION(health_full,health_empty)
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_milk',repeat:-1})
                        player.itemdropchance=0
                        break;
                    }
                    case 2:
                    {
                        if (player.weapon=='Bow') {
                        break;
                        }else{
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'bow').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.weapon='Bow'
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_bow',repeat:-1})

                        player.itemdropchance=0
                        break;
                        }
                        
                    }
                    case 3:
                    {
                        if (player.weapon=='Axe') 
                        {
                            break;
                            }else{
                            var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'axe').setDepth(player.y).setPushable(false)
                            var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                            var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                            {
                                player.weapon='Axe'

                                przedmiot.destroy()
                                shadowek.destroy()
                                wah.destroy()
                            })
                            shadowek.play({key:"Howering_shadow",repeat:-1})
                            itemek.play({key:'Howering_axe',repeat:-1})
    
                            player.itemdropchance=0
                            break;
                            }
                    }
                    case 4:
                    {
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'pencil').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.damage+=1;
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_pencil',repeat:-1})
                        player.itemdropchance=0
                        break;
                    }
                    case 5:
                    {
                        var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'boots').setDepth(player.y).setPushable(false)
                        var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                        var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                        {
                            player.normal_velocity*=1.20
                            player.diagonal_velocity*=1.20
                            przedmiot.destroy()
                            shadowek.destroy()
                            wah.destroy()
                        })
                        shadowek.play({key:"Howering_shadow",repeat:-1})
                        itemek.play({key:'Howering_boots',repeat:-1})
                        player.itemdropchance=0
                        break;
                    }
                    case 6:
                        {
                            
                            var itemek=this.physics.add.sprite(player.x+xit,player.y+yit,'wand').setDepth(player.y).setPushable(false)
                            var shadowek=this.add.sprite(player.x+xit,player.y+yit+16,'shadow_item').setDepth(player.y-16)
                            var wah=this.physics.add.collider(player,itemek,(gracz,przedmiot)=>
                            {

                                wah.destroy()
                            })
                            shadowek.play({key:"Howering_shadow",repeat:-1})
                            itemek.play({key:'Howering_wand',repeat:-1})
                            player.itemdropchance=0
                            break;
                            
                        }
                }
                }
            
            
            }
        }
        }
    }
    PLANT_REFRESHER(MOB)
    {
        switch (Phaser.Math.Between(1,5))
        {
                case 1:
                {
                    this.time.addEvent({delay:10000,callback:()=>{
                        MOB.plant=0
                    }})
                    break;
                }
                case 2:
                {
                    this.time.addEvent({delay:9000,callback:()=>{
                        MOB.plant=0
                    }})
                    break;
                }
                case 3:
                {
                    this.time.addEvent({delay:8000,callback:()=>{
                        MOB.plant=0
                    }})
                    break;
                }
                case 4:
                {
                    this.time.addEvent({delay:11000,callback:()=>{
                        MOB.plant=0
                    }})
                    break;
                }
                case 5:
                {
                    this.time.addEvent({delay:12000,callback:()=>{
                        MOB.plant=0
                    }})
                    break;
                }
        }
        
    }
}


