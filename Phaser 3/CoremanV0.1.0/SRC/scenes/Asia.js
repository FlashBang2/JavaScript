import { FatherScene } from "./FatherScene.js";
var player=0
var monsters=0;
var plying
var damagelock=0
var heart_full
var heart_empty
var bportal
var portal3
var kasztan=0
var monsterspot=""
var deadtrees=0
var deadbushs=0
var bigstones=0
var smallstones=0
var crackedstones=0
var stonepillars=0
var smallpillars=0
var rocks=0
var tallgrass=0
var grass=0
var smallgrass=0
var smallergrass=0
var orda=0
export class Scene9 extends FatherScene
{
    constructor()
    {
        super("Scene9")
    }
    init (data)
    {
        if (data.origin=='Scene2')
        {
            this.mus=data.mus
            this.sfx=data.sfx
            this.dial=data.dial
        }
        if (data.Fromsaved==1)
        {
            
            this.mus=data.mus
            this.sfx=data.sfx
            this.dial=data.dial
            bportal=0
            plying=0
            super.CRAP_SETTER()
            super.UBRANY()
            damagelock=0;
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
        else
        {
            bportal=0
            damagelock=0
            plying=0
            super.KASZTELAN()
            kasztan=super.PASTERYZOWANE()
            this.mus=data.mus
            this.sfx=data.sfx
            this.dial=data.dial
            this.spawnPoint=
            {
                x:1400,
                y:1550
            }
            player=super.create();
            player.health=data.playerhealth
            player.maxhealth=data.playermaxhealth
            player.normal_velocity=data.playernormalvelocity
            player.diagonal_velocity=data.playerdiagonalvelocity
            player.weapon=data.playerweapon
            player.dropchance=data.playerdropchance
            player.damage=data.playerdamage
            player.itemdropchance=data.playeritemdropchance
        }
    }
    create ()
    {
        this.physics.world.setBounds(0,0,3350,3350)
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
        this.theme=this.sound.add('asia_theme', { volume: this.mus, loop: true });
        this.theme.play()
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------OBJECT CREATION-----------------------------------------------------------------------------------
 -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        deadtrees=this.physics.add.group()
        deadbushs=this.add.group()
        bigstones=this.physics.add.group()
        crackedstones=this.physics.add.group()
        smallstones=this.physics.add.group()
        stonepillars=this.physics.add.group()
        smallpillars=this.add.group()
        rocks=this.add.group()
        tallgrass=this.add.group()
        grass=this.add.group()
        smallgrass=this.add.group()
        smallergrass=this.add.group()
        orda=this.physics.add.group()
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------MAIN WYSPA-----------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        bigstones.get(758,1428,'bigstone')
        crackedstones.get(992,1273,'crackedstone')
        stonepillars.get(1553,1331,'stonepillar')
        grass.get(882,1548,'grass1','0')
        grass.get(656,1524,'grass1','0')
        grass.get(878,1296,'grass1','0')
        tallgrass.get(1189,1148,'tallgrass','0')
  /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------LEFT UP WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        deadtrees.get(321,1012,'deadtree')
        rocks.get(503,818,'rock2')
        bigstones.get(755,573,'bigstone')
        crackedstones.get(441,529,'crackedstone')
        deadtrees.get(223,271,'deadtree')
        smallpillars.get(304,159,'smallpillar')
        deadtrees.get(865,302,'deadtree')
        smallstones.get(765,154,'smallstone')
        tallgrass.get(159,870,'tallgrass','0')
        grass.get(274,620,'grass1','0')
        grass.get(628,370,'grass1','0')
        grass.get(464,306,'grass1','0')
        tallgrass.get(604,186,'tallgrass','0')
        orda.get(1468,189,'tent')
  /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------RIGHT UP WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        bigstones.get(1681,399,'bigstone')
        stonepillars.get(2128,466,'stonepillar')
        smallstones.get(2660,215,'smallstone')
        bigstones.get(2645,790,'bigstone')
        tallgrass.get(1632,675,'tallgrass','0')
        tallgrass.get(2046,225,'tallgrass','0')
        tallgrass.get(2626,449,'tallgrass','0')
        smallgrass.get(2831,655,'smallgrass','0')
        smallgrass.get(2899,298,'smallgrass','0')
        smallgrass.get(2447,759,'smallgrass','0')
        grass.get(1927,561,'grass1','0')
        grass.get(1536,289,'grass1','0')
 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------RIGHT WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        smallpillars.get(3024,1188,'smallpillar')
        rocks.get(2896,1268,'rock3')
        bigstones.get(2705,1432,'bigstone')
        smallstones.get(2404,1274,'smallstone')
        rocks.get(2510,2510,'rock3')
        rocks.get(2098,1359,'rock1')
        deadbushs.get(1974,1453,'deadbush')
        rocks.get(2106,1679,'rock1')
        stonepillars.get(2771,1624,'stonepillar')
        deadtrees.get(2432,1777,'deadtree')
        deadtrees.get(2788,1965,'deadtree')
        rocks.get(3030,3030,'rock1')
        rocks.get(2513,1491,'rock1')
        tallgrass.get(2875,1439,'tallgrass','0')
        tallgrass.get(2245,1568,'tallgrass','0')
        smallgrass.get(2397,1402,'smallgrass','0')
        smallgrass.get(2719,1801,'smallgrass','0')
        grass.get(2982,1958,'grass1','0')
        grass.get(1937,1331,'grass1','0')
        orda.get(3030,2178,'tent')
 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------LEFT DOWN WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        deadbushs.get(277,1925,'deadbush')
        smallstones.get(798,2051,'smallstone')
        deadbushs.get(947,2155,'deadbush')
        bigstones.get(343,2240,'bigstone')
        smallpillars.get(1100,2461,'smallpillar')
        deadtrees.get(414,2507,'deadtree')
        crackedstones.get(420,2837,'crackedstone')
        deadtrees.get(926,2867,'deadtree')
        tallgrass.get(549,2082,'tallgrass','0')
        tallgrass.get(798,2465,'tallgrass','0')
        grass.get(656,2615,'grass1','0')
        smallgrass.get(1077,2113,'smallgrass','0')
        grass.get(359,1816,'grass1','0')
        smallgrass.get(191,2106,'smallgrass','0')
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------RIGHT DOWN WYSPA------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        smallstones.get(1670,2627,'smallstone')
        stonepillars.get(1841,2226,'stonepillar')
        deadtrees.get(2181,2483,'deadtree')
        rocks.get(2323,2483,'rock3')
        rocks.get(2517,2506,'rock1')
        deadbushs.get(2609,2660,'deadbush')
        bigstones.get(2651,2839,'bigstone')
        rocks.get(3040,3030,'rock1')
        deadbushs.get(2510,2986,'deadbush')
        rocks.get(1710,3023,'rock1')
        deadtrees.get(1956,2829,'deadtree')
        smallgrass.get(2004,2414,'smallgrass','0')
        tallgrass.get(2213,2787,'tallgrass','0')
        tallgrass.get(2991,2880,'tallgrass','0')
 /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------OBJECTS ENDS-------------------------------------------------------------------------------------------
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------Dynamic Objects----------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    for (var g=0;g<bigstones.getChildren().length;g++)
    {
        bigstones.getChildren()[g].setDepth(bigstones.getChildren()[g].y-12)
        bigstones.getChildren()[g].setImmovable()
        bigstones.getChildren()[g].setBodySize(75,12)
        bigstones.getChildren()[g].setOffset(15,50)
    }
    for (var g=0;g<crackedstones.getChildren().length;g++)
    {
        crackedstones.getChildren()[g].setDepth(crackedstones.getChildren()[g].y-12)
        crackedstones.getChildren()[g].setImmovable()
        crackedstones.getChildren()[g].setBodySize(62,5)
        crackedstones.getChildren()[g].setOffset(0,40)
    }
    for (var g=0;g<stonepillars.getChildren().length;g++)
    {
        stonepillars.getChildren()[g].setDepth(stonepillars.getChildren()[g].y-12)
        stonepillars.getChildren()[g].setImmovable()
        stonepillars.getChildren()[g].setBodySize(20,2)
        stonepillars.getChildren()[g].setOffset(5,50)
    }
    for (var g=0;g<deadtrees.getChildren().length;g++)
    {
        deadtrees.getChildren()[g].setDepth(deadtrees.getChildren()[g].y-10)
        deadtrees.getChildren()[g].setImmovable()
        deadtrees.getChildren()[g].setBodySize(10,2)
        deadtrees.getChildren()[g].setOffset(29,80)
    }
    for (var g=0;g<rocks.getChildren().length;g++)
    {
        rocks.getChildren()[g].setDepth(rocks.getChildren()[g].y-20)
    }
    for (var g=0;g<deadbushs.getChildren().length;g++)
    {
        deadbushs.getChildren()[g].setDepth(deadbushs.getChildren()[g].y-12)
    }
    for (var g=0;g< smallpillars.getChildren().length;g++)
    {
        smallpillars.getChildren()[g].setDepth( smallpillars.getChildren()[g].y-12)
    }
    for (var g=0;g<smallstones.getChildren().length;g++)
    {
        smallstones.getChildren()[g].setDepth(smallstones.getChildren()[g].y-12)
        smallstones.getChildren()[g].setImmovable()
        smallstones.getChildren()[g].setBodySize(55,12)
        smallstones.getChildren()[g].setOffset(7,24)
    }
    for (var g=0;g<tallgrass.getChildren().length;g++)
    {
        tallgrass.getChildren()[g].setDepth(tallgrass.getChildren()[g].y+1)
        tallgrass.getChildren()[g].play({key:'Loop3',repeat:-1})
    }
    for (var g=0;g<grass.getChildren().length;g++)
    {
        grass.getChildren()[g].setDepth(grass.getChildren()[g].y-16)
        grass.getChildren()[g].play({key:'Loop4',repeat:-1})
    }
    for (var g=0;g<smallgrass.getChildren().length;g++)
    {
        smallgrass.getChildren()[g].setDepth(smallgrass.getChildren()[g].y-16)
        smallgrass.getChildren()[g].play({key:'Loop1',repeat:-1})
    }
    for (var g=0;g<smallergrass.getChildren().length;g++)
    {
        smallergrass.getChildren()[g].setDepth(smallergrass.getChildren()[g].y-16)
        smallergrass.getChildren()[g].play({key:'Loop2',repeat:-1})
    }
    for (var g=0;g<orda.getChildren().length;g++)
    {
        orda.getChildren()[g].setDepth(orda.getChildren()[g].y-12)
        orda.getChildren()[g].setImmovable()
        orda.getChildren()[g].setBodySize(145,20)
        orda.getChildren()[g].setOffset(8,80)
    }
 /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------Dynamic Objects ENDS-----------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        monsters=this.physics.add.group()
        this.add.sprite(1600,1600,'spacebackground').setDepth(5)
        this.scene.sendToBack('Scene9')
        const map=this.make.tilemap({key:'leveltwo'});
        const tileset=map.addTilesetImage('ASIA','tilesetasia')
        const tileset4=map.addTilesetImage('obj','asia2')
        const layer=map.createLayer('Ziemia',tileset,0,0).setDepth(5)
        this.layer5=map.createLayer('AbyssLayer',tileset,0,0).setDepth(12)
        this.layer5.setCollisionByProperty({collide:true})
        this.physics.add.collider(player,this.layer5)
        this.physics.add.collider(player,monsters,(dun,enemix)=>
        {
            super.DAMAGE(player,heart_full,heart_empty,enemix)
        })
        this.physics.add.collider(monsters,this.layer5)
        this.physics.add.collider(monsters,bigstones)
        this.physics.add.collider(monsters,crackedstones)
        this.physics.add.collider(monsters,stonepillars)
        this.physics.add.collider(monsters,deadtrees)
        this.physics.add.collider(monsters,smallstones)
        this.physics.add.collider(monsters,orda)
        this.physics.add.collider(player,bigstones)
        this.physics.add.collider(player,crackedstones)
        this.physics.add.collider(player,stonepillars)
        this.physics.add.collider(player,deadtrees)
        this.physics.add.collider(player,smallstones)
        this.physics.add.collider(player,orda)
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
                    monster.setTint(0xff0000)
                    this.time.addEvent({delay:400,callback:()=>
                    {
                        monster.setMaxVelocity(1000,1000)
                        monster.clearTint()
                    }})
                if (monster.name=='devilskeleton')
                    {
                        var string='ds'
                        this.szsound.play()                     
                    }
                if (monster.name=='goblinarcher')
                    {
                        var string='ag' 
                        this.gsound.play()
                    } 
                if (monster.name=='fireslime')
                    {
                        var string='fs'
                        this.slsound.play()
                    }
                if (monster.name=='barbarian')
                    {
                        var string='b'
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
                        if (string=='fs') {
                           monster.fireslimefire.clear(true,true)
                        }
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
                    monster.setTint(0xff0000)
                    this.time.addEvent({delay:400,callback:()=>
                    {
                        monster.setMaxVelocity(1000,1000)
                        monster.clearTint()
                    }})
                if (monster.name=='devilskeleton')
                    {
                        var string='ds'
                        this.szsound.play()
                    }
                if (monster.name=='goblinarcher')
                    {
                        var string='ag' 
                        this.gsound.play()
                    } 
                if (monster.name=='fireslime')
                    {
                        var string='fs'
                        this.slsound.play()
                    }
                if (monster.name=='barbarian')
                    {
                        var string='b'
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
                        if (string=='fs') 
                        {
                            monster.fireslimefire.clear(true,true)
                        }
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
        this.cameras.main.setBounds(0, 0, 3350, 3350);
        this.cameras.main.startFollow(player,true);
        heart_full=this.add.group()
        heart_empty=this.add.group()
        this.add.sprite(1400-125,1550,'portal1','0').setDepth(1550)
        this.add.sprite(1400-75,1550,'portal2','0').setDepth(1550)
        portal3=this.physics.add.sprite(1400-100,1550+10,'portal3','0').setDepth(1550+10)
    /*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------SPAWNING AREA---------------------------------------------------------------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    var coordinatesXMin=2000
    var coordinatesYMin=1300
    var coordinatesXMax=3200
    var coordinatesYMax=2000
    switch (Phaser.Math.Between(1,4))
    {
    case 1:
        {
            string="fireslime"
            x=30
            y=30
            offx=0
            offy=30
            break;
        }
    case 2:
        {
            string="devilskeleton"
            x=30
            y=62
            offx=0
            offy=2
            break;
        }
    case 3:
        {
            string="goblinarcher"
            x=30
            y=64
            offx=0
            offy=0
            break;
        }
    case 4:
        {
            string="barbarian"
            x=20
            y=33
            offx=6
            offy=25
            break;
        }
    }
    if(monsters.getChildren().length>=6 && monsters.getChildren().length<12)
    {
        coordinatesXMax=1000
        coordinatesYMax=600
        coordinatesYMin=100
        coordinatesXMin=100
    }
    if (monsters.getChildren().length>=12 && monsters.getChildren().length<18)
    {
        coordinatesXMax=1500
        coordinatesYMax=2700
        coordinatesYMin=1800
        coordinatesXMin=200
    }
    if (monsters.getChildren().length>=18 && monsters.getChildren().length<24)
    {
        coordinatesXMax=3000
        coordinatesYMax=3000
        coordinatesYMin=2400
        coordinatesXMin=1900
    }
    if (monsters.getChildren().length>=24 && monsters.getChildren().length<30)
    {
        coordinatesXMax=3000
        coordinatesYMax=700
        coordinatesYMin=100
        coordinatesXMin=2200
    }
    var xen=Phaser.Math.Between(coordinatesXMin,coordinatesXMax);
    var yen=Phaser.Math.Between(coordinatesYMin,coordinatesYMax);
    if(this.layer5.getTileAtWorldXY(xen,yen)==null)
    {
        var enemy=this.physics.add.sprite(xen,yen,string).setPushable(false).setName(string)
        enemy.body.setSize(x,y)
        enemy.body.setOffset(offx,offy)  
        enemy.movement=0
        if (enemy.name=="barbarian")
        {
            enemy.health=5
        }
        if (enemy.name=="goblinarcher")
        {
            enemy.health=3
        }
        if (enemy.name=="devilskeleton")
        {
            enemy.health=4
            enemy.devilscoll=0
        }
        if (enemy.name=="fireslime")
        {   
            enemy.health=3
            enemy.fireslimefire=this.physics.add.group()
        }
        enemy.setDepth(1000)
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
        enemy.movement=0
        if (enemy.name=="barbarian")
        {
            enemy.body.setSize(20,33)
            enemy.body.setOffset(6,25)
            enemy.health=5
        }
        if (enemy.name=="goblinarcher")
        {
            enemy.body.setSize(30,64)
            enemy.body.setOffset(0,0)
            enemy.health=3
        }
        if (enemy.name=="devilskeleton")
        {
            enemy.body.setSize(30,62)
            enemy.body.setOffset(0,2)
            enemy.health=4
            enemy.devilscoll=0
        }
        if (enemy.name=="fireslime")
        {
            enemy.body.setSize(30,30)
            enemy.body.setOffset(0,30)
            enemy.health=3
            enemy.fireslimefire=this.physics.add.group()
        }
        monsters.add(enemy)
    }
    super.RETYPO(monsters)
}       
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
                 this.minimap = this.cameras.add(730,10, 200, 200).setZoom(0.2).setName('mini');
                this.minimap.startFollow(player,true)
                this.minimap.setBackgroundColor(0x000000);
                this.minimap.ignore(heart_full);
                this.minimap.ignore(heart_empty);
                this.thatsnice=this.add.image(830,110,'mapborder').setScrollFactor(0).setDepth(10000)
                this.funnystuff=this.add.image(820,220,'mapin').setScrollFactor(0).setDepth(11000).setName("ZoomIn").setInteractive(this.input.makePixelPerfect())
                this.evenfunnierstuff=this.add.image(840,220,'mapout').setScrollFactor(0).setDepth(11000).setName("ZoomOut").setInteractive(this.input.makePixelPerfect())
                this.minimap.ignore(this.funnystuff)
                this.minimap.ignore(this.evenfunnierstuff)
                this.minimap.ignore(this.thatsnice)
                this.scaling_of_minimap=0
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
                super.REBIND_HEALTH(heart_full,heart_empty)
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
        player.setDepth(player.y)
        for (var g=0;g<monsters.getChildren().length;g++)
          {
              monsters.getChildren()[g].setDepth(monsters.getChildren()[g].y)
          }
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
        if (player.points>=30 && bportal==0)
        {
            bportal=1
            this.theme.stop()
            this.theme=this.sound.add('wiatr', { volume: this.mus, loop: true });
            this.theme.play()
            this.sound.play('portal',{volume: this.sfx});
            portal3.play('portal_opening')
            portal3.on('animationcomplete-portal_opening',()=>
            {
                portal3.play({key:'portal_open_loopp',repeat:-1})
                this.physics.add.overlap(player,portal3,()=>{
                    this.theme.stop()
                    this.scene.start("Scene7",{mus:this.mus})
                })
            })
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
    HEALTH ()
    {
        return super.HEALTH()
    }
    MAXHEALTH()
    {
        return super.MAXHEALTH()
    }
}