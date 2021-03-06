import pathParamsToDomainParams from '@/lib/template/helpers/pathParamsToDomainParams';

describe('With req prefix', () => {
  it('Should return req.query', () => {
    const testObject = {
      parameters: [
        {
          in: 'query',
        },
      ],
    };
    const output = pathParamsToDomainParams('get', testObject, false, 'req');
    expect(
      output,
    ).toBe(
      'req.query',
    );
  });

  it('Should return req.body/path/query', () => {
    const testObject = {
      parameters: [
        {
          in: 'query',
        },
        {
          in: 'body',
        },
        {
          in: 'path',
        },
      ],
    };
    const output = pathParamsToDomainParams('post', testObject, false, 'req');
    expect(
      output,
    ).toBe(
      'req.body, req.pathParams, req.query',
    );
  });

  it('Should return req.body/path/query with req', () => {
    const testObject = {
      'parameters': [
        {
          in: 'query',
        },
        {
          in: 'body',
        },
        {
          in: 'path',
        },
      ],
      'x-passRequest': true,
    };
    const output = pathParamsToDomainParams('post', testObject, false, 'req');
    expect(
      output,
    ).toBe(
      'req.body, req.pathParams, req.query, req',
    );
  });
});

describe('Without req prefix', () => {
  it('Should return req.query without security as name does not include jwt', () => {
    const testObject = {
      parameters: [
        {
          in: 'query',
        },
      ],
      security: [{
        token: 1,
      }],
    };
    const output = pathParamsToDomainParams('get', testObject, false);
    expect(
      output,
    ).toBe(
      'query',
    );
  });
  it('Should return req.query and security', () => {
    const testObject = {
      parameters: [
        {
          in: 'query',
        },
      ],
      security: [{
        jwttoken: 1,
      }],
    };
    const output = pathParamsToDomainParams('get', testObject, false);
    expect(
      output,
    ).toBe(
      'jwtData, query',
    );
  });
  it('Should return req.query', () => {
    const testObject = {
      parameters: [
        {
          in: 'query',
        },
      ],
    };
    const output = pathParamsToDomainParams('get', testObject, false);
    expect(
      output,
    ).toBe(
      'query',
    );
  });

  it('Should return req.body/path/query', () => {
    const testObject = {
      parameters: [
        {
          in: 'query',
        },
        {
          in: 'body',
        },
        {
          in: 'path',
        },
      ],
    };
    const output = pathParamsToDomainParams('post', testObject, false);
    expect(
      output,
    ).toBe(
      'body, pathParams, query',
    );
  });

  it('Should return req.body/path/query with req', () => {
    const testObject = {
      'parameters': [
        {
          in: 'query',
        },
        {
          in: 'body',
        },
        {
          in: 'path',
        },
      ],
      'x-passRequest': true,
    };
    const output = pathParamsToDomainParams('put', testObject, false);
    expect(
      output,
    ).toBe(
      'body, pathParams, query, req',
    );
  });

  it('Should return body and files with formData', () => {
    const testObject = {
      parameters: [
        {
          in: 'formData',
        },
      ],
    };
    const output = pathParamsToDomainParams('get', testObject, false, 'req');
    expect(
      output,
    ).toBe(
      'req.body',
    );
  });
});
