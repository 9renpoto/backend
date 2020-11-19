import { GraphQLModule } from '@nestjs/graphql'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { createTestClient } from 'apollo-server-testing'
import gql from 'graphql-tag'
import { AppModule } from '../src/app.module'
import { UserFactory } from '../src/user/user.factory'

describe('app (e2e)', () => {
  let app: NestFastifyApplication
  let apolloClient: ReturnType<typeof createTestClient>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )
    await app.init()

    // apolloServer is protected, we need to cast module to any to get it
    apolloClient = createTestClient(
      (moduleFixture.get(GraphQLModule) as any).apolloServer
    )
  })

  afterEach(() => app.close())

  it('defined', () => expect(app).toBeDefined())

  it('try dataLoader', async () => {
    const user = await UserFactory.create()
    const { query } = apolloClient
    expect(
      await (
        await query({
          query: gql`
            query getUser($input: ID!) {
              user(id: $input) {
                id
                name
              }
            }
          `,
          variables: {
            id: user.id,
          },
        })
      ).data
    ).toBeDefined()
  })
})
