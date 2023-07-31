/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs');

const getCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const files = [
  {
    name: 'controller.ts',
    getCode: (folderName) => 
`/* eslint-disable @typescript-eslint/no-unused-vars */
import { ${getCapitalize(folderName)}Service } from './${folderName}.service';
import { I${getCapitalize(folderName)} } from './${folderName}.interface';


export const ${getCapitalize(folderName)}Controller = {};
`,
  },
  {
    name: 'interface.ts',
    getCode: (folderName) => 
`/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Types } from 'mongoose';

export type I${getCapitalize(folderName)} = {

}

export type I${getCapitalize(folderName)}Model = Model<I${getCapitalize(folderName)}, Record<string, unknown>>;`
  },
  {
    name: 'model.ts',
    getCode: (folderName) => 
`import { Schema, model } from 'mongoose';
import { I${getCapitalize(folderName)}, I${getCapitalize(folderName)}Model } from './${folderName}.interface';

const ${getCapitalize(folderName)}Schema = new Schema<I${getCapitalize(folderName)}, I${getCapitalize(folderName)}Model>(
  {

  }
);

export const ${getCapitalize(folderName)} = model<I${getCapitalize(folderName)}, I${getCapitalize(folderName)}Model>('${getCapitalize(folderName)}', ${getCapitalize(folderName)}Schema);
`
  },
  {
    name: 'service.ts',
    getCode: (folderName) => 
`/* eslint-disable @typescript-eslint/no-unused-vars */
import { I${getCapitalize(folderName)} } from './${folderName}.interface';
import { ${getCapitalize(folderName)} } from './${folderName}.model';

export const ${getCapitalize(folderName)}Service = {};
`
  },
  {
    name: 'route.ts',
    getCode: (folderName) => 
`/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ${getCapitalize(folderName)}Controller } from './${folderName}.controller';

const router = Router();

export const ${getCapitalize(folderName)}Routes = router;
`
  },
];

async function createFolderAndFiles(parentDirectory, folderName) {
  try {
    // Create the folder
    await fs.promises.mkdir(`${parentDirectory}/${folderName}`);

    // Create the files
    await Promise.all(
      files.map(async file => {
        const filePath = `${parentDirectory}/${folderName}/${folderName}.${file.name}`;
        await fs.promises.writeFile(filePath, file.getCode(folderName));
        console.log(`Created ${filePath}`);
      })
    );

    console.log('Module and files created successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

const getUserInput = async () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    readline.question(
      'Enter the Module name (or "exit" to terminate): ',
      folderName => {
        if (folderName.toLowerCase() === 'exit') {
          readline.close();
          process.exit(0); // Terminate the process with a successful exit code
        } else {
          resolve({ folderName });
        }
      }
    );
  });
};

const start = async () => {
  const parentDirectory = 'src/app/modules';

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { folderName } = await getUserInput();

    await createFolderAndFiles(parentDirectory, folderName.toLowerCase());
  }
};

start();