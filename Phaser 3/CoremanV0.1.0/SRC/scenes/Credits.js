var omg
var me
var graphics
var Asia
var me2
var coding
var me3
var Urban
var Animation
var Asia2
var scenario
var me4
var music
var me5
var Asia3
var dubbing
var me6
var soundeffects
var Urban2
var me7
var TESTERS
var me8
var Bog
var Asia4
var Urban3
var leveldesign
var me9
var Urban4
var sorces
var sorces1
var sorces2
var THANKS
var musnap
var mus
export class Scene8 extends Phaser.Scene
{
    constructor ()
    {
        super ({
            key:"Scene8",
        })
    }
    init(data)
    {
        mus=data.mus
    }
    create ()
    {
        musnap=this.sound.add('napismuz',{volume: mus});
        musnap.play();
        this.input.on('pointerdown',()=>
        {
            musnap.stop();
            this.scene.start("Scene2",{origin:"Scene5"})
        })
       this.add.image(1400,300,'menu').setScale(0.75);
       omg=this.add.bitmapText(373,500,'atari-classic','LEAD DESIGNER').setDepth(1000)
       me=this.add.bitmapText(373,530,'atari-classic','Gajos Kamil').setDepth(1000)
       graphics=this.add.bitmapText(373,630,'atari-classic','GRAPHIC DESIGN').setDepth(1000)
       Asia=this.add.bitmapText(373,660,'atari-classic','Pawelec Joanna').setDepth(1000)
       me2=this.add.bitmapText(373,690,'atari-classic','Gajos Kamil').setDepth(1000)
       coding=this.add.bitmapText(373,790,'atari-classic','CODING').setDepth(1000)
       me3=this.add.bitmapText(373,820,'atari-classic','Gajos Kamil').setDepth(1000)
       Urban=this.add.bitmapText(373,850,'atari-classic','Urbanski Konrad').setDepth(1000)
       Animation=this.add.bitmapText(373,950,'atari-classic','ANIMATIONS').setDepth(1000)
       Asia2=this.add.bitmapText(373,980,'atari-classic','Pawelec Joanna').setDepth(1000)
       scenario=this.add.bitmapText(373,1080,'atari-classic','SCENARIO').setDepth(1000)
       me4=this.add.bitmapText(373,1110,'atari-classic','Gajos Kamil').setDepth(1000)
       music=this.add.bitmapText(373,1210,'atari-classic','MUSIC').setDepth(1000)
       me5=this.add.bitmapText(373,1240,'atari-classic','Gajos Kamil').setDepth(1000)
       Asia3=this.add.bitmapText(373,1270,'atari-classic','Pawelec Joanna').setDepth(1000)
       dubbing=this.add.bitmapText(373,1370,'atari-classic','DUBBING').setDepth(1000)
       me6=this.add.bitmapText(373,1400,'atari-classic','Gajos Kamil').setDepth(1000)
       soundeffects=this.add.bitmapText(373,1500,"atari-classic","SOUNDEFFECTS").setDepth(1000)
       Urban2=this.add.bitmapText(373,1530,'atari-classic',"Urbanski Konrad").setDepth(1000)
       me7=this.add.bitmapText(373,1560,'atari-classic','Gajos Kamil').setDepth(1000)
       TESTERS=this.add.bitmapText(373,1660,'atari-classic','TESTERS').setDepth(1000)
       me8=this.add.bitmapText(373,1690,'atari-classic','Gajos Kamil').setDepth(1000)
       Bog=this.add.bitmapText(373,1720,'atari-classic','Bogusz Dominik').setDepth(1000)
       Asia4=this.add.bitmapText(373,1750,'atari-classic','Pawelec Joanna').setDepth(1000)
       Urban3=this.add.bitmapText(373,1780,'atari-classic','Urbanski Konrad').setDepth(1000)
       leveldesign=this.add.bitmapText(373,1880,'atari-classic','LEVEL DESIGN').setDepth(1000)
       me9=this.add.bitmapText(373,1910,'atari-classic','Gajos Kamil').setDepth(1000)
       Urban4=this.add.bitmapText(373,1940,'atari-classic','Urbanski Konrad').setDepth(1000)
       sorces=this.add.bitmapText(373,2040,'atari-classic','SOURCES').setDepth(1000)
       sorces1=this.add.bitmapText(373,2070,'atari-classic','mixkit.co Free Fire Sound Effects' ).setDepth(1000)
       sorces2=this.add.bitmapText(373,2100,'atari-classic','Pixeled by OmegaPC777' ).setDepth(1000)
       THANKS=this.add.bitmapText(50,2700,'atari-classic','AND THANKS EVERYONE ELSE FOR TESTING PLUS SHARING OUR GAME').setDepth(1000)
    }
    update ()
    {
        omg.y-=0.3
        me.y-=0.3
        graphics.y-=0.3
        Asia.y-=0.3
        me2.y-=0.3
        coding.y-=0.3
        me3.y-=0.3
        Urban.y-=0.3
        Animation.y-=0.3
        Asia2.y-=0.3
        scenario.y-=0.3
        me4.y-=0.3
        music.y-=0.3
        me5.y-=0.3
        Asia3.y-=0.3
        dubbing.y-=0.3
        me6.y-=0.3
        soundeffects.y-=0.3
        Urban2.y-=0.3
        me7.y-=0.3
        TESTERS.y-=0.3
        me8.y-=0.3
        Bog.y-=0.3
        Asia4.y-=0.3
        Urban3.y-=0.3
        leveldesign.y-=0.3
        me9.y-=0.3
        Urban4.y-=0.3
        sorces.y-=0.3
        sorces1.y-=0.3
        sorces2.y-=0.3
        if (THANKS.y>175)
        {
            THANKS.y-=0.3
        }
    }
}