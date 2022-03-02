class Worker {
	static sprite; //class variable to hold image object used when drawing worker
	constructor(ctx,x,y,dx,dy)
	{
		
		this.ctx = ctx;
		this.x = x;
		this.y=y;
		this.dx=dx;
		this.dy =dy;
		this.width = 48;
		this.height = 48;
		this.isColliding = false;
		this.loaded = false;
		this.loadSprite();
		this.level = 1;
		this.name = "worker";
		this.employTime = oldTimeStamp;
		this.employmentRoll;
		this.baseRate = 0;
		this.mineRate;
	}
	load() {
		this.loaded = true;
		
	}
	loadSprite()
	{
		if(!Worker.sprite){ //if sprite is not assigned, load sprite image.
		Worker.sprite = new Image();
		Worker.sprite.onload = this.load();//wait for image to image loaded
			
		Worker.sprite.src ='worker.png';
		}
	}

	draw()
	{
		//console.log("draw befosre load");
		
		this.ctx.drawImage(Worker.sprite, this.x,this.y,this.width, this.height);
		
		
		}
	
   getX()
   {
   	return this.x;
		
	}
	
	update()
	{
					
		if((oldTimeStamp - this.employTime)/1000>30)
			{this.employTime = oldTimeStamp;
					for(let i =0; i<workers.length; i++)
				{
					//console.log("CHECKPOINT");
					if(this === workers[i])
					{
						this.employmentRoll = Math.floor((Math.random()*100))+1;

						//console.log(this.employmentRoll);
						if(this.employmentRoll<=30)
						{
							//console.log(this.employmentRoll);
							workers[i] = new Miner(this.ctx, this.x, this.y, 0, 0);
						}
						else if(this.employmentRoll>30 && this.employmentRoll<=50)
						{
							workers[i] = new ConstructionWorker(this.ctx, this.x, this.y, 0, 0);
						}

						else if(this.employmentRoll>50 && this.employmentRoll<=60)
						{
							workers[i] = new Soldier(this.ctx, this.x, this.y, 0, 0);
						}
						else if(this.employmentRoll>60 && this.employmentRoll<=65)
						{
							workers[i] = new Coder(this.ctx, this.x, this.y, 0, 0);
						}
							else if(this.employmentRoll>65 && this.employmentRoll<=67)
						{
							workers[i] = new Pirate(this.ctx, this.x, this.y, 0, 0);
						}
						
						else if (this.employmentRoll == 100)
						{
							workers[i] = new Sorcerer(this.ctx, this.x, this.y, 0, 0);
						}

					}
				}
			}
			}
	

	drawNameBox()
	{
		//ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.font = '16px courier';
        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name , this.x+(this.width/2),this.y-48);
        ctx.fillText("level:" + this.level, this.x+(this.width/2),this.y-32 )
        ctx.fillText("wc/s:" + this.mineRate, this.x+(this.width/2),this.y-16 )
        //ctx.closePath();
    }	
  mine(){
  	this.mineRate = this.baseRate*(Math.pow(1+0.03*this.level,this.level-1));
  	return this.mineRate;
  }

}


  class Sorcerer extends Worker 
   {
   	static sorcSprite;
   	static energyOrbSprite;

   	constructor (ctx,x,y,dx,dy)
   	{
   	super(ctx, x, y, dx, dy);
   	this.degrees =0;
   	this.rotation = 0;
   	this.orbWidth = 20;
   	this.orbHeight = 20;
   	this.rotationSpeed = (Math.random()*80+40);
   	this.name = "sorcerer";
   	this.baseRate= 10;
   

    }

   	loadSprite()
	{
		if(!Sorcerer.sorcSprite){ //if sprite is not assigned, load sprite image.
		Sorcerer.sorcSprite = new Image();
		Sorcerer.sorcSprite.onload = this.load();
		Sorcerer.sorcSprite.src ='sorcerer.png';
		}
		if(!Sorcerer.energyOrbSprite)
		{
		Sorcerer.energyOrbSprite = new Image();
		Sorcerer.energyOrbSprite.onload = this.load();
		Sorcerer.energyOrbSprite.src ='energyOrb.png';

		}
		}
	

	draw()
	{
		
		this.ctx.drawImage(Sorcerer.sorcSprite, this.x, this.y, this.width, this.height);
		this.ctx.translate(this.x+24, this.y+24);
		//ctx.beginPath();
		
		//debug
		/*this.ctx.arc(0,0,2, 0, 2*Math.PI)
		this.ctx.stroke();*/

		//this.ctx.closePath();
		this.ctx.rotate(this.rotation);
		ctx.translate(50, 50);
		this.ctx.rotate(-this.rotation);
		this.ctx.drawImage(Sorcerer.energyOrbSprite, -10 , -10 ,this.orbWidth, this.orbHeight);
		this.ctx.rotate(this.rotation);
		ctx.translate(-50, -50);
		this.ctx.rotate(-this.rotation);
		this.ctx.translate(-this.x-24,-this.y-24);


	}

	update()
	{
		this.degrees += secondsPassed * this.rotationSpeed;
		this.rotation = this.degrees * Math.PI/180;
		//console.log("UPDATE!!!!!!");

	}

   }

    class Miner extends Worker 
   {
   	static minerSprite;

   	constructor (ctx,x,y,dx,dy)
   	{
   	super(ctx, x, y, dx, dy);
   	this.name = "miner";
   	this.baseRate = 1;
  

    }

   	loadSprite()
	{
		if(!Miner.minerSprite){ //if sprite is not assigned, load sprite image.
		Miner.minerSprite = new Image();
		Miner.minerSprite.onload = this.load();
		Miner.minerSprite.src ='miner.png';
		}
		
		}
	

	draw()
	{
		
		this.ctx.drawImage(Miner.minerSprite, this.x, this.y, this.width, this.height);
		


	}

	update()
	{
		
	}

   }


 class ConstructionWorker extends Worker 
   {
   	static constructionSprite;

   	constructor (ctx,x,y,dx,dy)
   	{
   	super(ctx, x, y, dx, dy);
   	this.name = "construction worker";
  	this.baseRate =2;

    }

   	loadSprite()
	{
		if(!ConstructionWorker.constructionSprite){ //if sprite is not assigned, load sprite image.
		ConstructionWorker.constructionSprite = new Image();
		ConstructionWorker.constructionSprite.onload = this.load();
		ConstructionWorker.constructionSprite.src ='constructionWorker.png';
		}
		
		}
	

	draw()
	{
		
		this.ctx.drawImage(ConstructionWorker.constructionSprite, this.x, this.y, this.width, this.height);
		


	}

	update()
	{
		

	}

   }

    class Soldier extends Worker 
   {
   	static soldierSprite;

   	constructor (ctx,x,y,dx,dy)
   	{
   	super(ctx, x, y, dx, dy);
   	this.name = "soldier";
   	this.baseRate =3;

    }

   	loadSprite()
	{
		if(!Soldier.constructionSprite){ //if sprite is not assigned, load sprite image.
		Soldier.soldierSprite = new Image();
		Soldier.soldierSprite.onload = this.load();
		Soldier.soldierSprite.src ='soldier.png';
		}
		
		}
	

	draw()
	{
		
		this.ctx.drawImage(Soldier.soldierSprite, this.x, this.y, this.width, this.height);
		


	}

	update()
	{
		

	}

   }


   class Coder extends Worker 
   {
   	static coderSprite;

   	constructor (ctx,x,y,dx,dy)
   	{
   	super(ctx, x, y, dx, dy);
   	this.name = "coder";
  	this.baseRate =5;

    }

   	loadSprite()
	{
		if(!Coder.coderSprite){ //if sprite is not assigned, load sprite image.
		Coder.coderSprite = new Image();
		Coder.coderSprite.onload = this.load();
		Coder.coderSprite.src ='coder.png';
		}
		
		}
	

	draw()
	{
		
		this.ctx.drawImage(Coder.coderSprite, this.x, this.y, this.width, this.height);
		


	}

	update()
	{
		

	}

   }
   class Pirate extends Worker 
   {
   	static pirateSprite;

   	constructor (ctx,x,y,dx,dy)
   	{
   	super(ctx, x, y, dx, dy);
   	this.name = "pirate";
  	this.baseRate = 7;

    }

   	loadSprite()
	{
		if(!Pirate.pirateSprite){ //if sprite is not assigned, load sprite image.
		Pirate.pirateSprite = new Image();
		Pirate.pirateSprite.onload = this.load();
		Pirate.pirateSprite.src ='pirate.png';
		}
		
		}
	

	draw()
	{
		
		this.ctx.drawImage(Pirate.pirateSprite, this.x, this.y, this.width, this.height);
		


	}

	update()
	{
		

	}

   }