(function (scope) {
    var jdge = scope.jdge || {};
    jdge._JD_DEBUG_ = false;

    jdge.Stage = function (height, width, target) {
         this.initialize(height, width, target);
    }
    
    jdge.Stage.prototype.initialize = function (height, width, target) {
        this.canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.context = this.canvas.getContext("2d");
        
        if(target){
            $(target).append(this.canvas);
        }
        else {
            document.body.appendChild(this.canvas);        
        }
        
        this.stage = new createjs.Stage(this.canvas);
        this.stage.setBounds(0, 0, this.canvas.width, this.canvas.height);
        this.bounds = this.stage.getBounds();
		
        if(jdge._JD_DEBUG_) {
			var debugBox = new createjs.Shape();
			debugBox.graphics.s("#0000ff").r(this.x, this.y,this.bounds.width, this.bounds.height);
			this.stage.addChild(debugBox);
		}
    
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener('tick', this.stage);
		
        this.on = function(eventLabel, listener) {
            this.stage.on(eventLabel, listener);
        }

        this.addChild = function(child) {
            this.stage.addChild(child);
        }
        
    }

/*********************************************************************************************
        Engine Constructor
*********************************************************************************************/

    jdge.Engine = function(height, width, target){
         this.initialize(height, width, target);
    }

    var p = jdge.Engine.prototype = new createjs.Container();
    jdge.Engine.prototype.inherited_init = jdge.Engine.initialize;
    
    p.initialize = function (height, width, target) {
        if(this.inherited_init) this.inherited_init();
        
        var $this = this;
        
        this.Stage = new jdge.Stage(height, width, target);   
        this.setBounds(0, 0, this.Stage.bounds.width, this.Stage.bounds.height);
        this.bounds = this.getBounds();
        this.preloader = new createjs.LoadQueue();
        this.Assets = [];
        this.States = [];
        this.Frames = [];
        
        this.RunningState = null;    // the state which is displayed and ran while not paused.
        this.transState = null;      // the state to transition into.
        
        this.RunningFrame = null;    // the frame which will appear above the current state.
        this.transFrame = null;      // the frame to transition into.
        this.isPaused = false;
        this.Props = [];
        
        this.Property = function(name, value) { 
            if(!value) {
                return $this.Props[name];
            }
            
            if(typeof name === 'string') {
                if(!$this.Props[name]) {
                    $this.Props.push(name);
                }
                
                $this.Props[name] = value;
            }
        }
        
        this.preloader.on('fileload', function(target, type, item, result){
            debugger;
            //this.Assets.push
        });
        
        this.preloadAsset = function(name, source) {
            $this.preloader.loadFile({id: name, src: source}, false);
        }
        
        this.getAsset = function(name) {
            return $this.Assets[name];
        }
        
        // runs the preloader to initialize all the assests loaded in its buffer.
        this.runAssetLoad = function() {
            $this.preloader.load();
        }
        
        // loads a state into the state hash, for safe keeping.
        this.loadState = function (name, state) {            
            if(state instanceof jdge.State) {
                state.Engine = $this;
                if(!$this.States[name]) {
                    $this.States.push(name);
                    $this.States[name] = state;
                }
            }
        }
        
        // moves the currently running state to the one being named.
        this.gotoState = function(name) {
            if($this.States[name] && !$this.transState) {
                $this.transState = $this.States[name];
                $this.transState.alpha = 0;
                $this.isPaused = true;
                $this.addChild($this.transState);
            }
        }
        // loads a frame into the frame hash.
        this.loadFrame = function (name, state) {
            if(state instanceof jdge.State) {
                state.Engine = $this;
                if(!$this.Frames[name]) {
                    $this.Frames.push(name);
                    $this.Frames[name] = state;
                }
            }
        }
        
        // play game, starting from the named state.
        this.play = function (name) {
            if(name) {
                $this.gotoState(name);
            }
            else {
                $this.gotoState($this.States[0]);
            }
        }
		
        this.stateTransitions = {
			Fade: function(endState, startState) {
				if(endState.alpha < 1) {
                    endState.alpha += 0.05;
                    if(startState) {
                        startState.alpha = 1 - endState.alpha;
                    }
					return false;
				}
				
				return true;
			}
		}
		
		this.Transition = this.stateTransitions.Fade;
		
        this.on('tick', function(){
            if($this.transState) {
                if(this.Transition($this.transState, $this.RunningState)) {
                    $this.removeChild($this.RunningState);                
                    $this.RunningState = $this.transState;
                    $this.isPaused = false;
                    $this.transState = null;
                }
            }
            else if($this.RunningState) {
                if(!$this.isPaused) {
                    $this.RunningState.onTick();
                }
            }
        });
        this.Stage.addChild(this);
        this.super_addchild = this.addChild;
    }

/*********************************************************************************************
      Engine Construct for Frames and States, since these two contain similar functionality.
*********************************************************************************************/  
    jdge.EngineConstructContainer = function (initializer) {
        var $this = this;
        this.Engine = null;
        
        this.asset = function(name) {
            debugger;
            if(this.Engine) {
                this.Engine.getAsset(name);
            }
        }
        
        this.onTick = function(){

        }
        
        if(initializer && typeof initializer === 'function') {
            initializer.call(this);
        }
    }
 /*********************************************************************************************
        State Constructor
*********************************************************************************************/
    jdge.State = function(initializer){
         this.initialize(initializer);
    }
    
    var p = jdge.State.prototype = new createjs.Container();
    jdge.State.prototype.inherited_init = p.initialize;
    
    jdge.State.prototype.initialize = function (initializer) {
        if(this.inherited_init) this.inherited_init();
        jdge.EngineConstructContainer.call(this, initializer);        
        var $this = this;
    }
    
/*********************************************************************************************
        Frame Constructor
*********************************************************************************************/

    jdge.Frame = function(initializer){
         this.initialize(initializer);
    }
    
    var p = jdge.Frame.prototype = new createjs.Container();
    jdge.Frame.prototype.inherited_init = p.initialize;
    
    jdge.Frame.prototype.initialize = function (initializer) {
        if(this.inherited_init) this.inherited_init();
        jdge.EngineConstructContainer.call(this, initializer);        
        var $this = this;
    }
    
    scope.jdge = jdge;
}(window));