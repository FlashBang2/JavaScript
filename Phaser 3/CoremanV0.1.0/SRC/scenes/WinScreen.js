/** @type {import("../phaser/phaser")} */
var End1
var mus
var fstime
export class Scene7 extends Phaser.Scene
{
    constructor()
    {
        super
        ({
            key: 'Scene7'
        });
        fstime=0
    }
    init(data)
    {
        mus=data.mus
    }
    create ()
        {
            End1=this.add.sprite(500,250,'End','');
            var glich=this.time.addEvent({ delay:5000, callback: ()=>
            {
               End1.play({key:"koniec", repeat:0})
               if (fstime==0)
               {
                    fstime=1
                    this.scene.input.on('pointerdown',()=>
                    {
                        glich.destroy()
                        End1.destroy()
                        End1=this.add.sprite(500,120,'Dos','');
                        End1.play({key:"Start", repeat:28})
                        this.time.delayedCall(5000, ()=>{ 
                            End1.play({key:"credits", repeat:0})
                        })
                        this.time.delayedCall(6260, ()=>{ 
                            End1.play({key:"hold", repeat:-1})
                        })
                        this.time.delayedCall(7000, ()=>{ 
                       this.scene.stop("Scene7")
                       this.scene.start("Scene8",{mus:mus})
                        })
                    })
               }
            }, callbackScope: this ,
            loop: true,
            })
        }
}
