export class Naked_Player extends Phaser.GameObjects.Container
{
    constructor (scene,x,y)
    {
        super (scene,x,y,
            [
                scene.add.sprite(0,0,'ncoreman').setName('Player'),    
            ])
        this.width=this.getByName("Player").width
        this.height=this.getByName("Player").height
        this.normal_velocity=120
        this.diagonal_velocity=84
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.collideWorldBounds=true
        this.body.onWorldBounds=true
    }
    update ()
    {
        const keys=this.scene.keys
        this.body.setVelocityX(keys.A.isDown ? -this.normal_velocity : keys.D.isDown ? this.normal_velocity : 0)
        this.body.setVelocityY(keys.W.isDown ? -this.normal_velocity : keys.S.isDown ? this.normal_velocity : 0)
        if (this.body.velocity.x>0 && this.body.velocity.y==0)
       {
        (this.getByName('Player')).anims.play({key:'nprawo'},true)
       }
       else if (this.body.velocity.x<0 && this.body.velocity.y==0)
       {
        (this.getByName('Player')).anims.play({key:'nlewo'},true)   
       }
       if (this.body.velocity.y>0 && this.body.velocity.x==0)
       {
        (this.getByName('Player')).anims.play({key:'ndol'},true)
       }
       else if (this.body.velocity.y<0 && this.body.velocity.x==0)
       {
        (this.getByName('Player')).anims.play({key:'ngora'},true)   
       } 
       if (this.body.velocity.x>0 && this.body.velocity.y>0)
       {
           this.body.setVelocityX(this.diagonal_velocity)
           this.body.setVelocityY(this.diagonal_velocity)
           this.getByName('Player').anims.play({key:"nskos_frontP"},true)
       }
       if (this.body.velocity.x<0 && this.body.velocity.y<0)
       {
            this.body.setVelocityX(-this.diagonal_velocity)
            this.body.setVelocityY(-this.diagonal_velocity)
           this.getByName('Player').anims.play({key:"nskos_tylL"},true)
       }
       if (this.body.velocity.x<0 && this.body.velocity.y>0)
       {
        this.body.setVelocityX(-this.diagonal_velocity)
        this.body.setVelocityY(this.diagonal_velocity)
        this.getByName('Player').anims.play({key:"nskos_frontL"},true)
       }
       if (this.body.velocity.x>0 && this.body.velocity.y<0)
       {
        this.body.setVelocityX(this.diagonal_velocity)
        this.body.setVelocityY(-this.diagonal_velocity)
        this.getByName('Player').anims.play({key:"nskos_tylP"},true)
       }
       if (this.body.velocity.x==0 && this.body.velocity.y==0)
       {
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(67.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(112.5))
        {
            this.getByName('Player').anims.play('nidle1'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>67.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=112.5)
        {
           this.getByName('Player').anims.play('nidle2'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(157.5) || Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=157.5)
        {
           this.getByName('Player').anims.play('nidle3'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=-(112.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(157.5))
        {
           this.getByName('Player').anims.play('nidle4'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>112.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<157.5)
        {
           this.getByName('Player').anims.play('nidle5'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=22.5 && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>=-(22.5))
        {
           this.getByName('Player').anims.play('nidle6'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<-(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>-(67.5))
        {
           this.getByName('Player').anims.play('nidle7'); 
        }
        if (Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))>(22.5) && Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.scene.pointer.worldX,this.scene.pointer.worldY,this.x,this.y))<=67.5)
        {
           this.getByName('Player').anims.play('nidle8'); 
        }
       }
    }
   
}