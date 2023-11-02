// we import a function that we wrote to create a new instance of Apollo Server
import { createApolloServer, userData } from '../server';

// we'll use supertest to test our server
import request from 'supertest';

// this is the query for our test
const helloQueryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: 'world' },
};

const hiiQueryData = {
  query: `query sayHii($name: String) {
    hii(name: $name)
  }`,
  variables: { name: 'world' },
};

const getUser = {
  query: `query getUser {
    getUser {
      first_name
      id
      last_name
    }
  }`
}

const createUser = {
  mutation: `mutation createUser($input: createUserInput) {
    createUser(input: $input) {
      message
      status
    }
  }` ,
  variables: {
    "input": {
      "id": 6,
      "first_name": "Hannie",
      "last_name": "Moynham"
    }
  }
}

let successfullResponce = {
  status: "SUCCESS",
  message: "User has been successfully Added",
}

describe('e2e demo', () => {
  let server, url;
 
  beforeAll(async () => { 
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  afterAll(async () => {
    await server?.stop();
  });

  it('says hello', async () => {
 
    const response = await request(url).post('/').send(helloQueryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe('Hello world!');
  });

  it('says Hiii', async () => {
    
    const response = await request(url).post('/').send(hiiQueryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hii).toBe('Hiiiii world!');
  });

  it('Get user Query', async () => {
 
    const response = await request(url).post('/').send(getUser);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.getUser).toStrictEqual(userData);
  });

  it('Create user Mutation', async () => {
  
    const response = await request(url).post('/').send(createUser);
    console.log(JSON.stringify(response.body), "response")
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.createUser).toBe(successfullResponce);
  });
});
