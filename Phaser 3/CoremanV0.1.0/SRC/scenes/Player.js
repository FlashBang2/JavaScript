var kier
var n
var lancuchg
var lancuch
var n1
var hak
export class Player extends Phaser.GameObjects.Container
{
    constructor (scene,x,y)
    {
        super (scene,x,y,
            [
                scene.add.sprite(0,0,'coreman').setName('Player'),
                scene.add.sprite(60,0,'atak').setVisible(false).setName('Atak_right'),
                scene.add.sprite(60,0,'bone').setName('Atak_right_hitbox1').setVisible(false),
                scene.add.sprite(60,0,'bone').setName('Atak_right_hitbox2').setVisible(false),
                scene.add.sprite(60,0,'bone').setName('Atak_right_hitbox3').setVisible(false),
                scene.add.sprite(60,0,'bone').setName('Atak_right_hitbox4').setVisible(false),
                scene.add.sprite(60,0,'bone').setName('Atak_right_hitbox5').setVisible(false),
                scene.add.sprite(-60,0,'atak').setVisible(false).setName('Atak_left'),
                scene.add.sprite(-60,0,'bone').setName('Atak_left_hitbox1').setVisible(false),
                scene.add.sprite(-60,0,'bone').setName('Atak_left_hitbox2').setVisible(false),
                scene.add.sprite(-60,0,'bone').setName('Atak_left_hitbox3').setVisible(false),
                scene.add.sprite(-60,0,'bone').setName('Atak_left_hitbox4').setVisible(false),
                scene.add.sprite(-60,0,'bone').setName('Atak_left_hitbox5').setVisible(false),
                scene.add.sprite(0,60,'atak').setVisible(false).setName('Atak_down'),
                scene.add.sprite(0,60,'bone').setName('Atak_down_hitbox1').setVisible(false),
                scene.add.sprite(0,60,'bone').setName('Atak_down_hitbox2').setVisible(false),
                scene.add.sprite(0,60,'bone').setName('Atak_down_hitbox3').setVisible(false),
                scene.add.sprite(0,60,'bone').setName('Atak_down_hitbox4').setVisible(false),
                scene.add.sprite(0,60,'bone').setName('Atak_down_hitbox5').setVisible(false),
                scene.add.sprite(0,-60,'atak').setVisible(false).setName('Atak_up'),
                scene.add.sprite(0,-60,'bone').setName('Atak_up_hitbox1').setVisible(false),
                scene.add.sprite(0,-60,'bone').setName('Atak_up_hitbox2').setVisible(false),
                scene.add.sprite(0,-60,'bone').setName('Atak_up_hitbox3').setVisible(false),
                scene.add.sprite(0,-60,'bone').setName('Atak_up_hitbox4').setVisible(false),
                scene.add.sprite(0,-60,'bone').setName('Atak_up_hitbox5').setVisible(false),
                scene.add.sprite(42,42,'atak').setVisible(false).setName('Atak_right_down'),
                scene.add.sprite(42,42,'bone').setName('Atak_right_down_hitbox1').setVisible(false),
                scene.add.sprite(42,42,'bone').setName('Atak_right_down_hitbox2').setVisible(false),
                scene.add.sprite(42,42,'bone').setName('Atak_right_down_hitbox3').setVisible(false),
                scene.add.sprite(42,42,'bone').setName('Atak_right_down_hitbox4').setVisible(false),
                scene.add.sprite(42,42,'bone').setName('Atak_right_down_hitbox5').setVisible(false),
                scene.add.sprite(42,-42,'atak').setVisible(false).setName('Atak_right_up'),
                scene.add.sprite(42,-42,'bone').setName('Atak_right_up_hitbox1').setVisible(false),
                scene.add.sprite(42,-42,'bone').setName('Atak_right_up_hitbox2').setVisible(false),
                scene.add.sprite(42,-42,'bone').setName('Atak_right_up_hitbox3').setVisible(false),
                scene.add.sprite(42,-42,'bone').setName('Atak_right_up_hitbox4').setVisible(false),
                scene.add.sprite(42,-42,'bone').setName('Atak_right_up_hitbox5').setVisible(false),
                scene.add.sprite(-42,42,'atak').setVisible(false).setName('Atak_left_down'),
                scene.add.sprite(-42,42,'bone').setName('Atak_left_down_hitbox1').setVisible(false),
                scene.add.sprite(-42,42,'bone').setName('Atak_left_down_hitbox2').setVisible(false),
                scene.add.sprite(-42,42,'bone').setName('Atak_left_down_hitbox3').setVisible(false),
                scene.add.sprite(-42,42,'bone').setName('Atak_left_down_hitbox4').setVisible(false),
                scene.add.sprite(-42,42,'bone').setName('Atak_left_down_hitbox5').setVisible(false),
                scene.add.sprite(-42,-42,'atak').setVisible(false).setName('Atak_left_up'),
                scene.add.sprite(-42,-42,'bone').setName('Atak_left_up_hitbox1').setVisible(false),
                scene.add.sprite(-42,-42,'bone').setName('Atak_left_up_hitbox2').setVisible(false),
                scene.add.sprite(-42,-42,'bone').setName('Atak_left_up_hitbox3').setVisible(false),
                scene.add.sprite(-42,-42,'bone').setName('Atak_left_up_hitbox4').setVisible(false),
                scene.add.sprite(-42,-42,'bone').setName('Atak_left_up_hitbox5').setVisible(false),
                scene.add.sprite(4,-35,'indicator_dmg').setName('indicator_dmg').setVisible(false),
                scene.add.sprite(4,-35,'indicator_speed_down').setName('indicator_speed_down').setVisible(false),
                scene.add.sprite(4,-35,'indicator_speed_up').setName('indicator_speed_up').setVisible(false),
                scene.add.sprite(4,-35,'indicator_hp').setName('indicator_hp').setVisible(false),
            ])
         lancuchg = scene.add.group
         ({
            classType: Phaser.GameObjects.Sprite,  
         });
        this.width=this.getByName('Player').width
        this.height=this.getByName('Player').height
        this.weapon='Axe'
        this.blocked=0
        if (this.scene.key=='Scene3')
        {
            this.health=3
            this.maxhealth=3
            this.firstclick=true
            this.atack_cooldown=1
            this.hook_cooldown=1
        }
        else
        {
            this.health=3
            this.maxhealth=3
            this.firstclick=true
            this.atack_cooldown=0
            this.hook_cooldown=0
        }
        this.points=0
        this.damage=1
        this.itemdropchance=0
        this.dropchance=0
        this.normal_velocity=120
        this.diagonal_velocity=84
        this.damagelock=0
        this.arrow_atacks=scene.physics.add.group()
        this.all_attack_hitbox=scene.add.group()
        this.hitbox_atak_down=scene.physics.add.group()
        this.hitbox_atak_down.add(this.getByName('Atak_down_hitbox1'))
        this.hitbox_atak_down.add(this.getByName('Atak_down_hitbox2'))
        this.hitbox_atak_down.add(this.getByName('Atak_down_hitbox3'))
        this.hitbox_atak_down.add(this.getByName('Atak_down_hitbox4'))
        this.hitbox_atak_down.add(this.getByName('Atak_down_hitbox5'))
        this.hitbox_atak_down.getChildren()[0].body.setSize(15,15).setOffset(28,8) 
        this.hitbox_atak_down.getChildren()[1].body.setSize(15,15).setOffset(43,0) 
        this.hitbox_atak_down.getChildren()[2].body.setSize(27,17).setOffset(5,15) 
        this.hitbox_atak_down.getChildren()[3].body.setSize(15,15).setOffset(-24,5) 
        this.hitbox_atak_down.getChildren()[4].body.setSize(15,15).setOffset(-10,12)
        this.hitbox_atak_down.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_up=scene.physics.add.group()
        this.hitbox_atak_up.add(this.getByName('Atak_up_hitbox1'))
        this.hitbox_atak_up.add(this.getByName('Atak_up_hitbox2'))
        this.hitbox_atak_up.add(this.getByName('Atak_up_hitbox3'))
        this.hitbox_atak_up.add(this.getByName('Atak_up_hitbox4'))
        this.hitbox_atak_up.add(this.getByName('Atak_up_hitbox5'))
        this.hitbox_atak_up.getChildren()[0].body.setSize(15,15).setOffset(28,6) 
        this.hitbox_atak_up.getChildren()[1].body.setSize(15,15).setOffset(43,11)
        this.hitbox_atak_up.getChildren()[2].body.setSize(27,17).setOffset(5,1) 
        this.hitbox_atak_up.getChildren()[3].body.setSize(15,15).setOffset(-24,18) 
        this.hitbox_atak_up.getChildren()[4].body.setSize(15,15).setOffset(-10,7)
        this.hitbox_atak_up.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_right_down=scene.physics.add.group()
        this.hitbox_atak_right_down.add(this.getByName('Atak_right_down_hitbox1'))
        this.hitbox_atak_right_down.add(this.getByName('Atak_right_down_hitbox2'))
        this.hitbox_atak_right_down.add(this.getByName('Atak_right_down_hitbox3'))
        this.hitbox_atak_right_down.add(this.getByName('Atak_right_down_hitbox4'))
        this.hitbox_atak_right_down.add(this.getByName('Atak_right_down_hitbox5'))
        this.hitbox_atak_right_down.getChildren()[0].body.setSize(15,15).setOffset(25,-25) 
        this.hitbox_atak_right_down.getChildren()[1].body.setSize(15,15).setOffset(22,5)
        this.hitbox_atak_right_down.getChildren()[2].body.setSize(27,17).setOffset(1,15) 
        this.hitbox_atak_right_down.getChildren()[3].body.setSize(40,10).setOffset(-20,30) 
        this.hitbox_atak_right_down.getChildren()[4].body.setSize(15,15).setOffset(22,-9) 
        this.hitbox_atak_right_down.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_left=scene.physics.add.group()
        this.hitbox_atak_left.add(this.getByName('Atak_left_hitbox1'))
        this.hitbox_atak_left.add(this.getByName('Atak_left_hitbox2'))
        this.hitbox_atak_left.add(this.getByName('Atak_left_hitbox3'))
        this.hitbox_atak_left.add(this.getByName('Atak_left_hitbox4'))
        this.hitbox_atak_left.add(this.getByName('Atak_left_hitbox5'))
        this.hitbox_atak_left.getChildren()[0].body.setSize(15,15).setOffset(8,27)  
        this.hitbox_atak_left.getChildren()[1].body.setSize(15,15).setOffset(16,42) 
        this.hitbox_atak_left.getChildren()[2].body.setSize(17,27).setOffset(2,1) 
        this.hitbox_atak_left.getChildren()[3].body.setSize(15,15).setOffset(11,-27) 
        this.hitbox_atak_left.getChildren()[4].body.setSize(15,15).setOffset(7,-11) 
        this.hitbox_atak_left.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_right=scene.physics.add.group()
        this.hitbox_atak_right.add(this.getByName('Atak_right_hitbox1')) 
        this.hitbox_atak_right.add(this.getByName('Atak_right_hitbox2'))
        this.hitbox_atak_right.add(this.getByName('Atak_right_hitbox3'))
        this.hitbox_atak_right.add(this.getByName('Atak_right_hitbox4'))
        this.hitbox_atak_right.add(this.getByName('Atak_right_hitbox5'))
        this.hitbox_atak_right.getChildren()[0].body.setSize(15,15).setOffset(13,27)  
        this.hitbox_atak_right.getChildren()[1].body.setSize(15,15).setOffset(7,42) 
        this.hitbox_atak_right.getChildren()[2].body.setSize(17,27).setOffset(15,1) 
        this.hitbox_atak_right.getChildren()[3].body.setSize(15,15).setOffset(0,-27) 
        this.hitbox_atak_right.getChildren()[4].body.setSize(15,15).setOffset(9,-11) 
        this.hitbox_atak_right.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_left_up=scene.physics.add.group()
        this.hitbox_atak_left_up.add(this.getByName('Atak_left_up_hitbox1'))
        this.hitbox_atak_left_up.add(this.getByName('Atak_left_up_hitbox2'))
        this.hitbox_atak_left_up.add(this.getByName('Atak_left_up_hitbox3'))
        this.hitbox_atak_left_up.add(this.getByName('Atak_left_up_hitbox4'))
        this.hitbox_atak_left_up.add(this.getByName('Atak_left_up_hitbox5'))
        this.hitbox_atak_left_up.getChildren()[0].body.setSize(15,15).setOffset(0,10) 
        this.hitbox_atak_left_up.getChildren()[1].body.setSize(15,15).setOffset(-5,25) 
        this.hitbox_atak_left_up.getChildren()[2].body.setSize(27,17).setOffset(4,1) 
        this.hitbox_atak_left_up.getChildren()[3].body.setSize(40,10).setOffset(12,-8) 
        this.hitbox_atak_left_up.getChildren()[4].body.setSize(15,15).setOffset(-5,40) 
        this.hitbox_atak_left_up.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_left_down=scene.physics.add.group()
        this.hitbox_atak_left_down.add(this.getByName('Atak_left_down_hitbox1'))
        this.hitbox_atak_left_down.add(this.getByName('Atak_left_down_hitbox2'))
        this.hitbox_atak_left_down.add(this.getByName('Atak_left_down_hitbox3'))
        this.hitbox_atak_left_down.add(this.getByName('Atak_left_down_hitbox4'))
        this.hitbox_atak_left_down.add(this.getByName('Atak_left_down_hitbox5'))
        this.hitbox_atak_left_down.getChildren()[0].body.setSize(15,15).setOffset(-10,-20) 
        this.hitbox_atak_left_down.getChildren()[1].body.setSize(15,15).setOffset(-5,5)  
        this.hitbox_atak_left_down.getChildren()[2].body.setSize(27,17).setOffset(3,15) 
        this.hitbox_atak_left_down.getChildren()[3].body.setSize(40,10).setOffset(15,25) 
        this.hitbox_atak_left_down.getChildren()[4].body.setSize(15,15).setOffset(-7,-5) 
        this.hitbox_atak_left_down.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.hitbox_atak_right_up=scene.physics.add.group()
        this.hitbox_atak_right_up.add(this.getByName('Atak_right_up_hitbox1'))
        this.hitbox_atak_right_up.add(this.getByName('Atak_right_up_hitbox2'))
        this.hitbox_atak_right_up.add(this.getByName('Atak_right_up_hitbox3'))
        this.hitbox_atak_right_up.add(this.getByName('Atak_right_up_hitbox4'))
        this.hitbox_atak_right_up.add(this.getByName('Atak_right_up_hitbox5'))
        this.hitbox_atak_right_up.getChildren()[0].body.setSize(15,15).setOffset(20,5) 
        this.hitbox_atak_right_up.getChildren()[1].body.setSize(15,15).setOffset(25,20) 
        this.hitbox_atak_right_up.getChildren()[2].body.setSize(27,17).setOffset(2,1)  
        this.hitbox_atak_right_up.getChildren()[3].body.setSize(40,10).setOffset(-24,-4)
        this.hitbox_atak_right_up.getChildren()[4].body.setSize(15,15).setOffset(28,36) 
        this.hitbox_atak_right_up.getChildren().forEach((child)=>
        {
            child.body.enable=false         
        })
        this.all_attack_hitbox.add(this.hitbox_atak_left_up)
        this.all_attack_hitbox.add(this.hitbox_atak_left_down)
        this.all_attack_hitbox.add(this.hitbox_atak_right_up)
        this.all_attack_hitbox.add(this.hitbox_atak_left)
        this.all_attack_hitbox.add(this.hitbox_atak_right)
        this.all_attack_hitbox.add(this.hitbox_atak_right_down)
        this.all_attack_hitbox.add(this.hitbox_atak_down)
        this.all_attack_hitbox.add(this.hitbox_atak_up)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setSize(22,55)
        this.body.setOffset(5,4)
        this.body.collideWorldBounds=true
        this.body.onWorldBounds=true
        this.getByName('Atak_down').on('animationcomplete-attack_up',()=>
        {
            this.hitbox_atak_down.getChildren().forEach((child)=>
            {
               child.body.enable=false           
            })
            this.getByName('Atak_down').setVisible(false)
        })
        this.getByName('Atak_up').on('animationcomplete-attack_up',()=>
        {
            this.hitbox_atak_up.getChildren().forEach((child)=>
            {
               child.body.enable=false           
            })
            this.getByName('Atak_up').setVisible(false)
        })
        this.getByName('Atak_right').on('animationcomplete-attack_up',()=>
        {
         this.hitbox_atak_right.getChildren().forEach((child)=>
         {
            child.body.enable=false      
         })
            this.getByName('Atak_right').setVisible(false)
        })
        this.getByName('Atak_right_down').on('animationcomplete-attack_up',()=>
        {
         this.hitbox_atak_right_down.getChildren().forEach((child)=>
         {
            child.body.enable=false       
         })
            this.getByName('Atak_right_down').setVisible(false)
        })
        this.getByName('Atak_right_up').on('animationcomplete-attack_up',()=>
        {
         this.hitbox_atak_right_up.getChildren().forEach((child)=>
         {
            child.body.enable=false       
         })
            this.getByName('Atak_right_up').setVisible(false)
        })
        this.getByName('Atak_left').on('animationcomplete-attack_up',()=>
        {
         this.hitbox_atak_left.getChildren().forEach((child)=>
         {
            child.body.enable=false       
         })
            this.getByName('Atak_left').setVisible(false)
        })
        this.getByName('Atak_left_down').on('animationcomplete-attack_up',()=>
        {
         this.hitbox_atak_left_down.getChildren().forEach((child)=>
         {
            child.body.enable=false       
         })
            this.getByName('Atak_left_down').setVisible(false)
        })
        this.getByName('Atak_left_up').on('animationcomplete-attack_up',()=>
        {
         this.hitbox_atak_left_up.getChildren().forEach((child)=>
         {
            child.body.enable=false       
         })
            this.getByName('Atak_left_up').setVisible(false)
        })
        scene.input.on('pointerdown',(pointer)=>
        {
            if(pointer.leftButtonDown() && this.atack_cooldown==0 && this.weapon=="Axe")
            {
               this.atack_cooldown=1
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(112.5) && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.getByName('Atak_down').rotation=Phaser.Math.DegToRad(90)
                     this.hitbox_atak_down.getChildren().forEach((child)=>
                     {
                         child.body.enable=true     
                     })
                     this.getByName('Atak_down').setVisible(true).play('attack_up')
                  }
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=112.5 && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.hitbox_atak_up.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_up').rotation=Phaser.Math.DegToRad(-90)
                     this.getByName('Atak_up').setVisible(true).play('attack_up')
                  }
               if ((Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=157.5) && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.hitbox_atak_right.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_right').setVisible(true).play('attack_up')
                  }
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(157.5) && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.hitbox_atak_right_down.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_right_down').rotation=Phaser.Math.DegToRad(45)
                     this.getByName('Atak_right_down').setVisible(true).play('attack_up')
                  }
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<157.5 && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.hitbox_atak_right_up.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_right_up').rotation=Phaser.Math.DegToRad(-45)
                     this.getByName('Atak_right_up').setVisible(true).play('attack_up')
                  }
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=-(22.5) && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.getByName('Atak_left').rotation=Phaser.Math.DegToRad(180)
                     this.getByName('Atak_left').setVisible(true).play('attack_up')
                     this.hitbox_atak_left.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                  }
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(67.5) && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.hitbox_atak_left_down.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_left_down').rotation=Phaser.Math.DegToRad(135)
                     this.getByName('Atak_left_down').setVisible(true).play('attack_up')
                  }
               if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=67.5 && this.body.velocity.x==0 && this.body.velocity.y==0)
                  {
                     this.hitbox_atak_left_up.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_left_up').rotation=Phaser.Math.DegToRad(-135)
                     this.getByName('Atak_left_up').setVisible(true).play('attack_up')
                  }
               if (this.body.velocity.x>0 && this.body.velocity.y==0)
                  {
                     this.getByName('Atak_right').setVisible(true).play('attack_up')
                     this.hitbox_atak_right.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                  }
               if (this.body.velocity.x<0 && this.body.velocity.y==0)
                  {
                     this.getByName('Atak_left').rotation=Phaser.Math.DegToRad(180)
                     this.getByName('Atak_left').setVisible(true).play('attack_up')
                     this.hitbox_atak_left.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                  }
               if (this.body.velocity.x==0 && this.body.velocity.y>0)
                  {
                     this.getByName('Atak_down').rotation=Phaser.Math.DegToRad(90)
                     this.getByName('Atak_down').setVisible(true).play('attack_up')
                     this.hitbox_atak_down.getChildren().forEach((child)=>
                     {
                         child.body.enable=true     
                     })
                  }
               if (this.body.velocity.x==0 && this.body.velocity.y<0)
                  {
                     this.getByName('Atak_up').rotation=Phaser.Math.DegToRad(-90)
                     this.getByName('Atak_up').setVisible(true).play('attack_up')
                     this.hitbox_atak_up.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                  }
               if (this.body.velocity.x<0 && this.body.velocity.y>0)
                  {
                     this.getByName('Atak_left_down').rotation=Phaser.Math.DegToRad(135)
                     this.getByName('Atak_left_down').setVisible(true).play('attack_up')
                     this.hitbox_atak_left_down.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                  }
               if (this.body.velocity.x<0 && this.body.velocity.y<0)
                  {
                     this.hitbox_atak_left_up.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_left_up').rotation=Phaser.Math.DegToRad(-135)
                     this.getByName('Atak_left_up').setVisible(true).play('attack_up')  
                  }
               if (this.body.velocity.x>0 && this.body.velocity.y<0)
                  {
                     this.hitbox_atak_right_up.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_right_up').rotation=Phaser.Math.DegToRad(-45)
                     this.getByName('Atak_right_up').setVisible(true).play('attack_up')  
                  }
               if (this.body.velocity.x>0 && this.body.velocity.y>0)
                  {
                     this.hitbox_atak_right_down.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                     this.getByName('Atak_right_down').rotation=Phaser.Math.DegToRad(45)
                     this.getByName('Atak_right_down').setVisible(true).play('attack_up')
                     this.hitbox_atak_right_down.getChildren().forEach((child)=>
                     {
                        child.body.enable=true       
                     })
                  }
               scene.time.addEvent({delay:1250,callback:()=>
               {
                  this.atack_cooldown=0
               }})
            }
            if (pointer.leftButtonDown() && this.atack_cooldown==0 && this.weapon=="Bow")
            {
                this.atack_cooldown=1
                while(this.arrow_atacks.getChildren().length<4)
                {
                this.arrow_atacks.get(this.x,this.y,'arrowup').setDepth(10000)
                this.arrow_atacks.getChildren()[this.arrow_atacks.getChildren().length-1].rotation=Phaser.Math.Angle.Between(this.x,this.y,this.scene.pointer.worldX,this.scene.pointer.worldY)
                scene.physics.moveTo( this.arrow_atacks.getChildren()[this.arrow_atacks.getChildren().length-1], this.scene.pointer.worldX,this.scene.pointer.worldY,270);
                scene.time.addEvent({delay:1250,callback:()=>
                {
                    this.atack_cooldown=0
                    if (this.arrow_atacks.getChildren().length>=1)
                    {
                        this.arrow_atacks.getChildren()[0].destroy()
                    }
                }})
                }
            }
            if (this.health>0)
               {
            if (pointer.rightButtonDown() && this.hook_cooldown==0 && this.firstclick==true)
            {
                this.hook_cooldown=1
               this.firstclick=false
               kier="";
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=112.5) //GÓRA
               {
                  kier="GÓRA";
                  var zw=0 ;
                  n=0;
                  this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>
                  {
                  if (n<19)
                     {
                        lancuch=this.scene.physics.add.sprite(this.x,(this.y-35)-32*n, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                        lancuch.rotation=Phaser.Math.DegToRad(0)
                        lancuchg.add(lancuch);
                     if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                        {
                        if (this.scene.layer2.getTileAtWorldXY(this.x,(this.y-35)-32*(n+1))||this.scene.layer4.getTileAtWorldXY(this.x,(this.y-35)-32*(n+1)))
                           {
                           if(this.scene.layer2.getTileAtWorldXY(this.x,(this.y-35)-32*(n+1))||this.scene.layer4.getTileAtWorldXY(this.x,(this.y-35)-32*(n+1)).properties.collide==true)
                              {
                                 hak=this.scene.physics.add.sprite(this.x,(this.y-35)-32*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                 lancuchg.add(hak);
                                 zw=1;
                                 this.scene.time.removeEvent(this.troz);
                              }
                           }
                        }
                     }
                     else 
                        {
                           hak=this.scene.physics.add.sprite(this.x,(this.y-35)-32*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                           lancuchg.add(hak);
                           zw=1;
                        }
                               n++;
                  }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>
                              {
                              if(zw==1)
                                 {
                                 if(lancuchg.countActive()<=0)
                                    {
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                       this.scene.time.removeEvent(this.tz2);
                                    }
                                 else
                                   {
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(180)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>
                                       {
                                       if (lancuchg.countActive()>0)
                                          {
                                               lancuchg.shiftPosition(0, -32, 1);
                                               kier="";
                                          }
                                          else
                                          {
                                             this.hook_cooldown=0;
                                             this.scene.time.removeEvent(this.tz1);
                                             this.scene.time.removeEvent(this.tz2);
                                          }
                                          lo.destroy(); 
                                       });
                                   }
                                 }
                              }, callbackScope: this ,
                              loop: true,
                              }); 
                              this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>
                                 {
                                 if(lancuchg.countActive()>0)
                                   {
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>
                                       {
                                          lancuch.setPosition(this.x,(this.y-35)-32*n1);
                                       if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                          {
                                             this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                             {
                                                kier="";
                                                zw=1;
                                                this.scene.time.removeEvent(this.troz);
                                             });
                                          }
                                          n1++;
                                       });
                                   }   
                                 }, callbackScope: this ,
                                 loop: true,
                                 }); 
               }
                     if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(112.5)) // DÓŁ
                       {
                           kier="DÓŁ";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>
                              {
                              if (n<19)
                                 {
                                   lancuch=this.scene.physics.add.sprite(this.x,(this.y+35)+32*n, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(180)
                                   lancuchg.add(lancuch);
                                 if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                    {
                                    if (this.scene.layer2.getTileAtWorldXY(this.x,(this.y+35)+32*(n+1))||this.scene.layer4.getTileAtWorldXY(this.x,(this.y+35)+32*(n+1)))
                                       {
                                       if(this.scene.layer2.getTileAtWorldXY(this.x,(this.y+35)+32*(n+1))||this.scene.layer4.getTileAtWorldXY(this.x,(this.y+35)+32*(n+1)).properties.collide==true)
                                         {
                                             hak=this.scene.physics.add.sprite(this.x,(this.y+35)+32*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                             hak.rotation=Phaser.Math.DegToRad(180)
                                             lancuchg.add(hak);
                                             zw=1;
                                             this.scene.time.removeEvent(this.troz);
                                         }
                                       }
                                    }
                                 }
                                 else 
                                    {
                                       hak=this.scene.physics.add.sprite(this.x,(this.y+35)+32*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                       hak.rotation=Phaser.Math.DegToRad(180)
                                       lancuchg.add(hak);
                                       zw=1;
                                    }
                               n++;
                              }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>
                              {
                              if (zw==1) 
                                 {
                                 if(lancuchg.countActive()<=0)
                                   {
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                       this.scene.time.removeEvent(this.tz2);
                                   }
                                 else
                                   {
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(0)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>
                                       {
                                       if (lancuchg.countActive()>0)
                                          {
                                             kier="";
                                             lancuchg.shiftPosition(0, -32, 1);
                                          }
                                          else
                                             {
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                             }
                                           lo.destroy(); 
                                       });  
                                   }
                                 }
                              }, callbackScope: this ,
                              loop: true,
                              }); 
                              this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>
                                 {
                                 if(lancuchg.countActive()>0)
                                   {
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>
                                       {
                                          lancuch.setPosition(this.x,(this.y+35)+32*n1);
                                       if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                          {
                                             this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                             {
                                                kier="";
                                                zw=1;
                                                this.scene.time.removeEvent(this.troz);
                                             });
                                           }
                                           n1++;
                                       });
                                   }   
                                 }, callbackScope: this ,
                                 loop: true,
                                 }); 
                     }
                      if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=-(22.5)) //LEWA
                        {
                           kier="LEWA";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>{
                               if(n<19){
                                   lancuch=this.scene.physics.add.sprite((this.x-25)-32*n,this.y, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(-90)
                                   lancuchg.add(lancuch);
                                   if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                   {
                                       if(this.scene.layer2.getTileAtWorldXY((this.x-25)-32*(n+1),this.y)||this.scene.layer4.getTileAtWorldXY((this.x-25)-32*(n+1),this.y)){
                                           if(this.scene.layer2.getTileAtWorldXY((this.x-25)-32*(n+1),this.y)||this.scene.layer4.getTileAtWorldXY((this.x-25)-32*(n+1),this.y).properties.collide==true){
                                               hak=this.scene.physics.add.sprite((this.x-25)-32*n,this.y, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                               hak.rotation=Phaser.Math.DegToRad(-90)
                                               lancuchg.add(hak);
                                               zw=1;
                                               this.scene.time.removeEvent(this.troz);
                                           }
                                       }
                                   }
                               }else 
                               {
                                   hak=this.scene.physics.add.sprite((this.x-25)-32*n,this.y, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                   hak.rotation=Phaser.Math.DegToRad(-90)
                                   lancuchg.add(hak);
                                   zw=1;
                               }
                               n++;
                             }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>{
                               if (zw==1) {
                                   if(lancuchg.countActive()<=0){
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                   }else{
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(90)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>{
                                           if(lancuchg.countActive()>0){
                                              lancuchg.shiftPosition(0, -32, 1);
                                              kier="";
                                           }else{
                                               
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                           }
                                           lo.destroy(); 
                                       });
                                   }
                               }
                           }, callbackScope: this ,
                           loop: true,
                           });
                           this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>{
                                   if(lancuchg.countActive()>0){
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>{
                                           lancuch.setPosition((this.x-25)-32*n1,this.y);
                                           if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                           {
                                               this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                               {
                                                   kier="";
                                                   zw=1;
                                                   this.scene.time.removeEvent(this.troz);
                                               });
                                           }
                                           n1++;
                                       });
                                   }   
                           }, callbackScope: this ,
                           loop: true,
                           }); 
                       }
                       if ((Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=157.5)) //PRAWA
                       {
                           kier="PRAWA";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>{
                               if(n<19){
                                   lancuch=this.scene.physics.add.sprite((this.x+25)+32*n,this.y, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(90)
                                   lancuchg.add(lancuch);
                                   if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                   {
                                       if(this.scene.layer2.getTileAtWorldXY((this.x+25)+32*(n+1),this.y)|| this.scene.layer4.getTileAtWorldXY((this.x+25)+32*(n+1),this.y)){
                                           if(this.scene.layer2.getTileAtWorldXY((this.x+25)+32*(n+1),this.y)|| this.scene.layer4.getTileAtWorldXY((this.x+25)+32*(n+1),this.y).properties.collide==true){
                                               hak=this.scene.physics.add.sprite((this.x+25)+32*n,this.y, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                               hak.rotation=Phaser.Math.DegToRad(90)
                                               lancuchg.add(hak);;
                                               zw=1;
                                               this.scene.time.removeEvent(this.troz);
                                           }
                                       }
                                   }
                               }else 
                               {
                                   hak=this.scene.physics.add.sprite((this.x+25)+32*n,this.y, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                   hak.rotation=Phaser.Math.DegToRad(90)
                                   lancuchg.add(hak);
                                   zw=1;
                               }
                               n++;
                             }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>{
                               if (zw==1) {
                                   if(lancuchg.countActive()<=0){
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                   }else{
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(-90)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                           this.scene.time.delayedCall(100, ()=>{
                                           if(lancuchg.countActive()>0){
                                               lancuchg.shiftPosition(0, -32, 1);
                                               kier="";
                                           }else{
                                               
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                           }
                                           lo.destroy(); 
                                       });
                                   }
                               }
                           }, callbackScope: this ,
                           loop: true,
                           });
                           this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>{
                                   if(lancuchg.countActive()>0){
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>{
                                           lancuch.setPosition((this.x+25)+32*n1,this.y);
                                           if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                           {
                                               this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                               {
                                                   kier="";
                                                   zw=1;
                                                   this.scene.time.removeEvent(this.troz);
                                               });
                                           }
                                           n1++;
                                       });
                                   }   
                           }, callbackScope: this ,
                           loop: true,
                           });  
                       }
                       if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=67.5) //UPPER-LEFT
                       {
                           kier="UPPER-LEFT";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>{
                               if(n<19){
                                   lancuch=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y-35)-22*n, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(-45)
                                   lancuchg.add(lancuch);
                                   if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                   {
                                       if(this.scene.layer2.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y-35)-22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y-35)-22*(n+1))){
                                           if(this.scene.layer2.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y-35)-22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y-35)-22*(n+1)).properties.collide==true){
                                               hak=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y-35)-22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                               hak.rotation=Phaser.Math.DegToRad(-45)
                                               lancuchg.add(hak);
                                               zw=1;
                                               this.scene.time.removeEvent(this.troz);
                                           }
                                       }
                                   }
                               }else 
                               {
                                   hak=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y-35)-22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                   hak.rotation=Phaser.Math.DegToRad(-45)
                                   lancuchg.add(hak);
                                   zw=1;
                               }
                               n++;
                             }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>{
                               if (zw==1) {
                                   if(lancuchg.countActive()<=0){
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                   }else{
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(135)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>{
                                           if(lancuchg.countActive()>0){
                                               lancuchg.shiftPosition(0, -32, 1);
                                               kier="";
                                           }else{
                                               
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                           }
                                           lo.destroy(); 
                                       });
                                   }
                               }
                           }, callbackScope: this ,
                           loop: true,
                           });
                           this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>{
                                   if(lancuchg.countActive()>0){
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>{
                                           lancuch.setPosition((this.x-25)-22*n1,(this.y-35)-22*n1);
                                           if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                           {
                                               this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                               {
                                                   kier="";
                                                   zw=1;
                                                   this.scene.time.removeEvent(this.troz);
                                               });
                                           }
                                           n1++;
                                       });
                                   }   
                           }, callbackScope: this ,
                           loop: true,
                           }); 
                       }
                      
                       if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<157.5) //UPPER-RIGHT
                       {
                           kier="UPPER-RIGHT";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>{
                               if(n<19){
                                   lancuch=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y-35)-22*n, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(45)
                                   lancuchg.add(lancuch);
                                   if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                   {
                                       if(this.scene.layer2.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y-35)-22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y-35)-22*(n+1))){
                                           if(this.scene.layer2.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y-35)-22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y-35)-22*(n+1)).properties.collide==true){
                                               hak=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y-35)-22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                               hak.rotation=Phaser.Math.DegToRad(45)
                                               lancuchg.add(hak);
                                               zw=1;
                                               this.scene.time.removeEvent(this.troz);
                                           }
                                       }
                                   }
                               }else 
                               {
                                   hak=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y-35)-22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                   hak.rotation=Phaser.Math.DegToRad(45)
                                   lancuchg.add(hak);
                                   zw=1;
                               }
                               n++;
                             }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>{
                               if (zw==1) {
                                   if(lancuchg.countActive()<=0){
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                       this.scene.time.removeEvent(this.tz2);
                                   }else{
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(-135)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>{
                                           if(lancuchg.countActive()>0){
                                               lancuchg.shiftPosition(0, -32, 1);
                                               kier="";
                                              }else{
                                               
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                              }
                                           lo.destroy(); 
                                       });
                                   }
                               }
                           }, callbackScope: this ,
                           loop: true,
                           });
                           this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>{
                                   if(lancuchg.countActive()>0){
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>{
                                           lancuch.setPosition((this.x+25)+22*n1,(this.y-35)-22*n1);
                                           if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                           {
                                               this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                               {
                                                   kier="";
                                                   zw=1;
                                                   this.scene.time.removeEvent(this.troz);
                                               });
                                           }
                                           n1++;
                                       });
                                   }   
                           }, callbackScope: this ,
                           loop: true,
                           }); 
                       }
                       if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(157.5)) //DOWN-RIGHT
                       {
                           this.hook_cooldown=1
                           kier="DOWN-RIGHT";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>{
                               if(n<19){
                                   lancuch=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y+35)+22*n, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(135)
                                   lancuchg.add(lancuch);
                                   if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                   {
                                       if(this.scene.layer2.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y+35)+22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y+35)+22*(n+1))){
                                           if(this.scene.layer2.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y+35)+22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x+25)+22*(n+1),(this.y+35)+22*(n+1)).properties.collide==true){
                                               hak=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y+35)+22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                               hak.rotation=Phaser.Math.DegToRad(135)
                                               lancuchg.add(hak);
                                               zw=1;
                                               this.scene.time.removeEvent(this.troz);
                                           }
                                       }
                                   }
                               }else 
                               {
                                   hak=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y+35)+22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                   hak.rotation=Phaser.Math.DegToRad(135)
                                   lancuchg.add(hak);
                                   zw=1;
                               }
                               n++;
                             }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>{
                               if (zw==1) {
                                   if(lancuchg.countActive()<=0){
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                       this.scene.time.removeEvent(this.tz2);
                                   }else{
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(-45)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>{
                                           if(lancuchg.countActive()>0){
                                               lancuchg.shiftPosition(0, -32, 1);
                                               kier="";
                                           }else{
                                               
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                           }
                                           lo.destroy(); 
                                       });
                                   }
                               }
                           }, callbackScope: this ,
                           loop: true,
                           });
                           this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>{
                                   if(lancuchg.countActive()>0){
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>{
                                           lancuch.setPosition((this.x+25)+22*n1,(this.y+35)+22*n1);
                                           if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                           {
                                               this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                               {
                                                   kier="";
                                                   zw=1;
                                                   this.scene.time.removeEvent(this.troz);
                                               });
                                           }
                                           n1++;
                                       });
                                   }   
                           }, callbackScope: this ,
                           loop: true,
                           }); 
                       }
                       
                       if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(67.5)) //DOWN-LEFT
                       {
                           this.hook_cooldown=1
                           kier="DOWN-LEFT";
                           var zw=0;
                           n=0;
                           this.troz=this.scene.time.addEvent({ delay: 170, callback: ()=>{
                               if(n<19){
                                   lancuch=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y+35)+22*n, 'lancuch',  3).play({ key: 'lancuch', repeat: 0 }).setDepth(10000);
                                   lancuch.rotation=Phaser.Math.DegToRad(-135)
                                   lancuchg.add(lancuch);
                                   if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                   {
                                       if(this.scene.layer2.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y+35)+22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y+35)+22*(n+1))){
                                           if(this.scene.layer2.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y+35)+22*(n+1))||this.scene.layer4.getTileAtWorldXY((this.x-25)-22*(n+1),(this.y+35)+22*(n+1)).properties.collide==true){
                                               hak=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y+35)+22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                               hak.rotation=Phaser.Math.DegToRad(-135)
                                               lancuchg.add(hak);
                                               zw=1;
                                               this.scene.time.removeEvent(this.troz);
                                           }
                                       }
                                   }
                               }else 
                               {
                                   hak=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y+35)+22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                                   hak.rotation=Phaser.Math.DegToRad(-135)
                                   lancuchg.add(hak);
                                   zw=1;
                               }
                               n++;
                             }, callbackScope: this ,
                             repeat: 19,
                           });
                           this.tz1=this.scene.time.addEvent({ delay:195, callback: ()=>{
                               if (zw==1) {
                                   if(lancuchg.countActive()<=0){
                                       
                                       this.hook_cooldown=0;
                                       this.scene.time.removeEvent(this.tz1);
                                       this.scene.time.removeEvent(this.tz2);
                                   }else{
                                       var lo=lancuchg.getFirst(true)
                                       lo.rotation=Phaser.Math.DegToRad(45)
                                       lo.play({ key: 'lancuchr', repeat: 0 })
                                       this.scene.time.delayedCall(100, ()=>{
                                           if(lancuchg.countActive()>0){
                                               lancuchg.shiftPosition(0, -32, 1);
                                               kier="";
                                           }else{
                                               
                                               this.hook_cooldown=0;
                                               this.scene.time.removeEvent(this.tz1);
                                               this.scene.time.removeEvent(this.tz2);
                                           }
                                           lo.destroy(); 
                                       });
                                   }
                               }
                           }, callbackScope: this ,
                           loop: true,
                           });
                           this.tz2=this.scene.time.addEvent({ delay:5, callback: ()=>{
                                   if(lancuchg.countActive()>0){
                                       n1=0
                                       lancuchg.getChildren().forEach((lancuch)=>{
                                           lancuch.setPosition((this.x-25)-22*n1,(this.y+35)+22*n1);
                                           if (this.scene.layer2!=undefined && this.scene.layer4!=undefined)
                                           {
                                               this.scene.physics.add.collider(this.scene.layer2,lancuch,()=>
                                               {
                                                   kier="";
                                                   zw=1;
                                                   this.scene.time.removeEvent(this.troz);
                                               });
                                           }
                                           n1++;
                                       });
                                   }   
                           }, callbackScope: this ,
                           loop: true,
                           }); 
                       } 
                    }
                       else if (pointer.rightButtonDown()  && this.firstclick==false)
                       {
                           this.firstclick=true

                           if (this.health>0)
                           {
                               this.body.setMaxVelocity(1000,1000)
                               if (kier=="GÓRA") //GÓRA
                           {
                               hak=this.scene.physics.add.sprite(this.x,(this.y-35)-32*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(0)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.hook_cooldown=0;
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(180)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null && this.scene.layer5.getTileAtWorldXY(xh,yh+16)==null && this.scene.layer5.getTileAtWorldXY(xh,yh-16)==null && this.scene.layer5.getTileAtWorldXY(xh+16,yh)==null && this.scene.layer5.getTileAtWorldXY(xh-16,yh)==null && zw1==0 && xh>=0 && yh>=0 && xh<=3200 && yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       this.atack_cooldown=1;
                                                       this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_2'});
                                                       this.body.setVelocity(0,-350)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               });  
                           }
                           if (kier=="DÓŁ") // DÓŁ
                           {
                               hak=this.scene.physics.add.sprite(this.x,(this.y+35)+32*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(180)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.hook_cooldown=0;
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(0)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                                this.scene.time.removeEvent(this.tz2);
                                                this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                      this.atack_cooldown=1
                                                      this.blocked=1
                                                      this.body.checkCollision.none = true;
                                                      this.getByName('Player').play({key:'idle_1'});
                                                       this.body.setVelocity(0,350)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               }); 
                   
                           }
                        if (kier=="LEWA") //LEWA
                           {
                               hak=this.scene.physics.add.sprite((this.x-25)-32*n,this.y, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(-90)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                   
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.hook_cooldown=0;
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(90)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh,yh+16)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>
                                               {
                                                   if(lancuchg.countActive()>0){
                                                        this.atack_cooldown=1
                                                        this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_6'});
                                                       this.body.setVelocity(-350,0)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                       
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               });
                           }
                           if (kier=="PRAWA") //PRAWA
                           {
                               hak=this.scene.physics.add.sprite((this.x+25)+32*n,this.y, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(90)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                   
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.hook_cooldown=0
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(-90)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh,yh-16)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       this.atack_cooldown=1
                                                       this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_3'});
                                                       this.body.setVelocity(350,0)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                       
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               }); 
                           }
                           if (kier=="UPPER-LEFT") //UPPER-LEFT
                           {
                               hak=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y-35)-22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(-45)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                   
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.hook_cooldown=0
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(135)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh-16)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       this.atack_cooldown=1
                                                       this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_8'});
                                                       this.body.setVelocity(-247,-247)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                       
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               });
                           }
                           if (kier=="UPPER-RIGHT") //UPPER-RIGHT
                           {
                               hak=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y-35)-22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(45)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                   
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.hook_cooldown=0
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(-135)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh-16)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       this.atack_cooldown=1
                                                       this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_5'});
                                                       this.body.setVelocity(247,-247)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                       
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               });
                           }
                           if (kier=="DOWN-RIGHT") //DOWN-RIGHT
                           {
                               hak=this.scene.physics.add.sprite((this.x+25)+22*n,(this.y+35)+22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(135)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                   
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.hook_cooldown=0
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.body.setVelocity(0,0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(-45)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh-16)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       this.atack_cooldown=1
                                                       this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_4'});
                                                       this.body.setVelocity(247,247)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                       
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               });
                           }
                           if (kier=="DOWN-LEFT") //DOWN-LEFT
                           {
                               hak=this.scene.physics.add.sprite((this.x-25)-22*n,(this.y+35)+22*n, 'lancuch',  3,{angle: 0}).play({ key: 'lancuch_head', repeat: 0 }).setDepth(10000);
                               hak.rotation=Phaser.Math.DegToRad(-135)
                               lancuchg.add(hak);
                               this.scene.time.removeEvent(this.troz);
                               this.scene.time.removeEvent(this.tz1);
                               var zw1=0
                               this.tz=this.scene.time.addEvent({ delay:95, callback: ()=>{
                                   
                                       if(lancuchg.countActive()<=0){
                                           this.body.checkCollision.none = false;
                                           this.hook_cooldown=0
                                           this.atack_cooldown=0
                                           this.blocked=0
                                           this.body.setVelocity(0, 0);
                                           lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(2000, 2000);});
                                           this.scene.time.removeEvent(this.tz);
                                           this.scene.time.removeEvent(this.tz1);
                                           this.scene.time.removeEvent(this.tz2);
                                       }else{
                                           var lo=lancuchg.getFirst(true)
                                           lo.rotation=Phaser.Math.DegToRad(45)
                                           lo.play({ key: 'lancuchr', repeat: 0 })
                                           var xh=hak.x;
                                           var yh=hak.y;
                                           if (this.scene.layer5.getTileAtWorldXY(xh,yh)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh+16)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh-16,yh-16)==null&&this.scene.layer5.getTileAtWorldXY(xh+16,yh+16)==null&&zw1==0&&xh>=0&&yh>=0&&xh<=3200&&yh<=3200){
                                               this.scene.time.removeEvent(this.tz2);
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       this.atack_cooldown=1
                                                       this.blocked=1
                                                       this.body.checkCollision.none = true;
                                                       this.getByName('Player').play({key:'idle_7'});
                                                       this.body.setVelocity(-247,247)
                                                       lancuchg.getChildren().forEach((lancuch)=>{lancuch.setMaxVelocity(0, 0);});
                                                       
                                                   }
                                                   lo.destroy();
                                               });
                                           }else{
                                               zw1=1
                                               
                                               this.scene.time.delayedCall(40, ()=>{
                                                   if(lancuchg.countActive()>0){
                                                       lancuchg.shiftPosition(0, -32, 1);
                                                   }
                                                   lo.destroy(); 
                                               });
                                               
                                           }
                                       }
                                   
                               }, callbackScope: this ,
                               loop: true,
                               }); 
                           }
                       }
                    }  
                       }
           
        }) 
    }
    update ()
    {
        const keys=this.scene.keys
        
        if(this.blocked==0)
        {
            this.body.setVelocityX(keys.A.isDown ? -this.normal_velocity : keys.D.isDown ? this.normal_velocity : 0)
            this.body.setVelocityY(keys.W.isDown ? -this.normal_velocity : keys.S.isDown ? this.normal_velocity : 0)
            if (this.body.velocity.x>0 && this.body.velocity.y==0)
           {
            (this.getByName('Player')).anims.play({key:'right'},true)
           }
           else if (this.body.velocity.x<0 && this.body.velocity.y==0)
           {
            (this.getByName('Player')).anims.play({key:'left'},true)   
           }
           if (this.body.velocity.y>0 && this.body.velocity.x==0)
           {
            (this.getByName('Player')).anims.play({key:'down'},true)
           }
           else if (this.body.velocity.y<0 && this.body.velocity.x==0)
           {
            (this.getByName('Player')).anims.play({key:'up'},true)   
           } 
           if (this.body.velocity.x>0 && this.body.velocity.y>0)
           {
               this.body.setVelocityX(this.diagonal_velocity)
               this.body.setVelocityY(this.diagonal_velocity)
               this.getByName('Player').anims.play({key:"right-down"},true)
           }
           if (this.body.velocity.x<0 && this.body.velocity.y<0)
           {
                this.body.setVelocityX(-this.diagonal_velocity)
                this.body.setVelocityY(-this.diagonal_velocity)
               this.getByName('Player').anims.play({key:"left-up"},true)
           }
           if (this.body.velocity.x<0 && this.body.velocity.y>0)
           {
            this.body.setVelocityX(-this.diagonal_velocity)
            this.body.setVelocityY(this.diagonal_velocity)
            this.getByName('Player').anims.play({key:"left-down"},true)
           }
           if (this.body.velocity.x>0 && this.body.velocity.y<0)
           {
            this.body.setVelocityX(this.diagonal_velocity)
            this.body.setVelocityY(-this.diagonal_velocity)
            this.getByName('Player').anims.play({key:"right-up"},true)
           }
           if (this.body.velocity.x==0 && this.body.velocity.y==0)
           {
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(112.5))
            {
                this.getByName('Player').anims.play('idle_1'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=112.5)
            {
               this.getByName('Player').anims.play('idle_2'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=157.5)
            {
               this.getByName('Player').anims.play('idle_3'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(157.5))
            {
               this.getByName('Player').anims.play('idle_4'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<157.5)
            {
               this.getByName('Player').anims.play('idle_5'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=-(22.5))
            {
               this.getByName('Player').anims.play('idle_6'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(67.5))
            {
               this.getByName('Player').anims.play('idle_7'); 
            }
            if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=67.5)
            {
               this.getByName('Player').anims.play('idle_8'); 
            }
           }
        }
        
    }  
}