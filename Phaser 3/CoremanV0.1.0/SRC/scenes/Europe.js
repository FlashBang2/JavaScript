/** @type {import("../phaser/phaser")} */
import { FatherScene } from "./FatherScene.js";
var player;
var plying=0;
var monsters=0;
var promptinio=0;
var status_paused=0
var kasztan=0
var monsterspot=""
var Box=0
var Grass=0
var Tree=0
var Box02=0
var Mushroom=0;
var Rock=0
var Stumpt=0
var Weirdthing=0
var heart_full=0
var heart_empty=0
var bportal=0
var kock=0;
var barrier
export class Scene4 extends FatherScene{

     constructor()
    {
        super("Scene4");
    }
    init(data)
    {
        
        if (data.origin=='Scene3' && data.playerY==undefined && data.playerX==undefined)
        {
            plying=0;
            promptinio=1
            kasztan=super.PASTERYZOWANE()
            super.PODLASKI()
            super.RESETIMMORTALFRAME()
            super.BETTERMIND()
            monsterspot=data.monsterspot
            this.spawnPoint=
            {
                x:1825,
                y:1800
            }
            player=super.create();
            player.points=data.playerpoints
            player.health=data.playerhealth
            player.maxhealth=data.playermaxhealth
            player.normal_velocity=data.playernormalvelocity
            player.diagonal_velocity=data.playerdiagonalvelocity
            player.damage=data.playerdamage
            player.dropchance=data.playerdropchance
            player.weapon=data.playerweapon
            player.itemdropchance=data.playeritemdropchance
        }
        if (data.Fromsaved==1)
        {
            plying=0
            super.CRAP_SETTER()
            super.UBRANY()
            promptinio=1
            status_paused=0
            kasztan=1
            super.RESETIMMORTALFRAME()
            super.BETTERMIND()
            super.BETTERSTART()
            monsterspot=data.monsterspot
            this.spawnPoint=
            {
                x:Math.round(data.playerX),
                y:Math.round(data.playerY)
            }
            player=super.create();
            player.dropchance=parseInt(data.playerdropchance,10)
            player.health=parseInt(data.playerhealth, 10)
            player.maxhealth=parseInt(data.playermaxhealth, 10)
            player.weapon=data.playerweapon
            player.damage=parseInt(data.playerdamage, 10)
            player.normal_velocity=parseInt(data.playernormalvelocity, 10);
            player.diagonal_velocity=parseInt(data.playerdiagonalvelocity, 10);
            player.itemdropchance=parseInt(data.playeritemdropchance, 10);
            player.points=parseInt(data.playerpoints, 10)
        }
        this.mus=data.mus
        this.sfx=data.sfx
        this.dial=data.dial
    }
    create ()
        {
            this.theme=this.sound.add('Theme_Europe', { volume: this.mus, loop: true });
            this.theme.play()
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
 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------OBJECT CREATION-----------------------------------------------------------------------------------
 -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

            Box=this.add.group()
            Grass=this.add.group()
            Tree=this.physics.add.group()
            Box02=this.add.group()
            Mushroom=this.add.group()
            Rock=this.add.group()
            Weirdthing=this.physics.add.group()
            Stumpt=this.add.group()

 /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------MAIN WYSPA-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

            Box.get(2225,1518,'bush', '0')
            Box.get(1680,1326,'bush', '0')
            Box.get(1328,1743,'bush', '0')
            Grass.get(1392,1649,'grass','0')
            Grass.get(1552,1873,'grass','0')
            Grass.get(1584,1873,'grass','0')
            Grass.get(1264,1361,'grass','0')
            Grass.get(944,1745,'grass','0')
            Grass.get(1840,1393,'grass','0')
            Grass.get(1872,1393,'grass','0')
            Grass.get(2096,1425,'grass','0')
            Grass.get(2128,1425,'grass','0')
            Grass.get(2000,1841,'grass','0')
            Tree.get(2000,1218,'tree','0')
            Tree.get(1038,1919,'tree','0')
            Box02.get(1245,1457,'bush02','0')
            Box02.get(1603,2033,'bush02','0')
            Box02.get(2243,1809,'bush02','0')
            Mushroom.get( 1488,1297,'mushrooming','0')
            Mushroom.get( 1040,1745,'mushrooming','0')
            Mushroom.get( 1904,1777,'mushrooming','0')
            Mushroom.get( 2000,1489,'mushrooming','0')
            Rock.get(1360,2001,'dynamo','86')
            Rock.get(1872,2001,'dynamo','86')
            Rock.get(2128,1905,'dynamo','86')
            Rock.get(2320,1649,'dynamo','86')
            Rock.get(2192,1361,'dynamo','86')
            Rock.get(1776,1265,'dynamo','86')
            Rock.get(1616,1201,'dynamo','86')
            Rock.get(1072,1393,'dynamo','86')
            Rock.get(1008,1585,'dynamo','86')
            Rock.get(912,1809,'dynamo','86')
            Stumpt.get(2224,1361,'dynamo','50')
            Stumpt.get(1424,1169,'dynamo','50')
            Stumpt.get(1104,1649,'dynamo','50')
            Weirdthing.get(2096,1995,'weirdthing')
            Weirdthing.get(1840,1131,'weirdthing')
            Weirdthing.get(976,1611,'weirdthing')

 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------LEFT UP WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

            Grass.get(1328,593,'grass','0')
            Grass.get(1040,561,'grass','0')
            Grass.get(944,241,'grass','0')
            Grass.get(656,369,'grass','0')
            Grass.get(464,593,'grass','0')
            Grass.get(464,625,'grass','0')
            Grass.get(592,1041,'grass','0')
            Grass.get(304,1073,'grass','0')
            Box02.get(995,913,'bush02','0')
            Box02.get(739,337,'bush02','0')
            Box.get(432,561,'bush','0')
            Box.get(784,753,'bush','0')
            Box.get(1136,433,'bush','0')
            Mushroom.get(560,529,'mushrooming','0')
            Mushroom.get(880,401,'mushrooming','0')
            Mushroom.get(1264,305,'mushrooming','0')
            Mushroom.get(1104,657,'mushrooming','0')
            Mushroom.get(624,913,'mushrooming','0')
            Tree.get(402,829,'tree','0')
            Weirdthing.get(1264,683,'weirdthing')
            Weirdthing.get(912,235,'weirdthing')
            Rock.get(432,1041,'dynamo','86')
            Rock.get(144,881,'dynamo','86')
            Rock.get(688,657,'dynamo','86')
            Rock.get(880,977,'dynamo','86')
            Rock.get(1168,817,'dynamo','86')
            Rock.get(1328,465,'dynamo','86')
            Rock.get(1168,305,'dynamo','86')
            Rock.get(688,305,'dynamo','86')
            Stumpt.get(272,593,'dynamo','50')
            Stumpt.get(752,1073,'dynamo','50')
            Stumpt.get(1392,593,'dynamo','50')
            Stumpt.get(1392,561,'dynamo','50')

  /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------RIGHT UP WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 
            Grass.get(2384,561,'grass','0')
            Grass.get(2512,817,'grass','0')
            Grass.get(2512,849,'grass','0')
            Grass.get(2672,657,'grass','0')
            Grass.get(2768,337,'grass','0')
            Grass.get(2768,1009,'grass','0')
            Grass.get(2960,1265,'grass','0')
            Grass.get(2864,1425,'grass','0')
            Box.get(2896,497,'bush','0')
            Box.get(2544,721,'bush','0')
            Box.get(3088,1329,'bush','0')
            Mushroom.get(2960,1489,'mushrooming','0')
            Mushroom.get(2896,1009,'mushrooming','0')
            Mushroom.get(2672,593,'mushrooming','0')
            Mushroom.get(2864,337,'mushrooming','0')
            Mushroom.get(2448,305,'mushrooming','0')
            Box02.get(2339,497,'bush02','0')
            Box02.get(2851,1169,'bush02','0')
            Tree.get(2608,290,'tree','0')
            Weirdthing.get(2288,331,'weirdthing')
            Weirdthing.get(2896,779,'weirdthing')
            Weirdthing.get(2992,1643,'weirdthing')
            Stumpt.get(2544,465,'dynamo','50')
            Stumpt.get(2896,689,'dynamo','50')
            Stumpt.get(2928,1489,'dynamo','50')
            Rock.get(2608,465,'dynamo','86')
            Rock.get(2704,401,'dynamo','86')
            Rock.get(2736,177,'dynamo','86')
            Rock.get(2352,625,'dynamo','86')
            Rock.get(2736,913,'dynamo','86')
            Rock.get(2928,977,'dynamo','86')
            Rock.get(2960,977,'dynamo','86')
            Rock.get(3056,1201,'dynamo','86')
            Rock.get(2896,1425,'dynamo','86')
            Rock.get(2896,1681,'dynamo','86')
            Rock.get(3088,1553,'dynamo','86')

 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------RIGHT DOWN WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

            Grass.get(2864,2577,'grass','0')
            Grass.get(2832,2801,'grass','0')
            Grass.get(2608,3057,'grass','0')
            Grass.get(2320,2993,'grass','0')
            Grass.get(2128,2769,'grass','0')
            Grass.get(2512,2545,'grass','0')
            Box.get(2288,2545,'bush','0')
            Box.get(2928,2065,'bush','0')
            Box.get(2672,2897,'bush','0')
            Tree.get(2894,2335,'tree','0')
            Box02.get(1955,2641,'bush02','0')
            Box02.get(2467,2289,'bush02','0')
            Mushroom.get(2416,2769,'mushrooming','0')
            Mushroom.get(2192,2993,'mushrooming','0')
            Mushroom.get(1872,2865,'mushrooming','0')
            Mushroom.get(2160,2417,'mushrooming','0')
            Mushroom.get(2736,2353,'mushrooming','0')
            Weirdthing.get(2704,2187,'weirdthing')
            Weirdthing.get(2736,2827,'weirdthing')
            Weirdthing.get(1936,2475,'weirdthing')
            Stumpt.get(2736,2065,'dynamo','50')
            Stumpt.get(2832,2481,'dynamo','50')
            Stumpt.get(2160,2673,'dynamo','50')
            Rock.get(2480,2161,'dynamo','86')
            Rock.get(2192,2257,'dynamo','86')
            Rock.get(2352,2385,'dynamo','86')
            Rock.get(2544,2513,'dynamo','86')
            Rock.get(2928,2641,'dynamo','86')
            Rock.get(2832,2769,'dynamo','86')
            Rock.get(2672,2705,'dynamo','86')
            Rock.get(2832,2289,'dynamo','86')
            Rock.get(2480,2865,'dynamo','86')
            Rock.get(2480,3089,'dynamo','86')
            Rock.get(2736,3025,'dynamo','86')
            Rock.get(2224,2833,'dynamo','86')
            Rock.get(2096,2897,'dynamo','86')
            Rock.get(1872,2769,'dynamo','86')
            Rock.get(2064,2481,'dynamo','86')

 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------LEFT DOWN WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            
            Grass.get(1360,2929,'grass','0')
            Grass.get(1264,2801,'grass','0')
            Grass.get(1232,2993,'grass','0')
            Grass.get(1104,2993,'grass','0')
            Grass.get(944,2673,'grass','0')
            Grass.get(912,2673,'grass','0')
            Grass.get(592,2897,'grass','0')
            Grass.get(560,2897,'grass','0')
            Grass.get(560,3025,'grass','0')
            Grass.get(240,2961,'grass','0')
            Grass.get(336,2801,'grass','0')
            Grass.get(304,2545,'grass','0')
            Grass.get(592,2289,'grass','0')
            Grass.get(528,2033,'grass','0')
            Grass.get(496,2033,'grass','0')
            Box.get(656,2449,'bush','0')
            Box.get(1296,2961,'bush','0')
            Box.get(432,2865,'bush','0')
            Tree.get(878,2879,'tree','0')
            Box02.get(1027,2417,'bush02','0')
            Box02.get(291,2321,'bush02','0')
            Mushroom.get(624,2001,'mushrooming','0')
            Mushroom.get(496,2289,'mushrooming','0')
            Mushroom.get(1008,2641,'mushrooming','0')
            Mushroom.get(1200,2993,'mushrooming','0')
            Mushroom.get(592,3089,'mushrooming','0')
            Weirdthing.get(1296,2635,'weirdthing')
            Weirdthing.get(592,2731,'weirdthing')
            Weirdthing.get(272,2539,'weirdthing')
            Stumpt.get(1232,2449,'dynamo','50')
            Stumpt.get(688,2897,'dynamo','50')
            Stumpt.get(304,2609,'dynamo','50')
            Rock.get(1328,2801,'dynamo','86')
            Rock.get(1104,2705,'dynamo','86')
            Rock.get(1168,2545,'dynamo','86')
            Rock.get(720,2609,'dynamo','86')
            Rock.get(784,2801,'dynamo','86')
            Rock.get(752,3057,'dynamo','86')
            Rock.get(432,2769,'dynamo','86')
            Rock.get(368,2577,'dynamo','86')
            Rock.get(400,2577,'dynamo','86')
            Rock.get(560,2513,'dynamo','86')
            Rock.get(880,2353,'dynamo','86')
            Rock.get(560,2097,'dynamo','86')

 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------OBJECTS ENDS-------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            this.physics.world.setBounds(0,0,3350,3350)
            this.add.sprite(1600,1600,'spacebackground').setDepth(5).setScale(1.5)
            barrier=this.physics.add.sprite(1825,1700,'bone').setImmovable()
            barrier.setBodySize(250,64)
            monsters=this.add.group();
            const map=this.make.tilemap({key:'levelone'});
            const tileset=map.addTilesetImage('Europa','tileseteuropa');
            const tileset2=map.addTilesetImage('HOUSE','house');
            const tileset3=map.addTilesetImage('InteractiveLayer','interactive')
            const tileset4=map.addTilesetImage('europa02','europa2')
            const layer=map.createLayer('Ziemia',tileset,0,0).setDepth(5);
            this.layer2=map.createLayer('Buildings',tileset2,0,0).setDepth(1600);
            this.layer3=map.createLayer('InteractiveLayer',tileset3,0,0)
            this.layer4=map.createLayer('BeautyLayer',[tileset,tileset4],0,0).setDepth(9);
            this.layer5=map.createLayer('AbyssLayer',tileset4,0,0).setDepth(11);
            this.layer6=map.createLayer('NonSpown',tileset4,0,0).setDepth(11);
            layer.setCollisionByProperty({ collide: true });
            this.layer2.setCollisionByProperty({ collide:true });
            this.layer3.setCollisionByProperty({collide:true});
            this.layer4.setCollisionByProperty({collide:true});
            this.layer5.setCollisionByProperty({collide:true});
            const dymek=this.add.sprite(1895,1480,'dymek').setScale(1.5).setDepth(20000);
            dymek.anims.play({key:'dymek2',repeat:-1},true)
            heart_full=this.add.group()
            heart_empty=this.add.group()
            for (var ij=0;ij<2;ij++)
            {
                for (var ik=0;ik<5;ik++)
                {
                    heart_full.get(50+ik*30,50+ij*20,'heart').setDepth(10000).setScale(2).setScrollFactor(0)
                    heart_empty.get(50+ik*30,50+ij*20,'empty_heart').setScale(2).setScrollFactor(0)
                }
                
            }
            for (var ij=player.maxhealth;ij<heart_full.getChildren().length;ij++)
                {
                    heart_full.getChildren()[ij].visible=false
                }
                for (var ij=player.health;ij<player.maxhealth;ij++)
                {
                    heart_full.getChildren()[ij].visible=false
                    heart_empty.getChildren()[ij].setDepth(10000)
                }    
           
            super.REBIND_HEALTH(heart_full,heart_empty)
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------RANDOM SPAWN-----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if (kasztan==0)
{
    kasztan=1
    while (monsters.getChildren().length<30)
    {
        var string="" 
        var x=0
        var y=0
        var offx=0
        var offy=0
        var coordinatesXMin=1000
        var coordinatesYMin=1300
        var coordinatesXMax=2000
        var coordinatesYMax=1800
        switch (Phaser.Math.Between(1,4))
        {
        case 1:
            {
                string="slime"
                x=30
                y=30
                offx=0
                offy=30
                break;
            }
        case 2:
            {
                string="skeleton"
                x=30
                y=62
                offx=0
                offy=2
                break;
            }
        case 3:
            {
                string="goblin"
                x=30
                y=64
                offx=17
                offy=0
                break;
            }
        case 4:
            {
                string="treeman"
                x=20
                y=33
                offx=6
                offy=25
                break;
            }
        }
        if(monsters.getChildren().length>=6 && monsters.getChildren().length<12)
        {
            coordinatesXMax=900
            coordinatesYMax=700
            coordinatesYMin=400
            coordinatesXMin=100
        }
        if (monsters.getChildren().length>=12 && monsters.getChildren().length<18)
        {
            coordinatesXMax=1000
            coordinatesYMax=2900
            coordinatesYMin=2000
            coordinatesXMin=100
        }
        if (monsters.getChildren().length>=18 && monsters.getChildren().length<24)
        {
            coordinatesXMax=3000
            coordinatesYMax=2700
            coordinatesYMin=1900
            coordinatesXMin=2400
        }
        if (monsters.getChildren().length>=24 && monsters.getChildren().length<30)
        {
            coordinatesXMax=3000
            coordinatesYMax=1500
            coordinatesYMin=100
            coordinatesXMin=2400
        }
        var xen=Phaser.Math.Between(coordinatesXMin,coordinatesXMax);
        var yen=Phaser.Math.Between(coordinatesYMin,coordinatesYMax);
        if(this.layer5.getTileAtWorldXY(xen,yen)==null && this.layer2.getTileAtWorldXY(xen,yen)==null && this.layer3.getTileAtWorldXY(xen,yen)==null&&this.layer6.getTileAtWorldXY(xen,yen)==null){
        var enemy=this.physics.add.sprite(xen,yen,string).setPushable(false).setName(string)
        enemy.body.setSize(x,y)
        enemy.body.setOffset(offx,offy)
        enemy.name=="slime" || enemy.name=="treeman" ? enemy.health=2: enemy.health=3
        enemy.movement=0
        if (enemy.name=="skeleton")
        {
            
            enemy.scoll=0
        }
        if (enemy.name=="goblin")
        {
            enemy.atakor=0
        }
        if (enemy.name=="treeman")
        {
            enemy.plant=0
            enemy.trapmax=0
        }
        monsters.add(enemy)
        }
        super.RETYPO(monsters)
    }

}
else
{
    var name=[]
    var y=[]
    var x=[]
    for(var g=0;g<monsterspot.trim().split(" ").length;g++)
    {
        if (g%3==2)
        {
           name.push(monsterspot.trim().split(" ")[g])
        }
        if (g%3==1)
        {
           y.push(parseInt(monsterspot.trim().split(" ")[g], 10))
        }
        if (g%3==0)
        {
           x.push(parseInt(monsterspot.trim().split(" ")[g], 10))
           
        }
    }
    for (var g=0;g<monsterspot.trim().split(" ").length/3;g++)
    {
        var enemy=this.physics.add.sprite(x[g],y[g],name[g]).setPushable(false).setName(name[g])
        enemy.name=="slime" || enemy.name=="treeman" ? enemy.health=2: enemy.health=3
        enemy.movement=0
        if (enemy.name=="slime")
        {
            enemy.body.setSize(30,30)
            enemy.body.setOffset(0,30)
        }
        if (enemy.name=="goblin")
        {
            enemy.body.setSize(30,64)
            enemy.body.setOffset(17,0)
            enemy.atakor=0
        }
        if (enemy.name=="treeman")
        {
            enemy.body.setSize(20,33)
            enemy.body.setOffset(6,25)
            enemy.plant=0
            enemy.trapmax=0
        }
        if (enemy.name=="skeleton")
        {
            enemy.body.setSize(30,62)
            enemy.body.setOffset(0,2)
            enemy.scoll=0
        }
        monsters.add(enemy)
    }
    super.RETYPO(monsters)
}


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
------------------------------------------------------------------------------COLLIDE SECTION--------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            monsters.getChildren().forEach((child)=>
            {
                if (child.name=="slime" || child.name=="treeman")
                {
                    this.physics.add.collider(child,barrier)
                }
            })
            this.physics.add.collider(monsters,this.layer4)
            this.physics.add.collider(monsters,this.layer5)
            this.physics.add.collider(monsters,player,(enemix,dum)=>
            {
                super.DAMAGE(player,heart_full,heart_empty,enemix)
            })
            this.physics.add.overlap(monsters,player.all_attack_hitbox,(monster,xun)=>
            {
                if (player.damagelock==0)
                {
                    player.damagelock=1
                    monster.health-=player.damage
                    monster.setMaxVelocity(45,45)
                    if (monster.health>0)
                    {
                        monster.setTint(0xff0000)
                    }
                    if (monster.name=='slime')
                    {
                        super.jumpSlime(monster,this.layer5)
                    }
                    monster.setTint(0xff0000)
                    this.time.addEvent({delay:400,callback:()=>
                    {
                        monster.setMaxVelocity(1000,1000)
                        monster.clearTint()
                    }})
                if (monster.name=='skeleton')
                    {
                        var string='s'
                        this.szsound.play()
                    }
                if (monster.name=='goblin')
                    {
                        var string='g' 
                        this.gsound.play()
                    } 
                if (monster.name=='slime')
                    {
                        var string='sl'
                        this.slsound.play()
                    }
                if (monster.name=='treeman')
                    {
                        var string='t'
                        this.tsound.play()
                    }
                if (monster.health<=0)
                {
                    monster.setMaxVelocity(0,0)
                    monster.anims.play({key:"dead"+string})
                    monsters.remove(monster)
                    monster.body.destroy()
                    monster.once('animationcomplete-dead'+string,()=>
                    {
                        var lastposition=monster.x+" "+monster.y
                        monster.destroy()
                        player.points++;
                        player.dropchance++;
                        player.itemdropchance++
                        super.DROPPINGITEMS()
                        this.DROP_CHANCE(lastposition)
                        player.damagelock=0
                    })
                }
                else
                {
                    this.time.addEvent({ delay:500, callback:()=>
                    {
                        player.damagelock=0;
                    }})
                }
                }
            })
            this.physics.add.overlap(monsters,player.arrow_atacks,(monster,xun)=>
            {
                xun.destroy()
                if (player.damagelock==0)
                {
                    player.damagelock=1
                    monster.health-=player.damage
                    monster.setMaxVelocity(45,45)
                    if (monster.health>0)
                    {
                        monster.setTint(0xff0000)
                    }
                    if (monster.name=='slime')
                    {
                        super.jumpSlime(monster,this.layer5)
                    }
                    monster.setTint(0xff0000)
                    this.time.addEvent({delay:400,callback:()=>
                    {
                        monster.setMaxVelocity(1000,1000)
                        monster.clearTint()
                    }})
                if (monster.name=='skeleton')
                    {
                        var string='s'
                        this.szsound.play()
                    }
                if (monster.name=='goblin')
                    {
                        var string='g' 
                        this.gsound.play()
                    } 
                if (monster.name=='slime')
                    {
                        var string='sl'
                        this.slsound.play()
                    }
                if (monster.name=='treeman')
                    {
                        var string='t'
                        this.tsound.play()
                    }
                if (monster.health<=0)
                {
                    monster.setMaxVelocity(0,0)
                    monster.anims.play({key:"dead"+string})
                    monsters.remove(monster)
                    monster.body.destroy()
                    monster.once('animationcomplete-dead'+string,()=>
                    {
                        var lastposition=monster.x+" "+monster.y
                        monster.destroy()
                        player.points++;
                        player.dropchance++;
                        player.itemdropchance++
                        super.DROPPINGITEMS()
                        this.DROP_CHANCE(lastposition)
                        player.damagelock=0
                    })
                }
                else
                {
                    this.time.addEvent({ delay:500, callback:()=>
                    {
                        player.damagelock=0;
                    }})
                }
                }
            })
            this.physics.add.collider(monsters,this.layer2)
            this.physics.add.collider(monsters,this.layer3)
            this.physics.add.collider(player, this.layer4);
            this.physics.add.collider(player, this.layer5);
            this.physics.add.collider(player, this.layer2);
            this.physics.add.collider(player,Tree)
            this.physics.add.collider(Tree,monsters)
            this.physics.add.collider(Weirdthing,monsters)
            this.physics.add.collider(monsters,Tree)
            this.physics.add.collider(player,Weirdthing)
            this.physics.add.collider(monsters,Weirdthing)
            this.physics.add.collider(player,this.layer3,()=>
            {
                monsterspot=""
                    for (var g=0;g<monsters.getChildren().length;g++)
                    {
                        monsterspot+=monsters.getChildren()[g].x+" "+monsters.getChildren()[g].y+" "+monsters.getChildren()[g].name+" "
                    }
                this.theme.stop()
                this.scene.pause('Scene4')
                this.scene.start('Scene3',{origin:'Scene4',prompt:promptinio,monsterspot:monsterspot,playerpoints:player.points,playeritemdropchance:player.itemdropchance,playerdropchance:player.dropchance,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,playermaxhealth:player.maxhealth,playerhealth:player.health,mus:this.mus,sfx:this.sfx,dial:this.dial})
            });
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------END COLLIDE SECTION--------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
            this.minimap = this.cameras.add(730,10, 200, 200).setZoom(0.2).setName('mini')
            this.minimap.startFollow(player,true)
            this.minimap.setBackgroundColor(0x000000);
            this.minimap.ignore(heart_full);
            this.minimap.ignore(heart_empty);
            this.thatsnice=this.add.image(830,110,'mapborder').setScrollFactor(0).setDepth(11000)
            this.funnystuff=this.add.image(820,220,'mapin').setScrollFactor(0).setDepth(11500).setName("ZoomIn").setInteractive(this.input.makePixelPerfect())
            this.evenfunnierstuff=this.add.image(840,220,'mapout').setScrollFactor(0).setDepth(11500).setName("ZoomOut").setInteractive(this.input.makePixelPerfect())
            this.minimap.ignore(this.funnystuff)
            this.minimap.ignore(this.evenfunnierstuff)
            this.minimap.ignore(this.thatsnice)
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------ARROW SHOOTING-------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            this.cameras.main.setBounds(0, 0, 3350, 3350);
            this.cameras.main.startFollow(player, true);
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------Dynamic Objects----------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

            for (var g=0;g<Box.getChildren().length;g++)
            {
                Box.getChildren()[g].setDepth(Box.getChildren()[g].y-12)
                Box.getChildren()[g].play({key:'Bushy',repeat:-1})
            }
            for (var g=0;g<Grass.getChildren().length;g++)
            {
                Grass.getChildren()[g].setDepth(Grass.getChildren()[g].y-16)
                Grass.getChildren()[g].play({key:'Grassy',repeat:-1})
            }
            for (var g=0;g<Tree.getChildren().length;g++)
            {
                Tree.getChildren()[g].setImmovable()
                Tree.getChildren()[g].setDepth(Tree.getChildren()[g].y)
                Tree.getChildren()[g].play({key:'Treeish',repeat:-1})
                Tree.getChildren()[g].setBodySize(96,22)
                Tree.getChildren()[g].setOffset(0,80)
            }
            for (var g=0;g<Box02.getChildren().length;g++)
            {
                Box02.getChildren()[g].setDepth(Box02.getChildren()[g].y-14)
                Box02.getChildren()[g].play({key:"Buushing",repeat:-1})
            }
            for (var g=0;g<Mushroom.getChildren().length;g++)
            {
                Mushroom.getChildren()[g].setDepth(Mushroom.getChildren()[g].y-22)
                Mushroom.getChildren()[g].play({key:"shroomLoop",repeat:-1})
            }
            for (var g=0;g<Rock.getChildren().length;g++)
            {
                Rock.getChildren()[g].setDepth(Rock.getChildren()[g].y-12)
            }
            for (var g=0;g<Stumpt.getChildren().length;g++)
            {
                Stumpt.getChildren()[g].setDepth(Stumpt.getChildren()[g].y-12)
            }
            for (var g=0;g<Weirdthing.getChildren().length;g++)
            {
                Weirdthing.getChildren()[g].setImmovable()
                Weirdthing.getChildren()[g].setDepth(Weirdthing.getChildren()[g].y-12)
                Weirdthing.getChildren()[g].setBodySize(25,1)
                Weirdthing.getChildren()[g].setOffset(0,40) 
            }
            bportal=0
            this.scaling_of_minimap=0
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------Dynamic Objects ENDS-----------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------MINIMAP BUTTONS-----------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

            this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN,(pointer,gameObject)=>{
                if(gameObject.name=="ZoomIn")
                {
                    if (this.scaling_of_minimap==0)
                    {
                        this.minimap.setZoom(0.4)
                        this.scaling_of_minimap=-1
                    }
                    if (this.scaling_of_minimap==1)
                    {
                        this.scaling_of_minimap=0
                        this.minimap.setZoom(0.2)
                    }
                    if (this.scaling_of_minimap==2)
                    {
                        this.scaling_of_minimap=1
                        this.minimap.setZoom(0.1,0.113)
                    }
                }
                if (gameObject.name=="ZoomOut")
                {
                    if (this.scaling_of_minimap==1)
                    {
                        this.scaling_of_minimap=2
                        this.minimap.setZoom(0.08)
                    }
                    if (this.scaling_of_minimap==0)
                    {
                        this.scaling_of_minimap=1
                        this.minimap.setZoom(0.1,0.113)
                    }
                    if (this.scaling_of_minimap==-1)
                    {
                        this.scaling_of_minimap=0
                        this.minimap.setZoom(0.2)
                    } 
                }
            })
            this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER,(pointer,gameObject)=>{
                gameObject.setTint(0x787878)
            })
            this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT,(pointer,gameObject)=>{
                gameObject.clearTint()
            })

    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------MINIMAP BUTTONS END-----------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/         
        }
    update ()
     {
        this.theme.volume=this.mus
        if (this.theme!=undefined &&  this.theme!=null)
        {
            if (this.theme.isPaused==1)
            {
                this.theme.resume()
            }
        }
        this.minimap.scrollX=Phaser.Math.Clamp(player.x, 0, 3350);
        this.minimap.scrollY=Phaser.Math.Clamp(player.y, 0, 3350);
        super.update()
          for (var g=0;g<monsters.getChildren().length;g++)
          {
              monsters.getChildren()[g].setDepth(monsters.getChildren()[g].y)
          }
          if(player.points>=30 && bportal==0)
        {
            this.theme.stop()
            this.theme=this.sound.add('wiatr', { volume: this.mus, loop: true });
            this.theme.play()
            this.sound.play('portal',{volume: this.sfx});
            var xp=Phaser.Math.Between(0, 20);
            var yp=Phaser.Math.Between(0, 20);
            if(this.layer5.getTileAtWorldXY(player.x+xp+46,player.y+yp+45)===null && this.layer2.getTileAtWorldXY(player.x+xp+46,player.y+yp+45)===null&& this.layer5.getTileAtWorldXY(player.x+xp+12,player.y+yp+35)===null&& this.layer2.getTileAtWorldXY(player.x+xp+12,player.y+yp+35)===null && this.layer5.getTileAtWorldXY(player.x+xp+70,player.y+yp+35)===null&& this.layer2.getTileAtWorldXY(player.x+xp+70,player.y+yp+35)===null){
                
                bportal=1
                var portal1=this.add.sprite(player.x+xp+12,player.y+yp,'portal1','0').setDepth(10000)
                var portal2=this.add.sprite(player.x+xp+70,player.y+yp,'portal2','0').setDepth(10000)
                var portal3=this.physics.add.sprite(player.x+xp+46,player.y+yp+10,'portal3','0').setDepth(10000)
                portal1.play({key:"portal_open"})
                portal2.play({key:"portal_openR"})
                portal3.play({key:"portal_opening"})
                portal3.once("animationcomplete-portal_opening",()=>
                {
                    portal3.play({key:"portal_open_loopp",repeat:-1})
                    this.physics.add.collider(player,portal3,()=>
                    {
                        this.theme.stop()
                        this.scene.start("Scene9",{playermaxhealth:player.maxhealth,playerhealth:player.health,playerpoints:player.points,playerdropchance:player.dropchance,playeritemdropchance:player.itemdropchance,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,mus:this.mus,sfx:this.sfx,dial:this.dial})
                    })
                })
            }else if(this.layer5.getTileAtWorldXY(player.x-xp-42,player.y-yp-3+35)===null&& this.layer2.getTileAtWorldXY(player.x-xp-42,player.y-yp-3+35)===null&& this.layer5.getTileAtWorldXY(player.x-xp-70,player.y-yp+35)===null&& this.layer2.getTileAtWorldXY(player.x-xp-70,player.y-yp+35)===null&& this.layer5.getTileAtWorldXY(player.x-xp-12,player.y-yp+35)===null&& this.layer2.getTileAtWorldXY(player.x-xp-12,player.y-yp+35)===null){
                
                    bportal=1
                    var portal1=this.add.sprite(player.x-xp-70,player.y-yp,'portal1','0').setDepth(10000)
                    var portal2=this.add.sprite(player.x-xp-12,player.y-yp,'portal2','0').setDepth(10000)
                    var portal3=this.physics.add.sprite(player.x-xp-42,player.y-yp-3,'portal3','0').setDepth(10000)
                    portal1.play({key:"portal_open"})
                    portal2.play({key:"portal_openR"})
                    portal3.play({key:"portal_opening"})
                    portal3.once("animationcomplete-portal_opening",()=>
                    {
                        portal3.play({key:"portal_open_loopp",repeat:-1})
                        this.physics.add.collider(player,portal3,()=>
                        {
                            this.theme.stop()
                            this.scene.start("Scene9",{playermaxhealth:player.maxhealth,playerhealth:player.health,playerpoints:player.points,playerdropchance:player.dropchance,playeritemdropchance:player.itemdropchance,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,mus:this.mus,sfx:this.sfx,dial:this.dial})
                        })
                    })
            }else if(this.layer5.getTileAtWorldXY(player.x-xp-38,player.y-yp+80+35)===null && this.layer2.getTileAtWorldXY(player.x-xp-38,player.y-yp+80+35)===null && this.layer5.getTileAtWorldXY(player.x-xp+30,player.y-yp+80+35)===null&& this.layer2.getTileAtWorldXY(player.x-xp+30,player.y-yp+80+35)===null&& this.layer5.getTileAtWorldXY(player.x-xp,player.y-yp-3+80+35)===null&& this.layer2.getTileAtWorldXY(player.x-xp,player.y-yp-3+80+35)===null){
                
                bportal=1
                var portal1=this.add.sprite(player.x-xp-38,player.y-yp-80,'portal1','0').setDepth(10000)
                var portal2=this.add.sprite(player.x-xp+30,player.y-yp-80,'portal2','0').setDepth(10000)
                var portal3=this.physics.add.sprite(player.x-xp,player.y-yp-3-80,'portal3','0').setDepth(10000)
                portal1.play({key:"portal_open"})
                portal2.play({key:"portal_openR"})
                portal3.play({key:"portal_opening"})
                portal3.once("animationcomplete-portal_opening",()=>
                {
                    portal3.play({key:"portal_open_loopp",repeat:-1})
                    this.physics.add.collider(player,portal3,()=>
                    {
                        this.theme.stop()
                        this.scene.start("Scene9",{playermaxhealth:player.maxhealth,playerhealth:player.health,playerpoints:player.points,playerdropchance:player.dropchance,playeritemdropchance:player.itemdropchance,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,mus:this.mus,sfx:this.sfx,dial:this.dial})
                    })
                })
            }else if(this.layer5.getTileAtWorldXY(player.x-xp-38,player.y-yp+80+35)===null&& this.layer2.getTileAtWorldXY(player.x-xp-38,player.y-yp+80+35)===null&& this.layer5.getTileAtWorldXY(player.x-xp+30,player.y-yp+80+35)===null&&this.layer2.getTileAtWorldXY(player.x-xp+30,player.y-yp+80+35)===null&&this.layer5.getTileAtWorldXY(player.x-xp,player.y-yp-3+80+35)===null&&layer2.getTileAtWorldXY(player.x-xp,player.y-yp-3+80+35)===null){
                
                bportal=1
                var portal1=this.add.sprite(player.x-xp-38,player.y-yp+80,'portal1','0').setDepth(10000)
                var portal2=this.add.sprite(player.x-xp+30,player.y-yp+80,'portal2','0').setDepth(10000)
                var portal3=this.physics.add.sprite(player.x-xp,player.y-yp-3+80,'portal3','0').setDepth(10000)
                portal1.play({key:"portal_open"})
                portal2.play({key:"portal_openR"})
                portal3.play({key:"portal_opening"})
                portal3.once("animationcomplete-portal_opening",()=>
                {
                    portal3.play({key:"portal_open_loopp",repeat:-1})
                    this.physics.add.collider(player,portal3,()=>
                    {
                        this.theme.stop()
                        this.scene.start("Scene9",{playermaxhealth:player.maxhealth,playerhealth:player.health,playerpoints:player.points,playerdropchance:player.dropchance,playeritemdropchance:player.itemdropchance,playerweapon:player.weapon,playerdamage:player.damage,playernormalvelocity:player.normal_velocity,playerdiagonalvelocity:player.diagonal_velocity,mus:this.mus,sfx:this.sfx,dial:this.dial})
                    })
                })
        }
        }
          /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------AI SEGMENT----------------------------------------------------------------------------------------------
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if(plying==0)
        {
        plying=1
        for(var j=0;j<monsters.getChildren().length;j++)
        {
            super.AI(monsters.getChildren()[j],monsters.getChildren()[j].name,player,heart_full,heart_empty)  
        }
        this.time.addEvent({delay:500,callback:()=>
            {
                plying=0
                j=0
            }}) 
        }
     }
    DROP_CHANCE (lastposition)
    {
       var rate=Phaser.Math.Between(1,100)
       lastposition=lastposition.split(" ")
       lastposition[0]=parseInt(lastposition[0],10)
       lastposition[1]=parseInt(lastposition[1],10)
         if (rate<=5 && player.dropchance==3)
       {
            player.dropchance=0
            var heartix=this.physics.add.sprite(lastposition[0],lastposition[1],"heart").setDepth(lastposition[1]).setScale(2)
            heartix.setBodySize(10,10)
            this.physics.add.overlap(player,heartix,()=>
            {
                
                if (player.health!=player.maxhealth)
                {
                heartix.destroy()
                this.HEALTH_RESTORATION(heart_full,heart_empty)
                }
            })
       }
       if (rate<=25 && player.dropchance==4)
       {
            player.dropchance=0
            var heartix=this.physics.add.sprite(lastposition[0],lastposition[1],"heart").setDepth(lastposition[1]).setScale(2)
            heartix.setBodySize(10,10)
            this.physics.add.overlap(player,heartix,()=>
            {
                
                if (player.health!=player.maxhealth)
                {
                  heartix.destroy()
                  this.HEALTH_RESTORATION(heart_full,heart_empty)
                }
            })
            
       }
       if (rate<=45 && player.dropchance>=5)
       {
        player.dropchance=0
        var heartix=this.physics.add.sprite(lastposition[0],lastposition[1],"heart").setDepth(lastposition[1]).setScale(2)
        heartix.setBodySize(10,10)
        this.physics.add.overlap(player,heartix,()=>
        {
            if (player.health!=player.maxhealth)
            {
              heartix.destroy()
              this.HEALTH_RESTORATION(heart_full,heart_empty)
            }
        })
      
       }
    }
    HEALTH_RESTORATION (heart_full,heart_empty)
    {
        super.HEALTH_RESTORATION(heart_full,heart_empty)
    }
    jumpSlime(enemy,layer){
        super.jumpSlime(enemy,layer);
    }
}

    

