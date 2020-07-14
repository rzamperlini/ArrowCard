
export class Arrow {

    public color:string;
    public borderColor:string;
    public thickness:number;
    
    private x1:number = 0;
    private x2:number = 0;
    private x3:number = 0;
    private x4:number = 0;
    private x5:number = 0;

    private y1:number = 0;
    private y2:number = 0;
    private y3:number = 0;

    private poly:string = "";

    constructor(){
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
        this.y2 = height/2;
        this.y3 = height - space;
    }

    public getArrowPoints():string
    {
        let p1:string = ""+this.x3+","+this.y1+" ";
        let p2:string = ""+this.x5+","+this.y2+" ";
        let p3:string = ""+this.x4+","+this.y2+" ";
        let p4:string = ""+this.x4+","+this.y3+" ";
        let p5:string = ""+this.x2+","+this.y3+" ";
        let p6:string = ""+this.x2+","+this.y2+" ";
        let p7:string = ""+this.x1+","+this.y2;

        return p1+p2+p3+p4+p5+p6+p7;
    }

    public setColor(color:string){

        this.color = color ?? "green";
    }

    public getColor():string{
        return this.color;
    }

    public setBorderColor(borderColor:string){

        this.borderColor = borderColor ?? "black";
    }

    public getBorderColor():string{
        return this.borderColor;
    }

    public setThickness(thickness:number){
        this.thickness = Math.max(0,thickness ?? 0);
        this.thickness = Math.min(10,this.thickness);
    }
        
    public getThickness():number{
        return this.thickness;
    }

}