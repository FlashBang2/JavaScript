/** @type {import("../phaser/phaser")} */
var mod=0;
var previous=0;
var playerY=0;
var playerX=0;
var saved
var musind= 2;
var mus=0.1
var sfx=0.2
var sfxind= 2;
var dial=0.2
var dialind= 2;
var bateriesm=[]
var bateriess=[]
var bateriesd=[]
export class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super
        ({
            key: 'Scene2',
            
        });
    }
    init(data)
    {
        if (data.origin=="Scene5")
        {
            mod=0
        }
        if (data.mode==3)
        {
            mod=3
            saved=data.origin+";"+data.playerY+";"+data.playerX+";"+data.playerhealth+";"+data.monsterspot+";"+data.playeritemdropchance+";"+data.playerdropchance+";"+data.playerpoints+";"+data.playermaxhealth+";"+data.playerweapon+";"+data.playerdamage+";"+data.playernormalvelocity+";"+data.playerdiagonalvelocity
        }
        playerX=data.playerX
        playerY=data.playerY
        if (data.mode==1)
        {
            mod=1
        }
        if (data.mode==2)
        {
            mod=2
        }
        previous=data.previous
    }
    preload ()
        {
            this.load.aseprite('gears','assets/Menu/gears_load.png','assets/Menu/gears_load.json')
            this.load.image('scrollbarx','assets/ESC/SCROLLBAR.png')
            this.load.image('controls','assets/Menu/CONTROLS.png')
            this.load.image('button','assets/Tutorial/PROMPT_CLOSE.png')
            this.load.image('backgrounds','assets/ESC/buttons_bg.png')
            this.load.image('button_patch','assets/Menu/PatchNotesButton.png')
            this.load.image('patches','assets/Menu/PATCHES.png')
            this.load.image('version','assets/Menu/Version.png')
            this.load.image('Coreman','assets/Menu/Coreman.png');
            this.load.image('menu', 'assets/Menu/Menu.png');
            this.load.image('nowagra','assets/Menu/nowagra.png');
            this.load.image('kontynuj','assets/Menu/kontynuj.png');
            this.load.image('opcje','assets/Menu/opcje.png');
            this.load.image('exit','assets/Menu/exit.png');
            this.load.image('back','assets/Menu/powrot.png');
            this.load.image('save_info','assets/Menu/save_info.png');
            this.load.image('options_bg','assets/Menu/options_bg.png');
            this.load.image('continue_bg','assets/Menu/continue_bg.png');
            this.load.image('placeholdersave','assets/placeholder.png')
            this.load.image('sound_bar','assets/Menu/BAR.png')
            this.load.image('soundtext','assets/Menu/SOUND.png')
            this.load.image('soundsfx','assets/Menu/SFX.png')
            this.load.image('dialog','assets/Menu/DIALOG.png')
            this.load.image('volumedown','assets/Menu/VOLUMEDOWNER.png')
            this.load.image('volumeup','assets/Menu/VOLUMEUPPER.png')
            this.load.image('controls_menu','assets/Menu/CONTROLS_SCREEN.png')
            this.load.image('bar_full','assets/Menu/bateryjka.png')
            this.load.image('bar_empty','assets/Menu/empty_bar.png')
            this.load.aseprite('tab','assets/Tutorial/TAB.png','assets/Tutorial/TAB.json')
            this.load.aseprite('esc','assets/Tutorial/ESC.png','assets/Tutorial/ESC.json')
            this.load.aseprite('leftbutton','assets/Tutorial/LEFTMOUSEBUTTON.png','assets/Tutorial/LEFTMOUSEBUTTON.json')
            this.load.aseprite('rightbutton','assets/Tutorial/RIGHTMOUSEBUTTON.png','assets/Tutorial/RIGHTMOUSEBUTTON.json')
            this.load.aseprite('w','assets/Tutorial/w_animation.png','assets/Tutorial/w_animation.json')
            this.load.aseprite('s','assets/Tutorial/S_animation.png','assets/Tutorial/S_animation.json')
            this.load.aseprite('a','assets/Tutorial/A_animation.png','assets/Tutorial/A_animation.json')
            this.load.aseprite('d','assets/Tutorial/D_animation.png','assets/Tutorial/D_animation.json')
            this.load.audio('music','assets/Menu/Under_Starlight_sky.mp3');
            this.load.audio('napismuz','assets/WinScreen/Credits.mp3');
            this.load.bitmapFont('atari-classic', 'assets/Tutorial/atari-classic.png', 'assets/Tutorial/atari-classic.xml');
        }
    create ()
        {
            this.sound.pauseOnBlur = false;
            this.anims.createFromAseprite('gears');
            this.anims.createFromAseprite('w');
            this.anims.createFromAseprite('s');
            this.anims.createFromAseprite('d');
            this.anims.createFromAseprite('a');
            this.anims.createFromAseprite('tab')
            this.anims.createFromAseprite('esc')
            this.anims.createFromAseprite('leftbutton')
            this.anims.createFromAseprite('rightbutton')
                if (localStorage.getItem("screenshot1")!=undefined && localStorage.getItem("screenshot1")!=null)
                {
                    this.textures.addBase64("screenshot1", localStorage.getItem("screenshot1"));
                }
                if (localStorage.getItem("screenshot2")!=undefined && localStorage.getItem("screenshot2")!=null)
                {
                   
                    this.textures.addBase64("screenshot2",localStorage.getItem("screenshot2"));
                }
                if (localStorage.getItem("screenshot3")!=undefined && localStorage.getItem("screenshot3")!=null)
                {
               
                    this.textures.addBase64("screenshot3",localStorage.getItem("screenshot3"));
                }
                if (localStorage.getItem("screenshot4")!=undefined && localStorage.getItem("screenshot4")!=null)
                {
                  
                    this.textures.addBase64("screenshot4",localStorage.getItem("screenshot4"));
                }
                if (localStorage.getItem("screenshot5")!=undefined && localStorage.getItem("screenshot5")!=null)
                {
              
                    this.textures.addBase64("screenshot5",localStorage.getItem("screenshot5"));
                }
                this.textures.on("onload", () => {
                    if (this.textures.list.screenshot1!==undefined)
                    {
                        this.add.image(377,182,"screenshot1").setDepth(10000).setScale(0.1)
                        var emeryt=localStorage.getItem('save1').split(";")
                        this.add.bitmapText(427,152,"atari-classic","DATE:",8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                        this.add.bitmapText(467,152,"atari-classic",emeryt[emeryt.length-1],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    }
                    if (this.textures.list.screenshot2!==undefined)
                    {
                    this.add.image(377,252,"screenshot2").setDepth(10000).setScale(0.1)
                    var emeryt=localStorage.getItem('save2').split(";")
                    this.add.bitmapText(427,222,"atari-classic","DATE:",8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    this.add.bitmapText(467,222,"atari-classic",emeryt[emeryt.length-1],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    }
                    if (this.textures.list.screenshot3!==undefined)
                    {
                    this.add.image(377,322,"screenshot3").setDepth(10000).setScale(0.1)
                    var emeryt=localStorage.getItem('save3').split(";")
                    this.add.bitmapText(427,292,"atari-classic","DATE:",8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    this.add.bitmapText(467,292,"atari-classic",emeryt[emeryt.length-1],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    }
                    if (this.textures.list.screenshot4!==undefined)
                    {
                        this.add.image(377,392,"screenshot4").setDepth(10000).setScale(0.1)
                        var emeryt=localStorage.getItem('save4').split(";")
                        this.add.bitmapText(427,362,"atari-classic","DATE:",8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                        this.add.bitmapText(467,362,"atari-classic",emeryt[emeryt.length-1],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    }
                    if (this.textures.list.screenshot5!==undefined)
                    {
                        this.add.image(377,462,"screenshot5").setDepth(10000).setScale(0.1)
                        var emeryt=localStorage.getItem('save5').split(";")
                        this.add.bitmapText(427,432,"atari-classic","DATE:",8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                        this.add.bitmapText(467,432,"atari-classic",emeryt[emeryt.length-1],8).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                    }
                });
            var activeGameObjects=
            [
                this.add.image(1900,525,'button_patch').setName('buttonpatch').setDepth(1000),
                this.add.image(1400,350,'nowagra').setName('nowagra').setDepth(1000).setScale(0.7),
                this.add.image(1400,400,'kontynuj').setName('kontynuj').setDepth(1000).setScale(0.7),
                this.add.image(1400,450,'opcje').setName('opcje').setDepth(1000).setScale(0.7),
                this.add.image(1400,500,'exit').setName('exit').setDepth(1000).setScale(0.7),
                this.add.image(2400,520,'back').setName('back').setDepth(1000).setScale(0.7),
                this.add.image(500,520,'back').setName('back').setDepth(1000).setScale(0.7),
                this.add.image(2300,450,'controls').setName('controls').setDepth(1000),
                this.add.image(2190,200,'volumedown').setName('turn_music').setDepth(1000),
                this.add.image(2428,200,'volumeup').setName('down_music').setDepth(1000),
                this.add.image(2190,290,'volumedown').setName('turn_sfx').setDepth(1000),
                this.add.image(2428,290,'volumeup').setName('down_sfx').setDepth(1000),
                this.add.image(2190,380,'volumedown').setName('turn_dialog').setDepth(1000),
                this.add.image(2428,380,'volumeup').setName('down_dialog').setDepth(1000)
            ];
            for (var g=1;g<=5;g++)
            {
                var moe=this.add.image(500,112+(g*70),'save_info').setInteractive(this.input.makePixelPerfect()).setScale(0.6).setDepth(1000).setName('save'+g)
                if (localStorage.getItem("save"+g)==undefined)
                {
                    this.add.bitmapText(330,95+(g*70),'atari-classic', 'Empty Slot File',11).setRotation(Phaser.Math.DegToRad(180)).setDepth(10000)
                }
                activeGameObjects.push(moe)
            }
			this.input.mouse.disableContextMenu();
            this.add.image(1400, 300,'menu').setScale(0.75);
            this.add.image(500, 300,'continue_bg').setScale(0.8);
            this.add.image(2400, 300,'options_bg').setScale(0.8);
            this.add.image(2300,165,'soundtext')
            this.add.image(2300,200,'sound_bar')
            this.add.image(2300,255,'soundsfx')
            this.add.image(2300,290,'sound_bar')
            this.add.image(2300,345,'dialog')
            this.add.image(2300,380,'sound_bar')
            this.add.image(1040,530,"version")
            this.add.image(1844,530,'patches')
            bateriesm=
            [
                this.add.image(2210,200,'bar_full').setName('fm1'),
                this.add.image(2230,200,'bar_full').setName('fm2'),
                this.add.image(2250,200,'bar_full').setName('fm3'),
                this.add.image(2270,200,'bar_full').setName('fm4'),
                this.add.image(2290,200,'bar_full').setName('fm5'),
                this.add.image(2310,200,'bar_full').setName('fm6'),
                this.add.image(2330,200,'bar_full').setName('fm7'),
                this.add.image(2350,200,'bar_full').setName('fm8'),
                this.add.image(2370,200,'bar_full').setName('fm9'),
                this.add.image(2390,200,'bar_full').setName('fm10'),
            ];
            bateriess=
            [
                this.add.image(2210,290,'bar_full').setName('fs1'),
                this.add.image(2230,290,'bar_full').setName('fs2'),
                this.add.image(2250,290,'bar_full').setName('fs3'),
                this.add.image(2270,290,'bar_full').setName('fs4'),
                this.add.image(2290,290,'bar_full').setName('fs5'),
                this.add.image(2310,290,'bar_full').setName('fs6'),
                this.add.image(2330,290,'bar_full').setName('fs7'),
                this.add.image(2350,290,'bar_full').setName('fs8'),
                this.add.image(2370,290,'bar_full').setName('fs9'),
                this.add.image(2390,290,'bar_full').setName('fs10'),
            ];
            bateriesd=
            [
                this.add.image(2210,380,'bar_full').setName('fd1'),
                this.add.image(2230,380,'bar_full').setName('fd2'),
                this.add.image(2250,380,'bar_full').setName('fd3'),
                this.add.image(2270,380,'bar_full').setName('fd4'),
                this.add.image(2290,380,'bar_full').setName('fd5'),
                this.add.image(2310,380,'bar_full').setName('fd6'),
                this.add.image(2330,380,'bar_full').setName('fd7'),
                this.add.image(2350,380,'bar_full').setName('fd8'),
                this.add.image(2370,380,'bar_full').setName('fd9'),
                this.add.image(2390,380,'bar_full').setName('fd10'),
            ];
            this.cameras.main.setBounds(0, 0, 2880, 540);
            if (mod==1)
            {
                this.cameras.main.scrollX=1920;
            }
            else if (mod==2)
            {
                this.cameras.main.scrollX=0;
            }
            else if (mod==3)
            {
                this.cameras.main.scrollX=0;
            }
            else
            {
                this.cameras.main.scrollX=960;
            }
            let sound=this.sound.add('music', { volume: mus, loop: true });
            sound.play()
            this.add.image(1400,160,'Coreman');
            
            
            activeGameObjects.forEach(activeGameObjects=>activeGameObjects.setInteractive(this.input.makePixelPerfect()));


            this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER, (pointer, gameObject) => 
            {
                if (
                    activeGameObjects.find(activeGameObject => activeGameObject === gameObject)
                ) {
                    gameObject.setTint(0x787878);
                }
                this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT, (pointer, gameObject) => {
                    if (
                        activeGameObjects.find(activeGameObject => activeGameObject === gameObject)
                    ) {
                        gameObject.clearTint();
                    }
                });
            });
            var yu=this
            this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer, gameObject) => 
            {
                if (mod==3)
                {
                    for (var g=1;g<=5;g++)
                    {
                        if (gameObject.name=='save'+g)
                        {
                            var d=new Date()
                            saved+=";"+d.getFullYear().toString()+":"+(d.getMonth()+1).toString()+":"+d.getDate().toString()+":"+d.getHours().toString()+":"+d.getMinutes().toString()+":"+d.getSeconds().toString()
                            localStorage.setItem("save"+g,saved)
                            localStorage.setItem("screenshot"+g,localStorage.getItem("Screenshot"))
                            this.textures.remove('screenshot1')
                            this.textures.remove('screenshot2')
                            this.textures.remove('screenshot3')
                            this.textures.remove('screenshot4')
                            this.textures.remove('screenshot5')
                            sound.stop()
                            mod=0
                            yu.scene.resume(previous)
                            yu.scene.stop("Scene2")
                            yu.scene.setVisible(true,previous)
                        }
                    }
                }
                else
                {
                    for (var g=1;g<=5;g++)
                    {
                        
                       if (gameObject.name=='save'+g && (localStorage.getItem("save"+g)!=undefined || localStorage.getItem("save"+g)!=null))
                       {
                               this.textures.remove('screenshot'+g)
                               var emeryt=localStorage.getItem('save'+g).split(";")
                               sound.stop()
                               yu.scene.start("Scene11",{mus:mus,sfx:sfx,dial:dial,previous:emeryt[0],playerX:emeryt[2],playerY:emeryt[1],playerhealth:emeryt[3],monsterspot:emeryt[4],playeritemdropchance:emeryt[5],playerdropchance:emeryt[6],Fromsaved:1,playerpoints:emeryt[7],playermaxhealth:emeryt[8],playerweapon:emeryt[9],playerdamage:emeryt[10],playernormalvelocity:emeryt[11],playerdiagonalvelocity:emeryt[12]})
                       }
                    } 
                }
                if ( gameObject.name === 'nowagra')
                {
                    for (var g=1;g<=5;g++)
                    {
                        if (localStorage.getItem("save"+g)!=undefined || localStorage.getItem("save"+g)!=null)
                       {
                        this.textures.remove('screenshot'+g)
                       }
                    }
                    sound.stop()    
                    this.scene.start('Scene11',{Fromsaved:0,sfx:sfx,mus:mus,dial:dial})
                }
                gameObject.name === 'opcje' && this.tweens.add({ targets: this.cameras.main, scrollX: 1920});
                if (gameObject.name === 'down_music'&&mus<0.45)
                {
                   mus+=0.05
                   musind+=1
                   sound.volume=mus
                    
                } 
                if (gameObject.name === 'turn_music'&&mus>=0.05)
                {
                    mus-=0.05
                    musind-=1
                    sound.volume=mus
                    
                }   
                
               if (gameObject.name === 'down_sfx'&&sfx<0.9)
                {
                    sfx+=0.1
                    sfxind+=1
                    
                } 
                if (gameObject.name === 'turn_sfx'&&sfx>=0.1)
                {
                    sfx-=0.1
                    sfxind-=1
                    
                }

                if (gameObject.name === 'down_dialog'&&dial<0.9)
                {
                    dial+=0.1
                    dialind+=1
                    
                } 
                if (gameObject.name === 'turn_dialog'&&dial>=0.1)
                {
                    dial-=0.1
                    dialind-=1
                    
                }
                 
                gameObject.name === 'kontynuj' && this.tweens.add({ targets: this.cameras.main, scrollX: 0 });
                if ((mod==2 || mod==1 || mod==3) && gameObject.name === 'back')
                {
                    for (var g=1;g<=5;g++)
                    {
                        if (localStorage.getItem("save"+g)!=undefined || localStorage.getItem("save"+g)!=null)
                       {
                        this.textures.remove('screenshot'+g)
                       }    
                    }
                    sound.stop()
                    mod=0
                    this.scene.stop("Scene2")
                    this.scene.setVisible(true,previous)
                    this.scene.resume(previous,{origin:"Scene2",playerY:playerY,playerX:playerX,mus:mus,sfx:sfx,dial:dial})
                }
                else
                {
                    gameObject.name === 'back' && this.tweens.add({ targets: this.cameras.main, scrollX: 960 });
                }
                if (gameObject.name === 'exit')
                {
                    sound.stop()
                    this.scene.stop("Scene2")
                    this.scene.start("Scene8",{mus:mus})
                } 
                if (gameObject.name==='buttonpatch')
                {
                    this.scene.launch('Scene1')
                    this.scene.pause('Scene2')
                }
                if (gameObject.name ==='controls' && this.cameras.main.scrollX==1920)
                {
                    this.scene.pause('Scene2')
                    this.scene.launch('Scene13')
                }
            });
        }
        update(){

            for (var i = 0; i <  sfxind; i++) {
                bateriess[i].setVisible(true)
            }
            for (var i = sfxind; i <  10; i++) {
                bateriess[i].setVisible(false)
            }
            for (var i = 0; i <  musind; i++) {
                bateriesm[i].setVisible(true)
            }
            for (var i = musind; i <  10; i++) {
                bateriesm[i].setVisible(false)
            }
            for (var i = 0; i <  dialind; i++) {
                bateriesd[i].setVisible(true)
            }
            for (var i = dialind; i <  10; i++) {
                bateriesd[i].setVisible(false)
            }
        }
}


    

