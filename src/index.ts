import { z } from "zod";

export const SCALAR = z.literal("SCALAR");
export const OBJECT = z.literal("OBJECT");
export const INTERFACE = z.literal("INTERFACE");
export const UNION = z.literal("UNION");
export const ENUM = z.literal("ENUM");
export const INPUT_OBJECT = z.literal("INPUT_OBJECT");
export const LIST = z.literal("LIST");
export const NON_NULL = z.literal("NON_NULL");

const baseOutputTypeRef = {
  list: z.discriminatedUnion("kind", [
    z.object({ kind: SCALAR, name: z.string() }),
    z.object({ kind: OBJECT, name: z.string() }),
    z.object({ kind: INTERFACE, name: z.string() }),
    z.object({ kind: UNION, name: z.string() }),
    z.object({ kind: ENUM, name: z.string() }),
    z.object({ kind: LIST, name: z.null() }),
    z.object({ kind: NON_NULL, name: z.null() }),
  ]),
  nonNull: z.discriminatedUnion("kind", [
    z.object({ kind: SCALAR, name: z.string() }),
    z.object({ kind: OBJECT, name: z.string() }),
    z.object({ kind: INTERFACE, name: z.string() }),
    z.object({ kind: UNION, name: z.string() }),
    z.object({ kind: ENUM, name: z.string() }),
    z.object({ kind: LIST, name: z.null() }),
  ]),
};

function wrapOutputTypeRef<
  T extends {
    list: z.ZodDiscriminatedUnion<any, any, any>;
    nonNull: z.ZodDiscriminatedUnion<any, any, any>;
  }
>({ list, nonNull }: T) {
  return {
    list: z.discriminatedUnion("kind", [
      z.object({ kind: SCALAR, name: z.string(), ofType: z.null() }),
      z.object({ kind: OBJECT, name: z.string(), ofType: z.null() }),
      z.object({ kind: INTERFACE, name: z.string(), ofType: z.null() }),
      z.object({ kind: UNION, name: z.string(), ofType: z.null() }),
      z.object({ kind: ENUM, name: z.string(), ofType: z.null() }),
      z.object({ kind: LIST, name: z.null(), ofType: list }),
      z.object({ kind: NON_NULL, name: z.null(), ofType: nonNull }),
    ]),
    nonNull: z.discriminatedUnion("kind", [
      z.object({ kind: SCALAR, name: z.string(), ofType: z.null() }),
      z.object({ kind: OBJECT, name: z.string(), ofType: z.null() }),
      z.object({ kind: INTERFACE, name: z.string(), ofType: z.null() }),
      z.object({ kind: UNION, name: z.string(), ofType: z.null() }),
      z.object({ kind: ENUM, name: z.string(), ofType: z.null() }),
      z.object({ kind: LIST, name: z.null(), ofType: list }),
    ]),
  };
}

export const introspectionOutputTypeRef = wrapOutputTypeRef(
  wrapOutputTypeRef(
    wrapOutputTypeRef(
      wrapOutputTypeRef(
        wrapOutputTypeRef(
          wrapOutputTypeRef(wrapOutputTypeRef(baseOutputTypeRef))
        )
      )
    )
  )
).list;

const baseInputTypeRef = {
  list: z.discriminatedUnion("kind", [
    z.object({ kind: SCALAR, name: z.string() }),
    z.object({ kind: ENUM, name: z.string() }),
    z.object({ kind: INPUT_OBJECT, name: z.string() }),
    z.object({ kind: LIST, name: z.null() }),
    z.object({ kind: NON_NULL, name: z.null() }),
  ]),
  nonNull: z.discriminatedUnion("kind", [
    z.object({ kind: SCALAR, name: z.string() }),
    z.object({ kind: ENUM, name: z.string() }),
    z.object({ kind: INPUT_OBJECT, name: z.string() }),
    z.object({ kind: LIST, name: z.null() }),
  ]),
};

function wrapInputTypeRef<
  T extends {
    list: z.ZodDiscriminatedUnion<any, any, any>;
    nonNull: z.ZodDiscriminatedUnion<any, any, any>;
  }
>({ list, nonNull }: T) {
  return {
    list: z.discriminatedUnion("kind", [
      z.object({ kind: SCALAR, name: z.string(), ofType: z.null() }),
      z.object({ kind: ENUM, name: z.string(), ofType: z.null() }),
      z.object({ kind: INPUT_OBJECT, name: z.string(), ofType: z.null() }),
      z.object({ kind: LIST, name: z.null(), ofType: list }),
      z.object({ kind: NON_NULL, name: z.null(), ofType: nonNull }),
    ]),
    nonNull: z.discriminatedUnion("kind", [
      z.object({ kind: SCALAR, name: z.string(), ofType: z.null() }),
      z.object({ kind: ENUM, name: z.string(), ofType: z.null() }),
      z.object({ kind: INPUT_OBJECT, name: z.string(), ofType: z.null() }),
      z.object({ kind: LIST, name: z.null(), ofType: list }),
    ]),
  };
}

export const introspectionInputTypeRef = wrapInputTypeRef(
  wrapInputTypeRef(
    wrapInputTypeRef(
      wrapInputTypeRef(
        wrapInputTypeRef(wrapInputTypeRef(wrapInputTypeRef(baseInputTypeRef)))
      )
    )
  )
).list;

export const introspectionInputValue = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  type: introspectionInputTypeRef,
  defaultValue: z.string().nullable(),
  isDeprecated: z.boolean().optional(),
  deprecationReason: z.string().nullable().optional(),
});

export const introspectionField = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  args: z.array(introspectionInputValue),
  type: introspectionOutputTypeRef,
  isDeprecated: z.boolean(),
  deprecationReason: z.string().nullable(),
});

export const introspectionRootOperationType = z.object({
  name: z.string(),
});

export const introspectionScalarType = z.object({
  kind: SCALAR,
  name: z.string(),
  description: z.string().nullable().optional(),
  specifiedByURL: z.string().nullable().optional(),
  fields: z.null(),
  inputFields: z.null(),
  interfaces: z.null(),
  enumValues: z.null(),
  possibleTypes: z.null(),
});

export const introspectionObjectType = z.object({
  kind: OBJECT,
  name: z.string(),
  description: z.string().nullable().optional(),
  specifiedByURL: z.null().optional(),
  fields: z.array(introspectionField),
  inputFields: z.null(),
  interfaces: z.array(
    z.object({ kind: INTERFACE, name: z.string(), ofType: z.null() })
  ),
  enumValues: z.null(),
  possibleTypes: z.null(),
});

export const introspectionInterfaceType = z.object({
  kind: INTERFACE,
  name: z.string(),
  description: z.string().nullable().optional(),
  specifiedByURL: z.null().optional(),
  fields: z.array(introspectionField),
  inputFields: z.null(),
  interfaces: z.array(
    z.object({ kind: INTERFACE, name: z.string(), ofType: z.null() })
  ),
  enumValues: z.null(),
  possibleTypes: z.array(
    z.object({ kind: OBJECT, name: z.string(), ofType: z.null() })
  ),
});

export const introspectionUnionType = z.object({
  kind: UNION,
  name: z.string(),
  description: z.string().nullable().optional(),
  specifiedByURL: z.null().optional(),
  fields: z.null(),
  inputFields: z.null(),
  interfaces: z.null(),
  enumValues: z.null(),
  possibleTypes: z.array(
    z.object({ kind: OBJECT, name: z.string(), ofType: z.null() })
  ),
});

export const introspectionEnumValue = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  isDeprecated: z.boolean(),
  deprecationReason: z.string().nullable(),
});

export const introspectionEnumType = z.object({
  kind: ENUM,
  name: z.string(),
  description: z.string().nullable().optional(),
  specifiedByURL: z.null().optional(),
  fields: z.null(),
  inputFields: z.null(),
  interfaces: z.null(),
  enumValues: z.array(introspectionEnumValue),
  possibleTypes: z.null(),
});

export const introspectionInputObjectType = z.object({
  kind: INPUT_OBJECT,
  name: z.string(),
  description: z.string().nullable().optional(),
  specifiedByURL: z.null().optional(),
  fields: z.null(),
  inputFields: z.array(introspectionInputValue),
  interfaces: z.null(),
  enumValues: z.null(),
  possibleTypes: z.null(),
});

export const introspectionType = z.discriminatedUnion("kind", [
  introspectionScalarType,
  introspectionObjectType,
  introspectionInterfaceType,
  introspectionUnionType,
  introspectionEnumType,
  introspectionInputObjectType,
]);

export const introspectionDirectiveLocation = z.union([
  z.literal("QUERY"),
  z.literal("MUTATION"),
  z.literal("SUBSCRIPTION"),
  z.literal("FIELD"),
  z.literal("FRAGMENT_DEFINITION"),
  z.literal("FRAGMENT_SPREAD"),
  z.literal("INLINE_FRAGMENT"),
  z.literal("VARIABLE_DEFINITION"),
  z.literal("SCHEMA"),
  z.literal("SCALAR"),
  z.literal("OBJECT"),
  z.literal("FIELD_DEFINITION"),
  z.literal("ARGUMENT_DEFINITION"),
  z.literal("INTERFACE"),
  z.literal("UNION"),
  z.literal("ENUM"),
  z.literal("ENUM_VALUE"),
  z.literal("INPUT_OBJECT"),
  z.literal("INPUT_FIELD_DEFINITION"),
]);

export const introspectionDirective = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  isRepeatable: z.boolean().optional(),
  locations: z.array(introspectionDirectiveLocation),
  args: z.array(introspectionInputValue),
});

export const introspectionQuery = z.object({
  __schema: z.object({
    description: z.string().nullable().optional(),
    queryType: introspectionRootOperationType,
    mutationType: introspectionRootOperationType.nullable(),
    subscriptionType: introspectionRootOperationType.nullable(),
    types: z.array(introspectionType),
    directives: z.array(introspectionDirective),
  }),
});
