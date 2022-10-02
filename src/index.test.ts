import * as graphql_16_0 from "graphql-16.0";
import * as graphql_16_1 from "graphql-16.1";
import * as graphql_16_2 from "graphql-16.2";
import * as graphql_16_3 from "graphql-16.3";
import * as graphql_16_4 from "graphql-16.4";
import * as graphql_16_5 from "graphql-16.5";
import * as graphql_16_6 from "graphql-16.6";
import { describe, expect, it } from "vitest";
import { introspectionQuery } from ".";

function createSchema(graphql: any) {
  const {
    DirectiveLocation,
    GraphQLBoolean,
    GraphQLDirective,
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLUnionType,
    introspectionFromSchema,
  } = graphql as typeof graphql_16_6;

  const testInterface2 = new GraphQLInterfaceType({
    name: "TestInterface2",
    fields: {
      testInt: { type: GraphQLInt },
    },
  });

  const testInterface = new GraphQLInterfaceType({
    name: "TestInterface",
    interfaces: [testInterface2],
    fields: {
      testInt: { type: GraphQLInt },
      testString: { type: GraphQLString },
    },
  });

  const testInterfaceType1 = new GraphQLObjectType({
    name: "TestInterfaceType1",
    interfaces: [testInterface, testInterface2],
    fields: {
      testInt: { type: GraphQLInt },
      testString: { type: GraphQLString },
      testBoolean: { type: GraphQLBoolean },
    },
  });

  const testInterfaceType2 = new GraphQLObjectType({
    name: "TestInterfaceType2",
    interfaces: [testInterface, testInterface2],
    fields: {
      testInt: { type: GraphQLInt },
      testString: { type: GraphQLString },
      testID: { type: GraphQLID },
    },
  });

  const testUnion1 = new GraphQLObjectType({
    name: "TestUnion1",
    fields: {
      testInt: { type: GraphQLInt },
    },
  });

  const testUnion2 = new GraphQLObjectType({
    name: "TestUnion2",
    fields: { testString: { type: GraphQLString } },
  });

  const testUnion = new GraphQLUnionType({
    name: "TestUnion",
    types: [testUnion1, testUnion2],
  });

  const testEnum = new GraphQLEnumType({
    name: "TestEnum",
    values: {
      FOO: { description: "test enum value description" },
      BAR: {},
      FOOBAR: { deprecationReason: "test enum value deprecation reason" },
    },
  });

  const testInputObject2 = new GraphQLInputObjectType({
    name: "TestInputObject2",
    fields: {
      testID: { type: GraphQLID },
    },
  });

  const testInputObject = new GraphQLInputObjectType({
    name: "TestInputObject",
    fields: {
      testInt: { type: GraphQLInt, description: "test field description" },
      testFloat: {
        type: GraphQLFloat,
        deprecationReason: "test field deprecation reason",
      },
      testString: { type: GraphQLString },
      testBoolean: { type: GraphQLBoolean },
      testID: { type: GraphQLID },
      testEnum: { type: testEnum },
      testInputObject: { type: testInputObject2 },
    },
  });

  const testObject = new GraphQLObjectType({
    name: "TestObject",
    fields: {
      testInt: { type: GraphQLInt, description: "test field description" },
      testFloat: {
        type: GraphQLFloat,
        deprecationReason: "test field deprecation reason",
      },
      testString: { type: GraphQLString },
      testBoolean: { type: GraphQLBoolean },
      testID: { type: GraphQLID },
      testInterface: { type: testInterface },
      testUnion: { type: testUnion },
      testEnum: { type: testEnum },
      testNonNull: { type: new GraphQLNonNull(GraphQLInt) },
      testList: { type: new GraphQLList(GraphQLInt) },
      wrapped: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(GraphQLInt))
        ),
      },
      deeplyWrapped: {
        type: new GraphQLNonNull(
          new GraphQLList(
            new GraphQLNonNull(
              new GraphQLList(
                new GraphQLNonNull(
                  new GraphQLList(new GraphQLNonNull(GraphQLInt))
                )
              )
            )
          )
        ),
      },
      tooDeeplyWrapped: {
        type: new GraphQLNonNull(
          new GraphQLList(
            new GraphQLNonNull(
              new GraphQLList(
                new GraphQLNonNull(
                  new GraphQLList(
                    new GraphQLNonNull(
                      new GraphQLList(new GraphQLNonNull(GraphQLInt))
                    )
                  )
                )
              )
            )
          )
        ),
      },
    },
  });

  const query = new GraphQLObjectType({
    name: "Query",
    fields: {
      test: {
        type: testObject,
        args: {
          testInt: { description: "test arg description", type: GraphQLInt },
          testFloat: { type: GraphQLFloat },
          testString: { type: GraphQLString },
          testBoolean: { type: GraphQLBoolean },
          testID: { type: GraphQLID },
          testEnum: { type: testEnum },
          testInputObject: { type: testInputObject },
        },
      },
    },
  });

  const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      testMutation: { type: GraphQLBoolean },
    },
  });

  const subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: {
      testSubscription: { type: testObject },
    },
  });

  const testDirective = new GraphQLDirective({
    name: "testDirective",
    locations: [
      DirectiveLocation.QUERY,
      DirectiveLocation.MUTATION,
      DirectiveLocation.SUBSCRIPTION,
    ],
  });

  const schema = new GraphQLSchema({
    description: "GraphQL schema for testing",
    query,
    mutation,
    subscription,
    types: [testInterfaceType1, testInterfaceType2],
    directives: [testDirective],
  });

  return introspectionFromSchema(schema, {
    descriptions: true,
    directiveIsRepeatable: true,
    inputValueDeprecation: true,
    schemaDescription: true,
    specifiedByUrl: true,
  });
}

describe.each([
  ["graphql@~16.0", graphql_16_0],
  ["graphql@~16.1", graphql_16_1],
  ["graphql@~16.2", graphql_16_2],
  ["graphql@~16.3", graphql_16_3],
  ["graphql@~16.4", graphql_16_4],
  ["graphql@~16.5", graphql_16_5],
  ["graphql@~16.6", graphql_16_6],
])("%s", (_, graphql) => {
  it("should validate the introspection result", () => {
    const introspection = createSchema(graphql);
    expect(introspectionQuery.safeParse(introspection)).toEqual({
      success: true,
      data: introspection,
    });
  });
});
