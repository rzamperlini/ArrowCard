
export class Arrow {

    public color;
    public borderColor;
    public thickness:number;
    
    private orientation:string;
    private value:number;

    private x1:number = 0;
    private x2:number = 0;
    private x3:number = 0;
    private x4:number = 0;
    private x5:number = 0;

    private y1:number = 0;
    private y2:number = 0;
    private y3:number = 0;
    private y4:number = 0;
    private y5:number = 0;

    private poly = "";

    constructor(){
        this.orientation = "V";
        this.value = 1;
        this.color = "green";
        this.borderColor = "black";
        this.thickness = 2;
    }

    public configArrow(space:number, width:number, height:number){

        width = Math.max(0,width);
        height = Math.max(0,height);
        space = Math.max(0,space);
        space = Math.min(space, width/2);
        space = Math.min(space, height/2)

        this.x1 = space;
        this.x2 = (width/4) + (space/2);
        this.x3 = width/2;
        this.x4 = (3*width/4) - (space/2);
        this.x5 = width - space;

        this.y1 = space;
        this.y2 = (height/4) + (space/2);
        this.y3 = height/2;
        this.y4 = (3*height/4) - (space/2);
        this.y5 = height - space;
    }

    public getArrowPoints()
    {
        let p1:string,
            p2:string,
            p3:string,
            p4:string,
            p5:string,
            p6:string,
            p7:string; 

        if(this.orientation == "V")
        {
            if(this.value >= 0)
            {
                p1 = ""+this.x3+","+this.y1+" ";
                p2 = ""+this.x5+","+this.y3+" ";
                p3 = ""+this.x4+","+this.y3+" ";
                p4 = ""+this.x4+","+this.y5+" ";
                p5 = ""+this.x2+","+this.y5+" ";
                p6 = ""+this.x2+","+this.y3+" ";
                p7 = ""+this.x1+","+this.y3;
            }
            else
            {
                p1 = ""+this.x3+","+this.y5+" ";
                p2 = ""+this.x1+","+this.y3+" ";
                p3 = ""+this.x2+","+this.y3+" ";
                p4 = ""+this.x2+","+this.y1+" ";
                p5 = ""+this.x4+","+this.y1+" ";
                p6 = ""+this.x4+","+this.y3+" ";
                p7 = ""+this.x5+","+this.y3;
            }
        }  
        else
        {
            if(this.value >= 0)
            {
                p1 = ""+this.x5+","+this.y3+" ";
                p2 = ""+this.x3+","+this.y5+" ";
                p3 = ""+this.x3+","+this.y4+" ";
                p4 = ""+this.x1+","+this.y4+" ";
                p5 = ""+this.x1+","+this.y2+" ";
                p6 = ""+this.x3+","+this.y2+" ";
                p7 = ""+this.x3+","+this.y1;
            }
            else
            {
                p1 = ""+this.x1+","+this.y3+" ";
                p2 = ""+this.x3+","+this.y1+" ";
                p3 = ""+this.x3+","+this.y2+" ";
                p4 = ""+this.x5+","+this.y2+" ";
                p5 = ""+this.x5+","+this.y4+" ";
                p6 = ""+this.x3+","+this.y4+" ";
                p7 = ""+this.x3+","+this.y5;
            }
        }     
        
        
        return p1+p2+p3+p4+p5+p6+p7;
    }

    public setDirection(orientation:string){

        this.orientation = orientation;
    }

    public getDirection(){
        return this.orientation;
    }

    public setValue(value:number){
        this.value = value;
    }

    public setColor(color){

        this.color = color;
    }

    public getColor(){
        return this.color;
    }

    public setBorderColor(borderColor){

        this.borderColor = borderColor;
    }

    public getBorderColor(){
        return this.borderColor;
    }

    public setThickness(thickness:number){
        this.thickness = Math.max(0,thickness);
        this.thickness = Math.min(10,this.thickness);
    }
        
    public getThickness():number{
        return this.thickness;
    }

}