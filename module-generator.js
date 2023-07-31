/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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

async function createFolderAndFiles(parentDirectory, folderName) {
  try {
    const moduleDirectory = path.join(parentDirectory, folderName);

    // Create the folder
    await fs.mkdir(moduleDirectory);

    // Create the files using for...of loop and async/await
    for (const file of files) {
      const filePath = path.join(moduleDirectory, `${folderName}.${file.name}`);
      await fs.writeFile(filePath, file.getCode(folderName));
      console.log(`Created ${filePath}`);
    }

    console.log('Module and files created successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getUserInput() {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Enter the Module name (or "exit" to terminate): ', (folderName) => {
      readline.close();
      resolve(folderName);
    });
  });
}

async function start() {
  const parentDirectory = 'src/app/modules';

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const folderName = await getUserInput();

    if (folderName.toLowerCase() === 'exit') {
      process.exit(0);
    }

    await createFolderAndFiles(parentDirectory, folderName);
  }
}

start();


