(function (scope) {
    var jdge = scope.jdge || {};
    jdge._JD_DEBUG_ = false;

    jdge.IsUndefined = function (object) {
        return typeof object === 'undefined' || object == null;
    }


    // returns null if the hash provided is undefined or the name provided is anything but a string
    jdge.hashPush = function (hash, name, value) {
        if (jdge.IsUndefined(hash) || typeof name !== 'string') {
            return null;
        }

        if (hash.indexOf(name) == -1) {
            hash.push(name);
        }

        hash[name] = value;

        return hash;
    }

    // generates a Props variable hash and enables adding and referencing the hash.
    // Returns the Props variable.
    jdge.Property = function (name, value) {
        if (this.Props === undefined) {
            this.Props = [];
        }

        return jdge.hashPush(Props, name, value);
    }

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
        this.FrameCollections = [];

        this.Property = jdge.Property;
        
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
        
        
        // open's frameCollection named, brings it to front, and returns collection for chaining.
        this.open = function (name) {

            var openCollection = null;

            if (jdge.IsUndefined(name)) {
                var l = $this.FrameCollections.length - 1;
                openCollection = $this.FrameCollections[l];
            }
        }
		

        this.addNewCollection = function (collectionName) {

            $.error('JDGE: Engine: Initialization error 0001 - FrameCollection initialized without a starting frame');
        }
		
        this.on('tick', function () {

		});

        this.Stage.addChild(this);
        this.super_addchild = this.addChild;
    }

    /*********************************************************************************************
          Engine Construct for Frames and States, since these two contain similar functionality.
    *********************************************************************************************/
    jdge.FrameCollection = function(name) {
        this.initialize(name);
    }

    var p = jdge.FrameCollection.prototype = new createjs.Container();
    jdge.FrameCollection.prototype.inherited_init = jdge.FrameCollection.initialize;
    
    p.initialize = function (name) {
        if (this.inherited_init) this.inherited_init();

        var $this = this;
        this.Frames = [];

        this.level = 0;

        this.runningFrame = null;
        this.nextFrame = null;
        this.isPaused = false;
        this.runningTransition = false;

        // loads a state into the state hash, for safe keeping.
        this.addFrame = function (name, frame) {
            if (frame instanceof jdge.Frame) {
                frame.Engine = $this;
                
                jdge.hashPush($this.Frames, name, frame);
            }
            else if (typeof frame === "function") {
                var newFrame = new jdge.Frame(frame);
                newFrame.Engine = $this;

                jdge.hashPush($this.Frames, name, newFrame);
            }
        }

        // moves the currently running state to the one being named.
        this.gotoFrame = function (name) {
            if ($this.Frames[name] && !$this.nextFrame) {
                $this.nextFrame = $this.Frames[name];
                $this.isPaused = true;
                $this.addChild($this.nextFrame);
            }
        }

        this.RunCollection = function () {
            if ($this.nextFrame) {
                if (!$this.runningTransition) {
                    $this.runningFrame.transitionOut
                    $this.nextFrame.transitionIn().call(function () {
                        $this.remove$this.runningFrame);
                        $this.nextFrame
                    }, null, $this);
                }
            }
            else if ($this.runningFrame) {
                if (!$this.isPaused) {
                    $this.runningFrame.update();
                }
            }
        }
        
    }

/*********************************************************************************************
        Frame Constructor
*********************************************************************************************/
    jdge.FrameTransitions = {

        // Transitions meant for making Frames appear
        ins: {
            Fade: function () {
                this.alpha = 0;
                this._Tween.to({ alpha: 1 }, this.TransitionInDuration);
                return this._Tween;
            }
        },

        // Transitions meant for making Frames disappear
        outs: {
            Fade: function () {
                this.alpha = 1;
                this._Tween.to({ alpha: 0 }, this.TransitionOutDuration);
                return this._Tween;
            }
        }
    }

    jdge.Frame = function(initializer){
         this.initialize(initializer);
    }
    
    var p = jdge.Frame.prototype = new createjs.Container();
    jdge.Frame.prototype.inherited_init = p.initialize;
    
    jdge.Frame.prototype.initialize = function (initializer) {
        if (this.inherited_init) this.inherited_init();

        var $this = this;
        this.Engine = null;
        this._Tween = createjs.Tween.get(this);

        this.transitionIn = jdge.FrameTransitions.in.Fade;
        this.transitionInDuration = 1000;

        this.transitionOut = jdge.FrameTransitions.out.Fade;
        this.transitionOutDuration = 1000;

        this.asset = function (name) {
            debugger;
            if ($this.Engine) {
                $this.Engine.getAsset(name);
            }
        }


        //Called immidiately before running enterTansition
        this.enter = function () { };

        //Called on every tick
        this.update = function () { };

        //Called immidiately after running exitTransition
        this.exit = function () { };

        if (typeof initializer === 'function') {
            initializer.call(this);
        }
    }
    
    scope.jdge = jdge;
}(window));