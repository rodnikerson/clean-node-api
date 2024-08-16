import { Collection } from "mongodb"
import { MongoHelper } from "../account-repository/helpers/mongo-helper"
import { LogMongoRepository } from "./log"

describe("Log Mongo", () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection("errors")
    errorCollection.deleteMany({})
  })

  test("Should create an error log on success", async () => {
    const sut = new LogMongoRepository()
    await sut.logError("any_error")
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
