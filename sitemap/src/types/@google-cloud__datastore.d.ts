/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */
/* tslint:disable */

declare namespace Datastore {
  class Key {
    id?: number;
    kind: string;
    name?: string;
    namespace?: string;
    parent?: string;
  }
}

declare module "@google-cloud/datastore" {
  import { Readable, Stream } from "stream";

  class Query<T> {
    end(cursorToken: string): this;
    filter(property: string, value: any): this;
    filter(property: string, operator: string, value: any): this;
    groupBy(properties: any[]): this;
    hasAncestor(key: Datastore.Key): this;
    limit(n: number): this;
    offset(n: number): this;
    order(property: string, options?: { descending?: boolean }): this;
    run(
      options?: { consistency?: string },
      callback?: (
        err: Error | null,
        entities: T[],
        info: { endCursor?: string; moreResults: string }
      ) => any
    ): Promise<object[]>;
    runStream(options?: object): Stream;
    select(fieldName: string | string[]): this;
    start(cursorToken: string): this;
  }

  class Transaction {}

  interface IEntity {
    key: Datastore.Key;
    data: object | object[];
  }

  interface ISaveEntity extends IEntity {
    method?: string;
  }

  type KeyPath = string | [string] | [string, any];

  class Datastore {
    KEY: symbol;
    MORE_RESULTS_AFTER_CURSOR: string;
    MORE_RESULTS_AFTER_LIMIT: string;
    NO_MORE_RESULTS: string;
    allocateIds(
      incompleteKey: Datastore.Key,
      n: number,
      callback?: (
        error: Error | null,
        keys: Datastore.Key[],
        apiResponse: any
      ) => any
    ): Promise<[Datastore.Key[], any]>;
    createQuery<T>(kind: string): Query<T>;
    createQuery<T>(namespace: string, kind: string): Query<T>;
    createReadStream(
      keys: Datastore.Key | Datastore.Key[],
      options?: object
    ): Readable;
    delete(
      key: Datastore.Key | Datastore.Key[],
      callback?: (err: Error | null, apiResponse: any) => any
    ): Promise<any>;
    double(value: number): object;
    geoPoint(coordinates: { latitude: number; longitude: number }): object;
    get<T>(
      keys: Datastore.Key | Datastore.Key[],
      options?: {
        consistency?: string;
        maxApiCalls?: number;
      },
      callback?: (err: Error | null, entity: T) => any
    ): Promise<[T]>;
    insert(
      entities: IEntity | IEntity[],
      callback: (err: Error | null, apiResponse: any) => any
    ): Promise<any>;
    int(value: number | string): object;
    key(kind: KeyPath): Datastore.Key;
    key(options?: { namespace?: string; path?: KeyPath }): Datastore.Key;
    runQuery<T>(
      query: Query<T>,
      options?: { consistency?: string; maxApiCalls?: number },
      callback?: (
        err: Error | null,
        entities: T[],
        info: { endCursor?: string; moreResults: string }
      ) => any
    ): Promise<[T[]]>;
    runQueryStream<T>(query: Query<T>, options?: object): Readable;
    save(
      entities: ISaveEntity | ISaveEntity[],
      callback?: (err: Error | null, apiResponse: any) => any
    ): Promise<any>;
    update(
      entities: IEntity | IEntity[],
      callback: (err: Error | null, apiResponse: any) => any
    ): Promise<any>;
    upsert(
      entities: IEntity | IEntity[],
      callback: (err: Error | null, apiResponse: any) => any
    ): Promise<any>;
  }

  function datebase(options?: object): Datastore;
  export = datebase;
}
