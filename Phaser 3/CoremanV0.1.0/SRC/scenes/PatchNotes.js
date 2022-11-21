export class Scene1 extends Phaser.Scene
{
    

    constructor ()
    {
        super 
        ({
            key:'Scene1', 
        })   
    }
    
    preload() { 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }
    
    create ()
    {
            var scrollablePanel = this.rexUI.add.scrollablePanel({
                x: 400,
                y: 275,
                width: 300,
                height: 500,
    
                scrollMode: 0,
    
                background: this.add.image( 100,100,'backgrounds'),
    
                panel: {
                    child: this.add.image(480,490,'button').setInteractive(this.input.makePixelPerfect()).setName('buttonpatch'),
                    child: this.rexUI.add.fixWidthSizer({
                        space: {
                            left: 3,
                            right: 3,
                            top: 3,
                            bottom: 3,
                            item: 8,
                            line: 10,
                        }
                    }),
    
                    mask: {
                        padding: 1
                    },
                },
    
                slider: 
                {
                    track:this.add.image(50,50,"scrollbarx"),
                    thumb:this.add.image(50,50,"scrollbarx"),
                },
                mouseWheelScroller:
                {
                    focus: true
                },
                space: {
                    left: 8,
                    right: 8,
                    top: 10,
                    bottom: 71,
    
                    panel: 10,
                }
            })
                .layout()
            var content = `02.02.2022             -FIXED KEY HINT NOT APPEARING AFTER CUTSCENE SKIPPED   30.01.2022           -ADDED 360 DEGREE BOW ATTACKS           -REWORKED CONTROLS     27.01.2022             -NEW THEME MUSIC INTRODUCE TO EUROPE -FIXED GLITCH WITH EUROPE MUSIC 26.01.2022            -ADDED THEME MUSIC EUROPE                  -ADDED INDICATOR OF SLOWNESS              -FIXED HEART DROP AND ITEMS DROPS     24.01.2022         -FIXED TREEMAN TRAP GLITCH WHICH ALLOWED ESCAPE BOUNDRIES 23.01.2022           -FIXED CREDITS BUG      -FIXED ASIA PORTAL BUG AFTER LOADED GAME    -EQUALIZED HOOK VELOCITY            -FIXED TREEMAN BUGS     -FIXED ALL BONE VANISHING PLUS RANGE ON DEVIL SKELETON UPDATED 22.01.2022         -ADDED DATE TO SAVE  -REWORKED MONSTERS SPAWN IN ASIA AND EUROPE AND INCREASED THEIR NUMBERS ALSO REWORKED ITEMS       -FIXED HOOK BUGS  -ADDED MORE ITEMS  -NERF TO SPEED       -ASIA SKELETON ABILITY HAVE BEEN ADDED      21.01.2022          -ADDED CREDITS        -ADDED EFFECT FOR PLANTS                 -ADDED VARIOUS TIME FOR TREEMAN ABILITY SO THEY WILL NO LONGER PLANT IN SYNC                   -FIXED CONDITION FOR PORTAL IN ASIA TO SPAWN -ADDED SOUND AND CAMERA SHAKE WHEN TAKING DAMAGE               -FIXED GRAPHICAL ISSUES WITH SLIMES AND TREEMAN BEING ON TOP OF THE HOUSE       -REWORKED SAVE FILES  -ADDED GENERIC LOADING SCREEN          20.01.2022            -FIXED MAP AND MENU BLINKING WHILE HOLDING CORRESPONDING KEY      19.01.2022         -FIXED HP BUG AFTER DEATH                   -FIXED SAVE IN HOUSE  -FIXED MILK GAME FREEZE 17.01.2022           -FIXED ASIA BUG WHICH ALLOWS PLAYER TO LEAVE MAP             15.01.2022         -FIXED BUG WITH NEW GAME BEING STUCK     -PROJECTILES NOW HAVE UNIFIED VELOCITY -BARBARIAN NOW HITS HARDER                  -FIXED HOOK BUG IN ASIA 14.01.2022          -SAVE FIXES           -ROAD IS BACK ON THE MAP                    -ADDED MONSTERS ICON TO MAP               -REDESING OF HOUSE       -GOBLIN HITBOX FIX  -ADDED BOW          -HEART DROP FIXED    -ASIA MINIMAP UPDATE  -TREEMAN PLANTS TRAPS  -POINTS ARE NOW CALCULATED PROPERLY   13.01.2022         -FIXED MINIMAP ORIENTED ISSUE WITH HALF BEING BLACK SCREEN -FIXED ESC EXIT BUG  -FIXED TAB ORIENTED ISSUE                -ADDED MAP BORDER + BUTTONS TO ZOOM IN AND ZOOM OUT MINIMAP       -GOBLIN ANIMATION REWORK         12.01.2022       -SPAMING WILL NOT HELP YOU ANYMORE           -HOOK FIXES      -BACKGROUND SCENE4 FIXES                -SLIME CAN'T KILL YOU WHEN THEY ARE DYING     -FIXED MENU ORIENTED BUGS                     -FIXED SAVE FILES -ADDED MINIMAP TO ASIA -SMOOTHED OUT CAMERA WORK                 -ADDED MAP TO SHOW WHERE MONSTERS ARE IN EUROPE         11.01.2022              -NEW MENU              -FIXED BUG WHEN STARTING NEW GAME CHARACTER WAS UNABLE TO MOVE                    -FIXED IMMORTAL BUG WHEN USING HOOK ON LAST HP                    -ADDED SLIME VISIBLE DAMAGE TAKEN           10.01.2022                 -FIXED RARE BUG OF GAME BEING PAUSE         -ADDED SAVE FILES       -FIXED BUG WHERE YOU COULD MOVE CHARACTER AND OPEN ESC MENU BEFORE PROMPT APPEAR    -GOBLIN ORIENTED FIXES -ADDED SKELETON BONE THROW ANIMATION    -ADDED ASIA MONSTERS MOVEMENT AND DAMAGE RECEIVE              -ADDED WIN             -SOME PORTAL FIXES 09.01.2022          -FIXED HOOK NOW WORKS IN ASIA                -FIXED BONE, ARROWS, ATACK, HOOK RENDER UNDER ROAD         -GOBLIN NOW MOVE TOWARDS PLAYER AND ATACK HIM         -CHANGED HOUSE      -MOBS RESET AFTER PLAYER HAVE DIED AND POINTS ARE SET BACK TO ZERO                       -ADDED MOBS IN ASIA  -ADDED SPACE TO ASIA  -ADDED PORTAL TO STARTING LOCATION OF ASIA                        07.01.2022            -ADDED SCROLLBAR TO PATCH NOTES        -ADDED CHANCE FOR HEART TO DROP FROM ENEMIES -HEART ON PICKING UP RESTORE HEALTH     -FIXED TREEMAN HITBOX -FIXED MONSTER AND PROJECTILE DISAPPEAR WHEN MENU WAS ENTERED TO LOADING OR OPITONS SCREEN               -ADDED MONSTER 3D EFFECT            -TWEAKED PLAYER AND MONSTERS HITBOX   -ADDED COLLISION WITH OBJECTS        -INCREASED NUMBER OF MONSTER NEEDED TO PROGRESS TO NEXT BIOM  -FIXED BUGS WITH HOOK -ADDED ASIA    -REWORKED PROMPTS -FIXED CARPET GLITCH -REWORKED EUROPE MAP   06.01.2022             -ADDED IDLE FRAME BEFORE THROWING BONE  -ADDED SPACE       -ADDED PATCH NOTES -TWEAKED MOVMENT FOR AI -ADDED TREEMAN     -ADDED COLLISION TO MONSTERS              -FIXED 3 and 4 PRESSED BUTTON ISSUE          -ADDED NEW TILES        -ADDED NEW ANIMATIONS`;
            this.updatePanel(scrollablePanel, content);

        this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer,gameObject)=>
        {
            if (pointer.leftButtonDown() && gameObject.name=="buttonpatch")
            {
               this.scene.stop('Scene1')
               this.scene.resume('Scene2')   
            }
        })
    }
    updatePanel (panel, content) 
    {
        var sizer = panel.getElement('panel');
        var scene = panel.scene;
    
        sizer.clear(true);
        var lines = content.split('\n');
        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var words = lines[li].split(' ');
            for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
                sizer.add(
                    scene.add.text(0, 0, words[wi], {
                        fontSize: 18
                    })
                );
            }
            if (li < (lcnt - 1)) {
                sizer.addNewLine();
            }
        }
        panel.layout();
        return panel;
    }
    
        
}

    
