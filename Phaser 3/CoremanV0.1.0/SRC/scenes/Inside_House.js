/** @type {import("../phaser/phaser")} */
import { FatherScene } from "./FatherScene.js";
var played=0;
var player;
var bed=0;
var w=0;
var wardrobe=0;
var bed2=0
var boxbrown1=0;
var boxpink=0;
var lampa=0;
var pulka=0;
var nice=0;
var nice2=0;
var krzprzod=0;
var szafkaL=0
var szafkaP=0
var stul=0;
var keys;
var keys1;
var crap;
var trytime=0;
var culldown=0;
var pause=0;
var ub=0;
var promptinio=0;
var monsterspot=""
var restore=0
var play=1
var cuts=0;
var pom=1
var pocz;
var skip;
var napisy;
var tekst1
var teksttab=
["EARTH, ONCE MIGHTY PLANET WHICH INHABITED ALMOST 8 BILLIONS OF HUMANS. ",
"EVERYONE EXPECTED THAT ONE DAY EARTH WOULD DIE. ",
"THAT DAY HAS FINALLY COME AND PLANET BLOW OFF FROM INSIDE. ",
"HOWEVER DESPITE EVERYONE'S THEORY ABOUT HUMANS ALSO CEASING FROM EXISTENCE. ",
"HUMANS MANAGE TO SURVIVE CATACLYSM. NOT IN THE WAY MANY OF PROPHETS EXPECTED THO. ",
"THE CORE, ONE OF INTACT PART OF THE PLANET AFTER EXPLOSION. ",
"HAS MANAGED IN UNIMAGINABLE WAY TO PROVIDE HUMANS WITH OXYGEN. ",
"IN FACT IT ALSO PROVIDED GRAVITY WHICH ALLOWS HUMAN TO ",
"STAY ON SHATTERED PIECES OF EARTH MIGHTY'S CONTINENTS. ",
"THE NEW WORLD HAS GROWN WILD WITH NEW MONSTERS APPEARING ON THE SURFACE. ",
"THEIR HOSTILE ATTITUDE WILL FOR SURE END HUMAN RACE. THAT'S WHY I CHOOSED YOU. ",
"PLAYER TAKE CONTROL OF THIS SELFISH HUMAN BEING AND", 
" BRING PEACE TO THIS SHATTERED ISLE. ",
"GO KILL ALL MONSTERS AND MAYBE WE WILL MEET AT THE CORE. "]
export class Scene3 extends FatherScene
{
    constructor ()
    {
        super ("Scene3")
    }
    init(data)
    {
        if (data.origin=="Scene6")
        {
            super.KASZTELAN()
            super.BETTERMIND()
            super.CRAP_SETTER()
            ub=1
            crap=super.CRAP_TURNER()
            played=1;
            pause=1
            promptinio=1
            monsterspot=data.monsterspot
            this.spawnPoint =
            {
                x:680,
                y:250
            };
            player=super.create()
            player.atack_cooldown=1
            player.hook_cooldown=1
        }
        if (data.origin=='Scene2' && data.playerY==undefined && data.playerX==undefined && data.Fromsaved==undefined)
        {
            pom=1
            played=0;
            crap=0
            trytime=0
            pause=0
            culldown=0
            ub=0
            promptinio=0
            restore=0
            this.fire=0
            super.ROZEBRANY();
            super.WARDROBE()
            super.KASZTELAN ()
            super.WORSEN()
            this.spawnPoint =
            {
                x:680,
                y:250
            };
        }
        if (data.Fromsaved==1)
        {
            super.CRAP_SETTER()
            crap=super.CRAP_TURNER()
            super.BETTERMIND()
            super.BETTERSTART()
           
            if (data.monsterspot=="undefined")
            {
                super.KASZTELAN()
            }
            else
            {
                super.PODLASKI()
                monsterspot=data.monsterspot    
            }
            if (data.playermaxhealth=="undefined" || data.playermaxhealth==undefined)
            {
                ub=0
                pause=1
                played=1;
                promptinio=0
                super.WARDROBE()
                super.ROZEBRANY();
            }
            else
            {
                played=1; 
                ub=1
                pause=1
                super.UBRANY()
                promptinio=1
            }
            this.spawnPoint=
            {
                x:Math.round(data.playerX),
                y:Math.round(data.playerY)
            }
            player=super.create()
            if (ub==1)
            {
                player.dropchance=parseInt(data.playerdropchance,10)
                player.health=parseInt(data.playerhealth, 10)
                player.maxhealth=parseInt(data.playermaxhealth, 10)
                player.weapon=data.playerweapon
                player.damage=parseInt(data.playerdamage, 10)
                player.normal_velocity=parseInt(data.playernormalvelocity, 10);
                player.diagonal_velocity=parseInt(data.playerdiagonalvelocity, 10);
                player.itemdropchance=parseInt(data.playeritemdropchance, 10);
                player.points=parseInt(data.playerpoints, 10)
                player.hook_cooldown=1
                player.atack_cooldown=1
            }
        }
        if (data.origin=='Scene4')
        {
            crap=1
            pause=1
            played=1
            ub=1
            promptinio=data.prompt
            monsterspot=data.monsterspot
            super.BETTERMIND()
            this.spawnPoint=
            {
                x:465,
                y:740,
            }
            player=super.create()
            player.health=data.playerhealth
            player.maxhealth=data.playermaxhealth
            player.dropchance=data.playerdropchance
            player.itemdropchance=data.playeritemdropchance
            player.damage=data.playerdamage
            player.weapon=data.playerweapon
            player.normal_velocity=data.playernormalvelocity
            player.diagonal_velocity=data.playerdiagonalvelocity
            player.atack_cooldown=1
            player.hook_cooldown=1
            player.points=data.playerpoints
        }
        this.mus=data.mus
        this.sfx=data.sfx
        this.dial=data.dial
    }
    create ()
    {
        var myself = this;
        this.events.on('resume', function (scene, data) {
            if(data!=undefined && data!=null){
                if(data.origin=='Scene2'){
                myself.sfx=data.sfx
                myself.mus=data.mus
                myself.dial=data.dial
                }
            }
        }) 
        const map=this.make.tilemap({key:'Tutorial_Ground'});
        const tileset=map.addTilesetImage('TUTORIAL','tilesettutorial');
        const tileset2=map.addTilesetImage('europa02','stuff')
        const layer=map.createLayer('Terrain',tileset,-320,-290);
        const layer2=map.createLayer('Meble',tileset2,-320,-290);
        layer.setCollisionByProperty({ collide: true }).setDepth(5);
        layer2.setCollisionByProperty({collide:true}).setDepth(5);
        this.cameras.main.setBounds(0, 0, 960, 770);
        const fireplace=this.add.sprite(465,170,'fireplace','0').setDepth(5)
        const dywan=this.add.sprite(464,750,'dywan','0').setRotation(Phaser.Math.DegToRad(90)).setDepth(5)
        bed2=this.physics.add.image(658,222,'bed2').setDepth(5).setImmovable()
        boxbrown1=this.physics.add.image(722,205,'boxbrown').setDepth(5).setImmovable()
        boxpink=this.physics.add.image(626,205,'boxpink').setDepth(5).setImmovable()
        stul=this.physics.add.image(242,633,'tablehor').setDepth(633).setImmovable()
        krzprzod=this.physics.add.image(242,601,'krzesloprzod').setDepth(601).setImmovable()
        lampa=this.physics.add.group();
        lampa.get(594,170,'lampa');
        lampa.get(338,170,'lampa');
        lampa.get(565,495,'lampa');
        pulka=this.physics.add.group();
        pulka.get(704,397,'szafkaD');
        pulka.get(609,397,'szafkaD');
        pulka.get(322,397,'szafkaD');
        pulka.get(226,397,'szafkaD');
        nice=this.physics.add.group();
        nice2=this.physics.add.group();
        nice2.get(545,397,'waza');
        nice2.get(386,397,'waza');
        nice.get(242,665,'krzeslotyl');
        nice2.get(563,717,'beczka');
        nice2.get(718,717,'beczka');
        nice.get(350,518,'boxbrown');
        nice.get(316,518,'boxbrown');
        nice.get(282,518,'boxbrown');
        nice.get(248,518,'boxbrown');
        nice2.get(350,717,'beczka');
        nice2.get(316,717,'beczka');
        nice2.get(282,717,'beczka');
        nice2.get(248,717,'beczka');

        szafkaL=this.physics.add.group();
        szafkaL.get(720,630,'szafkaL');
        szafkaL.get(720,315,'szafkaL');
        szafkaP=this.physics.add.group();
        szafkaP.get(209,315,'szafkaP');
        for (var g=0;g<lampa.getChildren().length;g++)
            {
                lampa.getChildren()[g].setImmovable()
                lampa.getChildren()[g].setDepth(lampa.getChildren()[g].y)
                lampa.getChildren()[g].setBodySize(32,30)
                lampa.getChildren()[g].setOffset(0,14)
            }
        for (var g=0;g<pulka.getChildren().length;g++)
            {
                pulka.getChildren()[g].setImmovable()
                pulka.getChildren()[g].setDepth(pulka.getChildren()[g].y)
                pulka.getChildren()[g].setBodySize(64,16)
                pulka.getChildren()[g].setOffset(0,14)
            }
        for (var g=0;g<nice.getChildren().length;g++)
            {
                nice.getChildren()[g].setImmovable()
                nice.getChildren()[g].setDepth(nice.getChildren()[g].y)
                nice.getChildren()[g].setBodySize(32,20)
                nice.getChildren()[g].setOffset(0,0)
            }
        for (var g=0;g<nice2.getChildren().length;g++)
            {
                nice2.getChildren()[g].setImmovable()
                nice2.getChildren()[g].setDepth(nice2.getChildren()[g].y)
                nice2.getChildren()[g].setBodySize(32,17)
                nice2.getChildren()[g].setOffset(0,15)
            }
        for (var g=0;g<szafkaL.getChildren().length;g++)
            {
                szafkaL.getChildren()[g].setImmovable()
                szafkaL.getChildren()[g].setDepth(szafkaL.getChildren()[g].y)
                szafkaL.getChildren()[g].setBodySize(28,32)
                szafkaL.getChildren()[g].setOffset(5,15)
            }
        for (var g=0;g<szafkaP.getChildren().length;g++)
            {
                szafkaP.getChildren()[g].setImmovable()
                szafkaP.getChildren()[g].setDepth(szafkaP.getChildren()[g].y)
                szafkaP.getChildren()[g].setBodySize(28,32)
                szafkaP.getChildren()[g].setOffset(0,15)
            }
        dywan.play({key:"dywanLoop",repeat:-1})
        if(crap==0)
        {   
            tekst1=this.add.bitmapText(30,10,'atari-classic',teksttab[0],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(300000)  ;
            var nap=1 
            napisy=this.time.addEvent({ delay: 6000, callback: ()=>
                {
                if(tekst1!=undefined){
                tekst1.destroy();}
                tekst1=this.add.bitmapText(30,10,'atari-classic',teksttab[nap],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(300000)  ;
                nap++; 
                }, callbackScope: this ,
               repeat: 13,
             });
            this.wst=this.sound.add('narrator',{volume: this.dial});
            this.wst.play();
            keys1=this.input.keyboard.addKeys("ESC")  
            cuts=this.add.sprite(480,310,'cutscene1','').setDepth(1000);
            cuts.play({key:"Loop_begin", repeat:3})
            skip=this.add.image(770,500,'skip').setScale(2).setDepth(200000);
            cuts.on("animationcomplete-Loop_begin",()=>
                {
                    cuts.destroy()
                    cuts=this.add.sprite(480,310,'cutscene2','').setDepth(1000);
                    cuts.play({key:"destruction", repeat:0})
                    cuts.on("animationcomplete-destruction",()=>
                    {
                        cuts.destroy()
                        cuts=this.add.sprite(480,310,'cutscene3','').setDepth(1000);
                        cuts.play({key:"Loop_end", repeat:40})
                        cuts.on("animationcomplete-Loop_end",()=>
                        {
                            cuts.destroy()
                            cuts=this.add.sprite(480,310,'cutscene5','').setDepth(1000);
                            cuts.play({key:"Loop", repeat:0})
                            cuts.on("animationcomplete-Loop",()=>
                            {
                                cuts.destroy()
                                cuts=this.add.sprite(480,310,'cutscene3','').setDepth(1000);
                                cuts.play({key:"Loop_end", repeat:4})
                                cuts.on("animationcomplete-Loop_end",()=>
                                {
                                    cuts.destroy()
                                    cuts=this.add.sprite(480,310,'cutscene4','').setDepth(1000);
                                    cuts.play({key:"Zoom", repeat:0})
                                    cuts.on("animationcomplete-Zoom",()=>
                                    {
                                        this.cameras.main.fadeOut(15000)
                                    })
                                })
                            })
                        })
                    })
                    
                    
                })
           
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------BEFORE CHARACTER SPAWN-------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
            pocz=this.time.delayedCall(88000, ()=>
            {
                pom=0
                tekst1.destroy()
                cuts.destroy()
                skip.destroy()
                this.cameras.main.fadeIn(2000)
                keys=this.input.keyboard.addKeys("W")
                this.cameras.main.setZoom(2.2)
                this.cameras.main.centerOn(550,240)
                bed=this.add.sprite(690,222,'bed','').setDepth(9);
                bed.active=true
                bed.play({key:"animation", repeat:-1})
                w=this.add.sprite(690,170,'w','').setDepth(9);
                w.active=true
                w.alpha=0
            })
        }
        if(crap==1)
        {
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
-------------------------------------------------------------------------AFTER W THREE TIME OR MORE PRESSED-----------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
        fireplace.play({key:"lit_noFire"});
        fireplace.once("animationcomplete-lit_noFire",()=>
        {
            fireplace.play({key:"lit_fire_loop",repeat:-1})
            this.fire=this.sound.add('fire', { volume: this.sfx, loop: true });
            this.fire.play()
        })
        this.cameras.main.zoomTo(1)
        bed=this.physics.add.sprite(690,222,'bed','').setDepth(9).setImmovable();
        bed.body.setSize(32,18,false)
        bed2.body.setSize(32,18,false)
        boxbrown1.body.setSize(32,2,false)
        boxpink.body.setSize(32,2,false)
        stul.body.setSize(96,40)
        stul.setOffset(0,10)
        krzprzod.body.setSize(32,32,false)
        wardrobe=this.physics.add.sprite(640,527,'wardrobe','').setDepth(9).setImmovable()
        wardrobe.body.setSize(65,90,50,50)
        bed.play({key:"Unmade",repeat:-1})
        player.body.collideWorldBounds=true;
        player.body.onWorldBounds=true;
        this.cameras.main.startFollow(player,true);
        var bedcol=this.physics.add.collider(player, bed);
        var bed2col=this.physics.add.collider(player, bed2);
        var boxbrcol=this.physics.add.collider(player, boxbrown1);
        var boxpicol=this.physics.add.collider(player, boxpink,()=>
        {
            if (player.points==10)
            {
                var kebab=this.add.sprite(boxpink.x,boxpink.y-32,'pencil')
                this.physics.add.collider(player,kebab,()=>
                {
                    kebab.destroy()
                    player.damage++
                })
            }
        })
        var lampcol=this.physics.add.collider(player, lampa);
        var pulcol=this.physics.add.collider(player, pulka);
        var stulcol=this.physics.add.collider(player, stul);
        var nicecol=this.physics.add.collider(player, nice);
        var nicecol2=this.physics.add.collider(player, nice2);
        var krzprzodcol=this.physics.add.collider(player, krzprzod);
        var szafkaLcol=this.physics.add.collider(player, szafkaL);
        var szafkaPcol=this.physics.add.collider(player, szafkaP);
        var beta=this.physics.add.collider(player, layer);
        var alfa=this.physics.add.collider(player,wardrobe,()=>
        {
            if(ub==0&&wardrobe.body.touching.down==true&&(player.x>635&&player.x<645))
            {
                player.getByName('Player').play({key:'nidle2'})
                player.body.setMaxVelocity(0,0);
                super.WARDROBE()
                wardrobe.play({key:"Open"})
            }else if(ub==0&&wardrobe.body.touching.down==true)
            {
                super.WARDROBE()
                if (player.x<635) {
                    player.body.setVelocity(32,0);
                    player.getByName('Player').play({key:'nprawo',repeat:-1})
                }
                if (player.x>645) {
                    player.body.setVelocity(-32,0);
                    player.getByName('Player').play({key:'nlewo',repeat:-1})  
                }
                var ubr=myself.time.addEvent({ delay:5, callback: ()=>{
                    if (player.x>639&&player.x<641) {
                        this.time.removeEvent(ubr);
                        player.getByName('Player').play({key:'nidle2'})
                        player.body.setMaxVelocity(0,0);
                        wardrobe.play({key:"Open"})
                    }
                }, callbackScope: this ,
                loop: true,
                }); 


            }
        });
        wardrobe.on('animationcomplete-Open', ()=>
        {
            this.physics.world.removeCollider(alfa);
            this.physics.world.removeCollider(beta);
            this.physics.world.removeCollider(bedcol);
            this.physics.world.removeCollider(bed2col);
            this.physics.world.removeCollider(boxbrcol);
            this.physics.world.removeCollider(boxpicol);
            this.physics.world.removeCollider(lampcol);
            this.physics.world.removeCollider(pulcol);
            this.physics.world.removeCollider(stulcol);
            this.physics.world.removeCollider(nicecol);
            this.physics.world.removeCollider(nicecol2);
            this.physics.world.removeCollider(krzprzodcol);
            this.physics.world.removeCollider(szafkaLcol);
            this.physics.world.removeCollider(szafkaPcol);
            this.time.addEvent({delay:250,callback:()=>
            {
                player.body.setMaxVelocity(1000,1000)
                player.body.setVelocity(0,-25)
                player.getByName('Player').play({key:'ngora',repeat:2})
                player.getByName('Player').on('animationcomplete-ngora',()=>
                {
                    player.getByName('Player').play({key:'nidle1'})
                })
                player.getByName('Player').on('animationcomplete-nidle1',()=>
                {
                    player.destroy()
                    wardrobe.play({key:"dress_up_anim",repeat:4})
                    this.cameras.main.fadeOut(2000)
                })    
            }}) 
        })
        wardrobe.on('animationcomplete-dress_up_anim',()=>
        {
            this.cameras.main.fadeIn(2000)
            ub=1
            super.UBRANY();
            wardrobe.play({key:"Close_animationn"})
            player=super.WARDROBEDone()
            player.body.collideWorldBounds=true;
            player.body.onWorldBounds=true;
            this.cameras.main.startFollow(player, 0.1, 0.1); 
            this.physics.add.collider(player, layer);
            this.physics.add.collider(player,wardrobe);
            this.physics.add.collider(player, bed);
            this.physics.add.collider(player, bed2);
            this.physics.add.collider(player, boxbrown1);
            this.physics.add.collider(player, boxpink);
            this.physics.add.collider(player, lampa);
            this.physics.add.collider(player, pulka);
            this.physics.add.collider(player, stul);
            this.physics.add.collider(player, nice);
            this.physics.add.collider(player, nice2);
            this.physics.add.collider(player, krzprzod);
            this.physics.add.collider(player, szafkaL);
            this.physics.add.collider(player, szafkaP);
            player.body.setMaxVelocity(1000,1000);
        })
        this.physics.world.setBounds(0,0,960,770)
        this.physics.world.on('worldbounds', ()=>
        {
        if (play==1) {
            play=0
            if (ub==1 && promptinio==0)
            {
                play=1
                this.fire.stop()
                this.scene.start("Scene4",{origin:"Scene3",prompt:0,monsterspot:monsterspot,playerpoints:player.points,playeritemdropchance:player.itemdropchance,playerdropchance:player.dropchance,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,playerdamage:player.damage,playerweapon:player.weapon,playerhealth:player.health,playermaxhealth:player.maxhealth,mus:this.mus,sfx:this.sfx,dial:this.dial})
            }
            else if (ub==0 && promptinio==0)
            {
                const ub_v=this.add.image(500, 500,'ub').setDepth(200000);
                this.sound.play('prot',{volume: this.dial});
                ub_v.setScrollFactor(0);
                this.time.addEvent({delay:2000,callback:()=>
                {
                    play=1
                    ub_v.destroy();
                }})
            }
            else if (ub==1 && promptinio==1)
            {
                play=1
                this.fire.stop()
                this.scene.start("Scene4",{origin:"Scene3",prompt:1,monsterspot:monsterspot,playerpoints:player.points,playeritemdropchance:player.itemdropchance,playerdropchance:player.dropchance,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,playerdamage:player.damage,playerweapon:player.weapon,playerhealth:player.health,playermaxhealth:player.maxhealth,mus:this.mus,sfx:this.sfx,dial:this.dial})
            }
        }
        })
        }
       if(played==0 && crap==1)
        {      
        this.time.addEvent({ delay: 1000, callback: ()=>
            {
            played=1;
            this.scene.pause('Scene3')
            this.scene.launch('Prompt1',{origin:this.scene.key,dial:this.dial,firesound:this.fire})
          }, callbackScope: this });
        }
        
        this.uff=this.time.addEvent({delay:88000,callback:()=>
        {
            if(pause!=1)
            {
            w.alpha=0.1
            w.play({key:"press",repeat:-1})
            this.rage()
            }
        }})
          
    }
    update ()
    {
        if (this.fire!=undefined&&this.fire!=0) {
            this.fire.volume=this.sfx
        }
        if (this.fire!=undefined &&  this.fire!=null&&this.fire!=0)
        {
            if (this.fire.isPlaying!=1)
            {
                this.fire.play()
            }
        }
            
           super.update()
           if (played==1 && restore==0)
           {
               restore=1
               super.BETTERSTART()
           }
           if (keys!=undefined && keys!=null)
           {
            if(keys.W.isDown && culldown==0 && pause==0 &&  cuts.active==false)
           {
            trytime++
            culldown=1
             this.time.addEvent({delay:200,callback:()=>
                {
                    culldown=0
                }})
           }
           }
           if(trytime==3 && pause==0)
           {
                player=super.create()
                pause=1
                w.active=false
                w.setDepth(0)
                bed.active=false
                crap=1
                this.create()
           }
           if (keys1!=undefined) {
            if (keys1.ESC.isDown && pom==1) 
            {
                this.time.removeEvent(napisy);
                tekst1.destroy()
                this.wst.stop()
                pom=0
                this.time.removeEvent(pocz);
                cuts.destroy()
                if(skip!=undefined)
                {
                skip.destroy()
                }
                this.cameras.main.fadeIn(2000)
                keys=this.input.keyboard.addKeys("W")
                this.cameras.main.setZoom(2.2)
                this.cameras.main.centerOn(550,240)
                bed=this.add.sprite(690,222,'bed','').setDepth(9);
                bed.active=true
                bed.play({key:"animation", repeat:-1})
                w=this.add.sprite(690,170,'w','').setDepth(9);
                w.active=true
                w.alpha=0
                this.time.removeEvent(this.uff)
                w.alpha=0.1
                w.play({key:"press",repeat:-1})
                this.rage()
            }
           }
           
    }
    rage ()
    {
        if(w.alpha<1)
        {
            w.alpha+=0.1
            this.time.addEvent({delay:1000,callback:()=>{this.rage()}})
        }
    }
}
