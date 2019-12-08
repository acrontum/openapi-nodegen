import fs from 'fs-extra';
import path from 'path';
import openapiNodegen from '@/openapiNodegen';
import hasha from 'hasha';

jest.setTimeout(60 * 1000); // in milliseconds

const testServerPath = path.join(process.cwd(), 'testserver');
const packageJson = {
  name: 'openapi-nodegen',
  version: '4.0.6',
  description: 'An OpenAPI 2/3 code generator for Node.js',
  scripts: {},
  devDependencies: {
    'openapi-nodegen': 'latest',
  },
};

describe('e2e testing', () => {
  beforeAll(() => {
    fs.removeSync(testServerPath);
    fs.ensureDirSync(testServerPath);
    fs.writeJsonSync(path.join(testServerPath, 'package.json'), packageJson, {spaces: 2});
  });
  afterAll(() => {
    return fs.removeSync(testServerPath);
  });

  it('Should build without error', async (done) => {
    try {
      const tplUrl = 'https://github.com/acrontum/openapi-nodegen-typescript-server.git';
      const ymlPath = path.join(process.cwd(), 'test_swagger.yml');
      await openapiNodegen({
        dontUpdateTplCache: false,
        mockServer: false,
        segmentsCount: 1,
        swaggerFilePath: ymlPath,
        targetDir: testServerPath,
        template: tplUrl,
      });
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Should have the correct file hashes', async (done) => {
    // If these tests fail the either:
    // A) The test_swagger.yml has changed
    // B) The tpl for the typescipt server has change
    // C) Something broke when building the said files
    const filePaths = [
      ['testserver/src/domains/RainDomain.ts', 'f768ac3c949e6d77aff47810f0150a23'],
      ['testserver/src/http/nodegen/interfaces/WeatherFull.ts', '3b5de54103373a6f2e1d6945c0c1c66e'],
      ['testserver/src/http/nodegen/interfaces/index.ts', '0e5a6b1bfad08b8c378be83a6b4c436c'],
      ['testserver/src/http/nodegen/security/definitions.ts', 'c14f49726b33f9ee55074fa0bc496bf5'],
      ['testserver/src/http/nodegen/routes/weatherRoutes.ts', '7b02f2da8180e6ca2334433d2eae3b2c'],
      ['testserver/src/http/nodegen/transformOutputs/weatherTransformOutput.ts', '14d4332f20b73acc928509109f55d781'],
    ];
    for (let i = 0; i < filePaths.length; ++i) {
      const filePath = filePaths[i][0];
      const fileHash = filePaths[i][1];
      const hash = await hasha.fromFile(path.join(process.cwd(), filePath), {algorithm: 'md5'});
      if (hash !== fileHash) {
        done(`Hash mis-match for file ${filePath}. Expected hash ${fileHash} but got ${hash}`);
      }
    }
    done();
  });

  it('Should build without error', async (done) => {
    try {
      const tplUrl = 'https://github.com/acrontum/openapi-nodegen-typescript-server.git';
      const ymlPath = path.join(process.cwd(), 'test_swagger.yml');
      await openapiNodegen({
        dontUpdateTplCache: false,
        mockServer: false,
        segmentsCount: 1,
        swaggerFilePath: ymlPath,
        targetDir: testServerPath,
        template: tplUrl,
      });
      done();
    } catch (e) {
      done(e);
    }
  });
});
