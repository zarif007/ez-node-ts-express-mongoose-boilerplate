/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs');

const files = [
  {
    name: 'controller.ts',
    code: ``,
  },
  {
    name: 'interface.ts',
    code: ``,
  },
  {
    name: 'model.ts',
    code: ``,
  },
  {
    name: 'service.ts',
    code: '',
  },
  {
    name: 'route.ts',
    code: ``,
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
        await fs.promises.writeFile(filePath, file.code);
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

    await createFolderAndFiles(parentDirectory, folderName);
  }
};

start();
