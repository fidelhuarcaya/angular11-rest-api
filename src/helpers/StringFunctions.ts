import { Tasa } from "../app/models/Tasa";
export class StringFunctions {
  // Devuelve un array de palabras separandolos por espacios y haciendo 1ยบ letra mayuscula y el resto minuscula
  static capitalizePhrase(phrase: string): string {
    let words = phrase.split(' ');
    for(let i=0; i<words.length; i++) {
      const partUpper = words[i].charAt(0).toLocaleUpperCase();
      const partLower = words[i].slice(1).toLowerCase();
      words[i] = partUpper + partLower;
    }
    return words.join(' ');
  }

  static BuscarProducto(id : number, productos : Tasa []) : Tasa{
    for(let i=0;i<productos.length;i++){
        if(productos[i].$key === id){
            return productos[i];
        }
    }
    return null;
  }

  static FiltraProdByCategoria(productos : Tasa [], categoria : string) : Tasa[] {
    let Prods =  [];
    for(let value of productos){
          if(value.categoria == categoria){
            Prods.push(value);
          }
    }
    return Prods;
  }

  static filterUsersByDni(dni : string, users: any[]): any {
    for(let user of users) {
      if(user.dni == dni) return user;
    }
    return null;
  }

  static filterUsersByEmail(email : string, users: any[]): any {
    for(let user of users) {
      if(user.correo == email) return user;
    }
    return null;
  }
  static FiltraProd(productos : Tasa []) : Tasa[] {
    let Prods =  [];
    for(let value of productos){
            Prods.push(value);
    }
    return Prods;
  }
  
  static createArrayByFec(usuarios : any[]): any {
      console.log(usuarios);
      var contMay=0, contJun=0,contJul =0, contAgo = 0, contSet = 0;
      for (const dog of usuarios) {
        const fecCre = dog.fecCreacion;
        console.log(fecCre);
        var partes = fecCre.split('/')
         var  mes = partes [1];
         console.log('mes',partes[1]);      
         switch(mes){
            case "5" : contMay++;break;
            case "6" : contJun++;break;
            case   "7" : contJul++;break;
              case "8" : contAgo++;break;
            case "9" : contSet++;break;
         } 
      }
      return [
      {
         name: "Usuario normal", series: [
          { name: "Mayo", value: contMay },
          { name: "Junio", value: contJun },
          { name: "Julio", value: contJul },
          { name: "Agosto", value: contAgo },
          { name: "Setiembre", value: contSet },
        ] ,
        
      }];
    }
  
    static createArrayProd(productos : any[]): any {
      var contPMay=0, contPJun=0,contPJul =0, contPAgo = 0, contPSet = 0;
      var contAMay=0, contAJun=0,contAJul =0, contAAgo = 0, contASet = 0;
      var contSMay=0, contSJun=0,contSJul =0, contSAgo = 0, contSSet = 0;
      var contMMay=0, contMJun=0,contMJul =0, contMAgo = 0, contMSet = 0;

      for (const dog of productos) {  
      switch(dog.categoria){
        case "Pesas y barras":  
        const fecCre = dog.fecCreacion;
        var partes = fecCre.split('/')
         var  mes = partes [1];
         console.log('mes',partes[1]);      
         switch(mes){
            case "5" :  contPMay = dog.stock;break;
            case "6" : contPJun = dog.stock;break;
            case  "7" : contPJul = dog.stock;break;
            case "8" : contPAgo = dog.stock;break;
            case "9" : contPSet = dog.stock;break;
         }break;

        case "Articulos y accesorios": 
        const fecCreA = dog.fecCreacion;
        var partes = fecCreA.split('/')
         var  mes = partes [1];
         console.log('mes',partes[1]);      
        switch(mes){
          case "5" :  contAMay = dog.stock;break;
          case "6" : contAJun = dog.stock;break;
          case  "7" : contAJul = dog.stock;break;
          case "8" : contAAgo = dog.stock;break;
          case "9" : contASet = dog.stock;break;
       }break;
             
        break;
        case "Suplementos":
          
          switch(mes){
            case "5" :  contSMay = dog.stock;break;
            case "6" : contSJun = dog.stock;break;
            case  "7" : contSJul = dog.stock;break;
            case "8" : contSAgo = dog.stock;break;
            case "9" : contSSet = dog.stock;break;
         } 
        break;
        case "Máquinas y bancas" : 
        switch(mes){
          case "5" :  contMMay = dog.stock;break;
          case "6" : contMJun = dog.stock;break;
          case  "7" : contMJul = dog.stock;break;
          case "8" : contMAgo = dog.stock;break;
          case "9" : contMSet = dog.stock;break;
       }      
        break;
      }
        
      }
      return [
      {
         name: "Pesas y barras", series: [
          { name: "Mayo", value: contPMay },
          { name: "Junio", value: contPJun },
          { name: "Julio", value: contPJul },
          { name: "Agosto", value: contPAgo },
          { name: "Setiembre", value: contPSet },
        ] ,    
      },
      {
        name: "Articulos y accesorios", series: [
         { name: "Mayo", value: contAMay },
         { name: "Junio", value: contAJun },
         { name: "Julio", value: contAJul },
         { name: "Agosto", value: contAAgo },
         { name: "Setiembre", value: contASet },
       ] ,
       
     },
     {
      name: "Suplementos", series: [
       { name: "Mayo", value: contSMay },
       { name: "Junio", value: contSJun },
       { name: "Julio", value: contSJul },
       { name: "Agosto", value: contSAgo },
       { name: "Setiembre", value: contSSet },
     ] ,
     
   },
   {
    name: "Maquinas y bancas", series: [
     { name: "Mayo", value: contMMay },
     { name: "Junio", value: contMJun },
     { name: "Julio", value: contMJul },
     { name: "Agosto", value: contMAgo },
     { name: "Setiembre", value: contMSet },
   ] ,
   
 }
    
    ];
    }

}