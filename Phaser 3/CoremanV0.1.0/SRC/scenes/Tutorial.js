var back
var slajd
var tort1
var dial
var heart_full
var heart_empty
var changer
var event
var n
export class Scene12 extends Phaser.Scene
{
    constructor ()
    {
        super 
        ({
            key:"Scene12"
        })
    }
    init (data)
    {
        back=data.origin
        dial=data.dial
    }
    create ()
    {
        this.pointer=this.input.activePointer;
        heart_full=this.add.group()
        heart_empty=this.add.group()
        const map=this.make.tilemap({key:'Tutorial_Map'});
        const tileset=map.addTilesetImage('Europa','tileseteuropa');
        const layer=map.createLayer('Ground',tileset,-1000,-1000).setDepth(5);
        for (var ij=0;ij<2;ij++)
        {
            for (var ik=0;ik<5;ik++)
            {
                heart_full.get(20+ik*30,20+ij*20,'heart').setDepth(10000).setScale(2).setScrollFactor(0)
                heart_empty.get(20+ik*30,20+ij*20,'empty_heart').setScale(2).setScrollFactor(0)
            }
            
        }
        for (var ij=3;ij<heart_full.getChildren().length;ij++)
            {
                heart_full.getChildren()[ij].visible=false
                heart_empty.getChildren()[ij].visible=false
            }
            for (var ij=3;ij<3;ij++)
            {
                heart_full.getChildren()[ij].visible=false
                heart_empty.getChildren()[ij].setDepth(10000)
            }
        slajd=0
        var player=this.physics.add.sprite(635,400,'coreman', '').setDepth(10);
        player.anims.play({key:'up',repeat:-1},false);
        player.setVelocityY(-120)
        var w=this.add.sprite(300,100,'w','').setScrollFactor(0).setDepth(10)
        var s=this.add.sprite(300,100,'s','').setScrollFactor(0).setVisible(false).setDepth(10)
        var a=this.add.sprite(300,100,'d','').setScrollFactor(0).setVisible(false).setDepth(10)
        var d=this.add.sprite(300,100,'a','').setScrollFactor(0).setVisible(false).setDepth(10)
        var lmb=this.add.sprite(300,100,'leftbutton').setScrollFactor(0).setVisible(false).setDepth(10)
        var rmb=this.add.sprite(300,100,'rightbutton').setScrollFactor(0).setVisible(false).setDepth(10)
        var ESC=this.add.sprite(300,100,'esc').setScrollFactor(0).setVisible(false).setDepth(10)
        var TAB=this.add.sprite(300,100,'tab').setScrollFactor(0).setVisible(false).setDepth(10)
        var atak=this.add.sprite(player.x,player.y,'atak').setVisible(false).setDepth(10)
        var background_submenu=this.add.image(300,150,'backgrounds').setScale(0.5).setScrollFactor(0).setVisible(false).setDepth(10);
        var pause_submenu=this.add.image(300,30,'Pause').setScale(0.5).setScrollFactor(0).setVisible(false).setDepth(10);
        var resume_submenu=this.add.image(300,80,'Resume').setScale(0.5).setScrollFactor(0).setVisible(false).setName('Resume').setDepth(10);
        var load_submenu=this.add.image(265,140,'Load').setScale(0.5).setScrollFactor(0).setVisible(false).setName('Load').setDepth(10);
        var save_submenu=this.add.image(335,140,'Save').setScale(0.5).setScrollFactor(0).setVisible(false).setName('Save').setDepth(10);
        var options_submenu=this.add.image(300,200,'Options').setScale(0.5).setScrollFactor(0).setVisible(false).setName('Options').setDepth(10);
        var exit_submenu=this.add.image(300,255,'Exit').setScale(0.5).setScrollFactor(0).setVisible(false).setName('Exit').setDepth(10);
        var txt=this.add.bitmapText(300,420,'atari-classic','To move your character \n press w,s,a,d on your keyboard').setScrollFactor(0).setDepth(10)
        var lanuch=this.add.sprite(player.x,player.y,'lancuch').setVisible(false).setDepth(10)
        var lanuch2=this.add.sprite(player.x,player.y,'lancuch').setVisible(false).setDepth(10)
        var lanuch3=this.add.sprite(player.x,player.y,'lancuch').setVisible(false).setDepth(10)
        var lanuchg=this.add.sprite(player.x,player.y,'lancuch','4').setVisible(false).setDepth(10)
        tort1 = this.sound.add('tort1',{volume: dial});
        tort1.play();
        n=1
        var text=this.add.bitmapText(260,5,'atari-classic','Press mouse button to continue...').setScrollFactor(0).setDepth(10)
        text.alpha=0.75
        w.anims.play({key:"press",repeat:3},false)
        w.on('animationcomplete-press',()=>
        {
            w.setVisible(false)
            s.setVisible(true)
            player.setVelocityX(0)
            player.setVelocityY(120)
            player.anims.play({key:'down',repeat:-1},false)
            s.anims.play({key:"presss",repeat:3},false)
        })
        s.on('animationcomplete-presss',()=>
        {
            s.setVisible(false)
            a.setVisible(true)
            player.setVelocityY(0)
            player.setVelocityX(-120)
            player.anims.play({key:"left",repeat:-1},false)
            a.anims.play({key:"pressa",repeat:3},false)
        })
        a.on('animationcomplete-pressa',()=>
        {
            a.setVisible(false)
            d.setVisible(true)
            player.setVelocityY(0)
            player.setVelocityX(120)
            player.anims.play({key:"right",repeat:-1},false)
            d.anims.play({key:"pressd",repeat:3},false)
        })
        d.on('animationcomplete-pressd',()=>
        {
            d.setVisible(false)
            w.setVisible(true)
            player.setVelocityX(0)
            player.setVelocityY(-120)
            player.anims.play({key:"up",repeat:-1},false)
            w.anims.play({key:"press",repeat:3},false)
        })
        var c1=this.cameras.add(185,100,600,300)
        c1.startFollow(player,true)
        c1.ignore(text)
        this.cameras.main.startFollow(player,true)
        this.cameras.main.ignore(layer)
        this.cameras.main.ignore(heart_full)
        this.cameras.main.ignore(heart_empty)
        this.cameras.main.ignore(w)
        this.cameras.main.ignore(a)
        this.cameras.main.ignore(s)
        this.cameras.main.ignore(d)
        this.cameras.main.ignore(lmb)
        this.cameras.main.ignore(player)
        this.cameras.main.ignore(rmb)
        this.cameras.main.ignore(ESC)
        this.cameras.main.ignore(TAB)
        this.cameras.main.ignore(resume_submenu)
        this.cameras.main.ignore(exit_submenu)
        this.cameras.main.ignore(background_submenu)
        this.cameras.main.ignore(options_submenu)
        this.cameras.main.ignore(load_submenu)
        this.cameras.main.ignore(save_submenu)
        this.cameras.main.ignore(pause_submenu)
        this.input.on("pointerdown",()=>
        {
            tort1.stop();
            slajd++
            if (slajd==1)
            {
               
               w.removeAllListeners()
               s.removeAllListeners()
               a.removeAllListeners()
               d.removeAllListeners()
               w.setVisible(false)
               d.setVisible(false)
               s.setVisible(false)
               a.setVisible(false)
               w.setVisible(true)
               a.setVisible(true)
               txt.destroy()
               player.anims.stop()
               player.setPosition(635,400)
               player.setVelocity(-84,-84)
               player.anims.play({key:'left-up',repeat:-1},false)
               w.setPosition(285,100)
               a.setPosition(315,100)
               txt=this.add.bitmapText(300,420,'atari-classic','To move diagonally press \n 2 keys in corresponding direction').setScrollFactor(0).setDepth(10)
               tort1 = this.sound.add('tort2',{volume: dial});
               tort1.play();
               w.anims.play({key:'press',repeat:3},false)
               a.anims.play({key:'pressa',repeat:3},false)
               changer=0
               a.on('animationcomplete-pressa',()=>
               {
                if(changer==0)
                {
                    
                    a.setVisible(false)
                    w.setVisible(false)
                    s.setVisible(true)
                    d.setVisible(true)
                    s.setPosition(285,100)
                    d.setPosition(315,100)
                    player.anims.play({key:'right-down',repeat:-1},false)
                    player.setVelocity(84,84)
                    s.anims.play({key:'presss',repeat:3},false)
                    d.anims.play({key:'pressd',repeat:3},false)  
                }
               })
              d.on('animationcomplete-pressd',()=>
               {
                   if(changer==0)
                   {
                        
                        s.setVisible(false)
                        w.setVisible(true)
                        w.setPosition(285,100)
                        player.anims.play({key:'right-up',repeat:-1},false)
                        player.setVelocity(84,-84)
                        w.anims.play({key:'press',repeat:3},false)
                        d.anims.play({key:'pressd',repeat:3},false)
                        changer=1
                    }
               })
              w.on('animationcomplete-press', ()=>
              {
              if (changer==1)
                {
                    a.setVisible(true)
                    s.setVisible(true)
                    w.setVisible(false)
                    d.setVisible(false)
                    a.setPosition(315,100)
                    s.setPosition(285,100)
                    player.anims.play({key:'left-down',repeat:-1},false)
                    player.setVelocity(-84,84)
                    a.play({key:'pressa',repeat:3},false)
                    s.play({key:'presss',repeat:3},false)
                    changer=2
                }
              })
              s.on('animationcomplete-presss',()=>
              {
                    if (changer==2)
                    {
                        s.setVisible(false)
                        w.setVisible(true)
                        w.setPosition(285,100)
                        player.anims.play({key:"left-up",repeat:-1})
                        player.setVelocity(-84,-84)
                        a.play({key:'pressa',repeat:3},false)
                        w.play({key:'press',repeat:3},false)
                        changer=0
                    }
              })
            }
            if (slajd==2)
            {
                txt.destroy()
                w.removeAllListeners()
                s.removeAllListeners()
                a.removeAllListeners()
                d.removeAllListeners()
                changer=0
                w.setVisible(false)
                a.setVisible(false)
                d.setVisible(false)
                s.setVisible(false)
                player.play('idle_1')
                player.anims.stop()
                player.setVelocity(0,0)
                player.setPosition(635,400)
                lmb.setVisible(true)
                lmb.play({key:'presslb'})
                lmb.on('animationcomplete-presslb',()=>
                {
                    if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>-(112.5) )
                    {
                       atak.setVisible(true)
                       player.play('idle_1')
                       atak.setPosition(player.x,player.y+60)
                       atak.rotation=Phaser.Math.DegToRad(90)
                       atak.play({key:'attack_up'})
                       changer=1
                    }
                 if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<=112.5 )
                    {
                        atak.setVisible(true)
                        player.play('idle_2')
                        atak.setPosition(player.x,player.y-60)
                        atak.rotation=Phaser.Math.DegToRad(-90)
                        atak.play({key:'attack_up'})
                        changer=1
                    }
                 if ((Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>=157.5) )
                    {
                        atak.setVisible(true)
                        player.play('idle_3')
                        atak.setPosition(player.x+60,player.y)
                        atak.rotation=Phaser.Math.DegToRad(15)
                        atak.play({key:"attack_up"})
                        changer=1
                    }
                 if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>-(157.5) )
                    {
                        atak.setVisible(true)
                        player.play('idle_4')
                        atak.setPosition(player.x+42,player.y+42)
                        atak.rotation=Phaser.Math.DegToRad(45)
                        atak.play({key:"attack_up"})
                        changer=1
                    }
                 if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<157.5 )
                    {
                        atak.setVisible(true)
                        player.play('idle_5')
                        atak.setPosition(player.x+42,player.y-42)
                        atak.rotation=Phaser.Math.DegToRad(-45)
                        atak.play({key:"attack_up"})
                        changer=1
                    }
                 if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>=-(22.5) )
                    {
                        atak.setVisible(true)
                        player.play('idle_6')
                        atak.setPosition(player.x-60,player.y)
                        atak.rotation=Phaser.Math.DegToRad(180)
                        atak.play({key:"attack_up"})
                    }
                 if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>-(67.5) )
                    {
                        atak.setVisible(true)
                        player.play('idle_7')
                        atak.setPosition(player.x-42,player.y+42)
                        atak.rotation=Phaser.Math.DegToRad(135)
                        atak.play({key:"attack_up"})
                        changer=1
                    }
                 if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.pointer.worldX,this.pointer.worldY,player.x,player.y))<=67.5 )
                    {
                        atak.setVisible(true)
                        player.play('idle_8')
                        atak.setPosition(player.x-42,player.y-42)
                        atak.rotation=Phaser.Math.DegToRad(-135)
                        atak.play({key:"attack_up"})
                        changer=1
                    }
                })
                atak.on('animationcomplete-attack_up',()=>
                {
                    if (changer=1)
                    {
                        atak.setVisible(false)
                        lmb.play({key:'presslb'})
                        changer=0
                    }
                })
                txt=this.add.bitmapText(200,420,'atari-classic','To attack press left button  Remember that \n if you move, you attack in direction of your movement').setScrollFactor(0).setDepth(10)
                tort1 = this.sound.add('tort3',{volume: dial});
                tort1.play();
            }
            if (slajd==3)
            {
                atak.removeAllListeners()
                atak.setVisible(false)
                txt.destroy()
                lmb.anims.stop()
                player.play('idle_1')
                lmb.setVisible(false)
                ESC.setVisible(true)
                ESC.play({key:'pressesc'})
                ESC.on('animationcomplete-pressesc',()=>
                {
                    
                    ESC.setVisible(false)
                    background_submenu.setVisible(true)
                    options_submenu.setVisible(true)
                    exit_submenu.setVisible(true)
                    resume_submenu.setVisible(true)
                    load_submenu.setVisible(true)
                    save_submenu.setVisible(true)
                    pause_submenu.setVisible(true)
                    event=this.time.addEvent({delay:1000,callback:()=>
                    {
                    background_submenu.setVisible(false)
                    options_submenu.setVisible(false)
                    exit_submenu.setVisible(false)
                    resume_submenu.setVisible(false)
                    load_submenu.setVisible(false)
                    save_submenu.setVisible(false)
                    pause_submenu.setVisible(false)
                    TAB.setVisible(true)
                    TAB.play({key:'presstab'})
                    }})
                })
                TAB.on('animationcomplete-presstab',()=>
                {
                    TAB.setVisible(false)
                    ESC.setVisible(true)
                    ESC.play({key:'pressesc'})
                })
                txt=this.add.bitmapText(300,420,'atari-classic','Press ESC key to open submenu. \n Press TAB key to open the map').setScrollFactor(0).setDepth(10)
                tort1 = this.sound.add('tort4',{volume: dial});
                tort1.play();
            }
            if (slajd==4)
            {
                changer=0
                txt.destroy()
                ESC.removeAllListeners()
                TAB.removeAllListeners()
                ESC.setVisible(false)
                TAB.setVisible(false)
                this.time.removeEvent(event)
                background_submenu.setVisible(false)
                options_submenu.setVisible(false)
                exit_submenu.setVisible(false)
                resume_submenu.setVisible(false)
                load_submenu.setVisible(false)
                save_submenu.setVisible(false)
                pause_submenu.setVisible(false)
                player.play('idle_3')
                rmb.setVisible(true)
                rmb.play('pressrb')
                n=1
                rmb.on('animationcomplete-pressrb',()=>
                {
                    if (changer==0)
                    {
                        lanuch.setPosition(player.x+n*32,player.y)
                        lanuch.rotation=Phaser.Math.DegToRad(90)
                        lanuch.setVisible(true)
                        lanuch.play('lancuch')
                    }
                    if (changer==1)
                    {
                        player.setVelocity(350,0)
                        lanuch.play('lancuchr')
                    }
                })
                lanuch.on('animationcomplete-lancuch',()=>
                {
                    if(n<2)
                    {   
                        n++
                        lanuch2.setVisible(true)
                        lanuch2.rotation=Phaser.Math.DegToRad(90)
                        lanuch2.setPosition(player.x+n*32,player.y)
                        lanuch2.play('lancuch')
                    }
                })
                lanuch2.on('animationcomplete-lancuch',()=>
                {
                    if (n<3)
                    {
                        n++
                        lanuch3.setVisible(true)
                        lanuch3.rotation=Phaser.Math.DegToRad(90)
                        lanuch3.setPosition(player.x+n*32,player.y)
                        lanuch3.play('lancuch')
                    }
                })
                lanuch3.on('animationcomplete-lancuch',()=>
                {
                   if (n<4)
                    {
                        n++
                        lanuchg.setVisible(true)
                        lanuchg.rotation=Phaser.Math.DegToRad(90)
                        lanuchg.setPosition(player.x+n*32,player.y)
                        lanuchg.play('lancuch_head')
                    }
                })
                lanuchg.on('animationcomplete-lancuch_head',()=>
                {
                    if (changer==0)
                    {
                     rmb.play('pressrb')
                     changer=1  
                    }
                    else if (changer==1)
                    {
                        lanuchg.setVisible(false)
                        player.setVelocity(0,0)
                        player.setPosition(635,400)
                        event=this.time.addEvent({delay:1000,callback:()=>
                        {
                            rmb.play('pressrb')
                            changer=0
                            n=1
                        }})
                    }
                })
                lanuch.on('animationcomplete-lancuchr',()=>
                {
                    lanuch.setVisible(false)
                    lanuch2.play('lancuchr')
                })
                lanuch2.on('animationcomplete-lancuchr',()=>
                {
                    lanuch2.setVisible(false)
                    lanuch3.play('lancuchr')
                })
                lanuch3.on('animationcomplete-lancuchr',()=>
                {
                    lanuch3.setVisible(false)
                    lanuchg.playReverse('lancuch_head')
                })
                txt=this.add.bitmapText(300,420,'atari-classic','Press right button to release your hook. \n Press again to pull yourself to hook').setScrollFactor(0).setDepth(10)
                tort1 = this.sound.add('tort5',{volume: dial});
                tort1.play();
            }
            if (slajd==5)
            {
                this.time.removeEvent(event)
                this.scene.stop("Scene12")
                this.scene.setVisible(true,back)
                this.scene.resume("Scene3")
            }
        }) 
    }
}