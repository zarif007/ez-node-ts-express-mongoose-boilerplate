const files = [
    {
      name: 'controller.ts',
      getCode: (folderName) => 
  `/* eslint-disable @typescript-eslint/no-unused-vars */
  import { ${capitalize(folderName)}Service } from './${folderName}.service';
  import { I${capitalize(folderName)} } from './${folderName}.interface';
  
  
  export const ${capitalize(folderName)}Controller = {};
  `,
    },
    {
      name: 'interface.ts',
      getCode: (folderName) => 
  `/* eslint-disable @typescript-eslint/no-unused-vars */
  import { Model, Types } from 'mongoose';
  
  export type I${capitalize(folderName)} = {
  
  }
  
  export type I${capitalize(folderName)}Model = Model<I${capitalize(folderName)}, Record<string, unknown>>;`
    },
    {
      name: 'model.ts',
      getCode: (folderName) => 
  `import { Schema, model } from 'mongoose';
  import { I${capitalize(folderName)}, I${capitalize(folderName)}Model } from './${folderName}.interface';
  
  const ${capitalize(folderName)}Schema = new Schema<I${capitalize(folderName)}, I${capitalize(folderName)}Model>(
    {
  
    }
  );
  
  export const ${capitalize(folderName)} = model<I${capitalize(folderName)}, I${capitalize(folderName)}Model>('${capitalize(folderName)}', ${capitalize(folderName)}Schema);
  `
    },
    {
      name: 'service.ts',
      getCode: (folderName) => 
  `/* eslint-disable @typescript-eslint/no-unused-vars */
  import { I${capitalize(folderName)} } from './${folderName}.interface';
  import { ${capitalize(folderName)} } from './${folderName}.model';
  
  export const ${capitalize(folderName)}Service = {};
  `
    },
    {
      name: 'route.ts',
      getCode: (folderName) => 
  `/* eslint-disable @typescript-eslint/no-unused-vars */
  import { Router } from 'express';
  import { ${capitalize(folderName)}Controller } from './${folderName}.controller';
  
  const router = Router();
  
  export const ${capitalize(folderName)}Routes = router;
  `
    },
  ];