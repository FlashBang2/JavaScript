var scene
var playerX
var playerY
var monsterspot
var Fromsaved
var playerpoints
var playerhealth
var playermaxhealth
var playerweapon
var playerdamage
var playernormalvelocity
var playerdiagonalvelocity
var playerdropchance
var mus
var sfx
var dial
var loaded=0
var playeritemdropchance
export class Scene11 extends Phaser.Scene
{
    constructor ()
    {
        super 
        ({
            key:"Scene11",
        })
    }
    init(data)
    {
        scene=data.previous
        playerX=data.playerX
        playerY=data.playerY
        monsterspot=data.monsterspot
        playerhealth=data.playerhealth
        Fromsaved=data.Fromsaved
        playerpoints=data.playerpoints
        playermaxhealth=data.playermaxhealth
        playerweapon=data.playerweapon
        playerdamage=data.playerdamage
        playernormalvelocity=data.playernormalvelocity
        playerdiagonalvelocity=data.playerdiagonalvelocity
        playerdropchance=data.playerdropchance
        playeritemdropchance=data.playeritemdropchance
        mus=data.mus
        sfx=data.sfx
        dial=data.dial
    }
    preload ()
    {
       
        
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------PRELOAD GRAPHICS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (loaded==0)
        {
            var gear=this.add.sprite(480,240,'gears','');
            gear.play({key:"gears", repeat:-1})
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 200,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2 + 100,
                y: height / 2 + 50,
                text: '0%',
                style: {
                    font: '50px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 200,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            var u=this
            this.load.on('complete', function () {
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
                gear.destroy();
                if (scene!=undefined)
                {
                    u.scene.start(scene,{playerX:playerX,playerY:playerY,monsterspot:monsterspot,playeritemdropchance,playerhealth:playerhealth,Fromsaved:Fromsaved,playerpoints:playerpoints,playerdropchance:playerdropchance,playermaxhealth:playermaxhealth,playerweapon:playerweapon,playerdamage:playerdamage,playernormalvelocity:playernormalvelocity,playerdiagonalvelocity:playerdiagonalvelocity,mus:mus,sfx:sfx,dial:dial})
                }
                else
                {
                    u.scene.start('Scene3',{origin:"Scene2",mus:mus,sfx:sfx,dial:dial})
                }
            });
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------PRELOAD GRAPHICS ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 3-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.image('background','assets/Tutorial/WSADPROMPT.png')
        this.load.image('tilesettutorial','assets/Tutorial/Room.png')
        this.load.image('stuff','assets/Level-one/Europa02.png')
        this.load.image('ub','assets/Tutorial/Clothes.png')
        this.load.image('bed2','assets/Tutorial/bed2.png')
        this.load.image('boxbrown','assets/Tutorial/boxbrown.png')
        this.load.image('boxpink','assets/Tutorial/boxpink.png')
        this.load.image('krzesloprzod','assets/Tutorial/krzesloprzod.png')
        this.load.image('krzeslotyl','assets/Tutorial/krzeslotyl.png')
        this.load.image('lampa','assets/Tutorial/lampa.png')
        this.load.image('szafkaD','assets/Tutorial/szafkaD.png')
        this.load.image('szafkaG','assets/Tutorial/szafkaG.png')
        this.load.image('szafkaL','assets/Tutorial/szafkaL.png')
        this.load.image('szafkaP','assets/Tutorial/szafkaP.png')
        this.load.image('table','assets/Tutorial/table.png')
        this.load.image('tablehor','assets/Tutorial/tablehor.png')
        this.load.image('waza','assets/Tutorial/waza.png')
        this.load.image('beczka','assets/Tutorial/beczka.png')
        this.load.image('view_prompt','assets/Tutorial/PROMPT_VIEW.png')
        this.load.image('skip','assets/Tutorial/skip.png')
        this.load.tilemapTiledJSON('Tutorial_Ground', 'assets/Tutorial/Tutorial_Ground.json')
        this.load.tilemapTiledJSON('Tutorial_Map','assets/Tutorial/Tutorial_Level.json')
        this.load.aseprite('ncoreman', 'assets/Tutorial/protagonista_01.png', 'assets/Tutorial/protagonista_01.json');
        this.load.aseprite('coreman', 'assets/Tutorial/protagonista_02.png', 'assets/Tutorial/protagonista_02.json');
        this.load.aseprite('wardrobe','assets/Tutorial/wardrobe.png','assets/Tutorial/wardrobe.json')
        this.load.aseprite('bed','assets/Tutorial/bed_sleep_animation.png','assets/Tutorial/bed_sleep_animation.json')
        this.load.aseprite('fireplace','assets/Tutorial/FIREPLACE.png','assets/Tutorial/FIREPLACE.json')
        this.load.aseprite('dywan','assets/Tutorial/CARPET.png','assets/Tutorial/CARPET.json')
        this.load.aseprite('cutscene1','assets/Tutorial/loop_begin.png','assets/Tutorial/loop_begin.json')
        this.load.aseprite('cutscene2','assets/Tutorial/destruction.png','assets/Tutorial/destruction.json')
        this.load.aseprite('cutscene3','assets/Tutorial/end.png','assets/Tutorial/end.json')
        this.load.aseprite('cutscene4','assets/Tutorial/zoom.png','assets/Tutorial/zoom.json')
        this.load.aseprite('cutscene5','assets/Tutorial/dancing_skeleton.png','assets/Tutorial/dancing_skeleton.json')
        this.load.audio('fire','assets/Tutorial/fire.wav')
        this.load.audio('narrator','assets/Tutorial/narrator.wav')
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 3 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 4-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.image('mapborder','assets/Level-one/MAP_BORDER.png')
        this.load.image('mapin','assets/Level-one/ZoomIn.png')
        this.load.image('mapout','assets/Level-one/ZoomOut.png')
        this.load.image('spacebackground','assets/Level-one/background.png')
        this.load.image('bone','assets/Level-one/Bone.png')
        this.load.image('tileseteuropa','assets/Level-one/Europa_Tileset.png')
        this.load.image('weirdthing','assets/Level-one/WEIRDTHING.png')
        this.load.image('house','assets/Level-one/HOUSE.png')
        this.load.image('interactive','assets/Level-one/InteractiveLayer.png')
        this.load.image('europa2','assets/Level-one/Europa02.png')
        this.load.image('arrowup','assets/Level-one/Arrowfromup.png');
        this.load.image('heart','assets/Level-one/Heart.png');
        this.load.image('empty_heart','assets/Level-one/Heart_Empty.png');
         this.load.spritesheet('dynamo','assets/Level-one/ITEMS.png',{
            frameWidth:32,
            frameHeight:32,
            startFrame:0,
            endFrame:100
        })
        this.load.spritesheet('monstershead','assets/Level-one/MONSTERSHEADS.png',{frameWidth:32,frameHeight:32})
        this.load.tilemapTiledJSON('levelone', 'assets/Level-one/levelone.json')
        this.load.aseprite('trap','assets/Level-one/trap.png','assets/Level-one/trap.json')
        this.load.aseprite('wand','assets/Level-one/wand.png','assets/Level-one/wand.json')
        this.load.aseprite('shadow_item','assets/Level-one/item_shadow.png','assets/Level-one/item_shadow.json')
        this.load.aseprite('milk','assets/Level-one/milk.png','assets/Level-one/milk.json')
        this.load.aseprite('bow','assets/Level-one/bow.png','assets/Level-one/bow.json')
        this.load.aseprite('axe','assets/Level-one/axe.png','assets/Level-one/axe.json')
        this.load.aseprite('boots','assets/Level-one/boots.png','assets/Level-one/boots.json')
        this.load.aseprite('pencil','assets/Level-one/pencil.png','assets/Level-one/pencil.json')
        this.load.aseprite('coreman', 'assets/Tutorial/protagonista_02.png', 'assets/Tutorial/protagonista_02.json');
        this.load.aseprite('atak','assets/Level-one/Big_swoosh.png','assets/Level-one/Big_swoosh.json')
        this.load.aseprite('dymek','assets/Level-one/DymekSheet.png','assets/Level-one/DynekSheet.json')
        this.load.aseprite('lancuch', 'assets/Level-one/lancuch.png', 'assets/Level-one/lanuch.json');
        this.load.aseprite('goblin','assets/Level-one/Goblin.png','assets/Level-one/Goblin.json')
        this.load.aseprite('skeleton','assets/Level-one/Skeleton.png','assets/Level-one/Skeleton.json')
        this.load.aseprite('slime','assets/Level-one/Slime.png','assets/Level-one/Slime.json')
        this.load.aseprite('treeman','assets/Level-one/Tree_Monster.png','assets/Level-one/Tree_Monster.json')
        this.load.aseprite('grass','assets/Level-one/GRASS.png','assets/Level-one/GRASS.json')
        this.load.aseprite('bush','assets/Level-one/BUSH.png','assets/Level-one/BUSH.json')
        this.load.aseprite('tree','assets/Level-one/TREE.png','assets/Level-one/TREE.json')
        this.load.aseprite('bush02','assets/Level-one/BUSH02.png','assets/Level-one/BUSH02.json')
        this.load.aseprite('mushrooming','assets/Level-one/SROOMS.png','assets/Level-one/SROOMS.json')
        this.load.aseprite('portal1','assets/Level-one/portal1.png',"assets/Level-one/portal1.json")
        this.load.aseprite("portal2","assets/Level-one/portal2.png","assets/Level-one/portal2.json")
        this.load.aseprite("portal3","assets/Level-one/portal3.png","assets/Level-one/portal3.json")
        this.load.aseprite('indicator_speed_down','assets/Level-one/speed_down.png','assets/Level-one/speed_down.json')
        this.load.aseprite('indicator_dmg','assets/Level-one/dmg_up.png','assets/Level-one/dmg_up.json')
        this.load.aseprite('indicator_hp','assets/Level-one/hp_up.png','assets/Level-one/hp_up.json')
        this.load.aseprite('indicator_speed_up','assets/Level-one/speed_up.png','assets/Level-one/speed_up.json')
        this.load.audio('takingdamage','assets/Level-one/TAKING_DAMAGE.wav');
        this.load.audio('szdamage','assets/Level-one/szkielet.wav');
        this.load.audio('sldamage','assets/Level-one/slime.wav');
        this.load.audio('gdamage','assets/Level-one/goblin.wav');
        this.load.audio('tdamage','assets/Level-one/treeman.wav');
        this.load.audio('Theme_Europe','assets/Level-one/COREMAN_EARTH.mp3')
        this.load.image('slow_treeman','assets/Level-one/TreemanSlowness.png')
        this.load.image('icoaxe','assets/Level-one/axe_ind.png')
        this.load.image('icoboots','assets/Level-one/boots_ind.png')
        this.load.image('icobow','assets/Level-one/Bow_ind.png')
        this.load.image('icocandy','assets/Level-one/Candy_ind.png')
        this.load.image('icofire','assets/Level-one/fire_ind.png')
        this.load.image('icomilk','assets/Level-one/milk_ind.png')
        this.load.image('icopencil','assets/Level-one/pencil_ind.png')
        this.load.image('icosplit','assets/Level-one/split_ind.png')
        this.load.audio('portal','assets/Level-one/portal.mp3');
        this.load.audio('wiatr','assets/Level-one/wiatr.wav');
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 4 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 5-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.image('Pause','assets/ESC/pause.png')
        this.load.image('Exit','assets/ESC/exit.png')
        this.load.image('Load','assets/ESC/load.png')
        this.load.image('Save','assets/ESC/save.png')
        this.load.image('Resume','assets/ESC/resume.png')
        this.load.image('Options','assets/ESC/options.png')
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 5 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 6-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.image('Death_Screen', 'assets/DeathScreen/Death_Screen.png');
        this.load.image('Death_Screen_Exit','assets/DeathScreen/EXIT_BUTTON.png')
        this.load.image('Death_Screen_Respawn','assets/DeathScreen/RESPAWN_BUTTON.png')
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 6 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 7-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.image('Gratulacje', 'assets/WinScreen/WINSCREEN.png');
        this.load.aseprite('End','assets/WinScreen/WINSCREEN1.png','assets/WinScreen/WINSCREEN1.json')
        this.load.aseprite('Dos','assets/WinScreen/dos.png','assets/WinScreen/dos.json')
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 7ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 9-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.spritesheet('monstershead2','assets/Level-two/MONSTERSHEADS.png',{frameWidth:32,frameHeight:32})
        this.load.aseprite('fireslime','assets/Level-two/Slime.png','assets/Level-two/Slime.json')
        this.load.aseprite('barbarian','assets/Level-two/Barbarian.png','assets/Level-two/Barbarian.json')
        this.load.aseprite('goblinarcher','assets/Level-two/ArcherGoblin.png','assets/Level-two/ArcherGoblin.json')
        this.load.aseprite('devilskeleton','assets/Level-two/DevilSkeleton.png','assets/Level-two/DevilSkeleton.json')
        this.load.aseprite('tallgrass','assets/Level-two/grass_tall.png','assets/Level-two/grass_tall.json')
        this.load.aseprite('grass1','assets/Level-two/grass.png','assets/Level-two/grass.json')
        this.load.aseprite('smallgrass','assets/Level-two/grass_small.png','assets/Level-two/grass_small.json')
        this.load.aseprite('smallergrass','assets/Level-two/grass_smaller.png','assets/Level-two/grass_smaller.json')
        this.load.tilemapTiledJSON('leveltwo','assets/Level-two/Level-two.json')
        this.load.image('tilesetasia','assets/Level-two/ASIA.png')
        this.load.image('asia2','assets/Level-two/asia02.png')
        this.load.image('bigstone','assets/Level-two/Big_Stone.png')
        this.load.image('smallstone','assets/Level-two/Small_rock.png')
        this.load.image('deadtree','assets/Level-two/Dead_tree.png')
        this.load.image('deadbush','assets/Level-two/Dead_bush.png')
        this.load.image('smallpillar','assets/Level-two/Small_pillar.png')
        this.load.image('stonepillar','assets/Level-two/Stone_pillar.png')
        this.load.image('rock1','assets/Level-two/Rock1.png')
        this.load.image('rock2','assets/Level-two/Rock2.png')
        this.load.image('rock3','assets/Level-two/Rock3.png')
        this.load.image('crackedstone','assets/Level-two/Cracked_stone.png')
        this.load.image('tent','assets/Level-two/Tent.png')
        this.load.audio('bdamage','assets/Level-two/barbarzynca.wav');
        this.load.audio('gadamage','assets/Level-two/goblinarcher.wav');
        this.load.audio('asia_theme','assets/Level-two/COREMAN_ASIA.mp3')
        this.load.aseprite('fire','assets/Level-two/fire.png','assets/Level-two/fire.json')
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 9 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 12-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.load.audio('prot','assets/Tutorial/prot.wav')
        this.load.audio('tort1','assets/Tutorial/toutorial1.wav')
        this.load.audio('tort2','assets/Tutorial/toutorial2.wav')
        this.load.audio('tort3','assets/Tutorial/toutorial3.wav')
        this.load.audio('tort4','assets/Tutorial/toutorial4.wav')
        this.load.audio('tort5','assets/Tutorial/toutorial5.wav')
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 12 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        loaded=1
    }
    else
    {
        if (scene!=undefined)
        {
            this.scene.start(scene,{playerX:playerX,playerY:playerY,monsterspot:monsterspot,playeritemdropchance,playerdropchance:playerdropchance,playerhealth:playerhealth,Fromsaved:Fromsaved,playerpoints:playerpoints,playermaxhealth:playermaxhealth,playerweapon:playerweapon,playerdamage:playerdamage,playernormalvelocity:playernormalvelocity,playerdiagonalvelocity:playerdiagonalvelocity,mus:mus,sfx:sfx,dial:dial})
        }
        else
        {
            this.scene.start("Scene3",{origin:"Scene2",mus:mus,sfx:sfx,dial:dial})
        }
        
    }
  }
  create ()
  {
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 3 -----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 this.anims.createFromAseprite('ncoreman')
 this.anims.createFromAseprite('coreman');
 this.anims.createFromAseprite('wardrobe');
 this.anims.createFromAseprite('bed');
 this.anims.createFromAseprite('fireplace')
 this.anims.createFromAseprite('dywan')
 this.anims.createFromAseprite('cutscene1')
 this.anims.createFromAseprite('cutscene2')
 this.anims.createFromAseprite('cutscene3')
 this.anims.createFromAseprite('cutscene4')
 this.anims.createFromAseprite('cutscene5')
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 3 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 4----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            this.anims.createFromAseprite('indicator_hp')
            this.anims.createFromAseprite('indicator_dmg')
            this.anims.createFromAseprite('indicator_speed_up')
            this.anims.createFromAseprite('indicator_speed_down')
            this.anims.createFromAseprite('trap')
            this.anims.createFromAseprite('coreman');
            this.anims.createFromAseprite('lancuch');
            this.anims.createFromAseprite('atak');
            this.anims.createFromAseprite('dymek');
            this.anims.createFromAseprite('slime');
            this.anims.createFromAseprite('skeleton');
            this.anims.createFromAseprite('goblin')
            this.anims.createFromAseprite('treeman')
            this.anims.createFromAseprite('grass')
            this.anims.createFromAseprite('bush')
            this.anims.createFromAseprite('tree')
            this.anims.createFromAseprite('bush02')
            this.anims.createFromAseprite('mushrooming')
            this.anims.createFromAseprite('portal1')
            this.anims.createFromAseprite('portal2')
            this.anims.createFromAseprite('portal3')
            this.anims.createFromAseprite('coreman');
            this.anims.createFromAseprite('lancuch');
            this.anims.createFromAseprite('atak');
            this.anims.createFromAseprite('wand')
            this.anims.createFromAseprite('shadow_item')
            this.anims.createFromAseprite('milk')
            this.anims.createFromAseprite('bow')
            this.anims.createFromAseprite('pencil')
            this.anims.createFromAseprite('axe')
            this.anims.createFromAseprite('boots')
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 4 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 7-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        this.anims.createFromAseprite('End');
        this.anims.createFromAseprite('Dos');
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------SCENE 7ENDS-----------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 9-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
    this.anims.createFromAseprite('fireslime');
    this.anims.createFromAseprite('barbarian');
    this.anims.createFromAseprite('goblinarcher');
    this.anims.createFromAseprite('devilskeleton');
    this.anims.createFromAseprite('tallgrass');
    this.anims.createFromAseprite('grass1');
    this.anims.createFromAseprite('smallgrass');
    this.anims.createFromAseprite('smallergrass');
    this.anims.createFromAseprite('fire');
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------SCENE 9 ENDS-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  }      
}