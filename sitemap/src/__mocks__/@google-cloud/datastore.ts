/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

const mockedDatastoreData = new Map<string, any>();
const mockedDatastoreKey = Symbol("KEY");

class MockedQuery {
  public end = jest.fn(() => this);

  public filter = jest.fn(() => this);

  public groupBy = jest.fn(() => this);

  public hasAncestor = jest.fn(() => this);

  public limit = jest.fn((limitCount: number) => {
    this.MOCKED_QUERY_LIMIT = limitCount;
    return this;
  });

  public offset = jest.fn((offsetCount: number) => {
    this.MOCKED_QUERY_OFFSET = offsetCount;
    return this;
  });

  public order = jest.fn(() => this);

  public run = jest.fn(() => this);

  public runStream = jest.fn(() => this);

  public select = jest.fn(() => this);

  public start = jest.fn(() => this);

  public MOCKED_QUERY_LIMIT?: number;
  public MOCKED_QUERY_OFFSET?: number;
  public MOCKED_QUERY_TOPIC: string;

  constructor(query: string) {
    this.MOCKED_QUERY_TOPIC = query;
  }
}

const datastore = jest.fn(() => ({
  KEY: mockedDatastoreKey,

  createQuery: jest.fn((queryTopic: string) => new MockedQuery(queryTopic)),

  get: jest.fn(async (key: Datastore.Key | Datastore.Key[]) => {
    if ((key as Datastore.Key[]).length !== undefined) {
      return [
        (key as Datastore.Key[]).map(individualKey => ({
          ...mockedDatastoreData.get(
            `${
              (individualKey as Datastore.Key).kind
            }:${(individualKey as Datastore.Key).name ||
              (individualKey as Datastore.Key).id}`
          ),
          [mockedDatastoreKey]: individualKey
        }))
      ];
    } else {
      const data = mockedDatastoreData.get(
        `${(key as Datastore.Key).kind}:${(key as Datastore.Key).name ||
          (key as Datastore.Key).id}`
      );
      data[mockedDatastoreKey] = key as Datastore.Key;

      return [data];
    }
  }),

  key: jest.fn(
    (
      keyObject: string | [string, string] | [string, number]
    ): Datastore.Key => {
      if (typeof keyObject === "string") {
        return { kind: keyObject, id: Math.random() * 1000 };
      } else if (keyObject.constructor.name === "Array") {
        if (typeof keyObject[1] === "string") {
          return { kind: keyObject[0], name: keyObject[1] as string };
        } else if (typeof keyObject[1] === "number") {
          return { kind: keyObject[0], id: keyObject[1] as number };
        } else {
          throw new Error("Invalid Value in Key Array at Index 1");
        }
      } else {
        throw new Error("Invalid Key Input");
      }
    }
  ),

  runQuery: jest.fn((query: MockedQuery) => {
    return [
      Array.from(mockedDatastoreData)
        .map(entry => entry[1])
        .filter(
          entry => entry[mockedDatastoreKey].kind === query.MOCKED_QUERY_TOPIC
        )
    ];
  })
}));

(datastore as any).__addToMockData = (key: string, data: object) => {
  mockedDatastoreData.set(key, {
    ...data,
    [mockedDatastoreKey]: { kind: key.split(":")[0], name: key.split(":")[1] }
  });
};

(datastore as any).__clearMockData = () => {
  mockedDatastoreData.clear();
};

module.exports = datastore;
