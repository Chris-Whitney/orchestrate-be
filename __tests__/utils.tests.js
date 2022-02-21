const app = require('../app')
const request = require('supertest')
const mongoose = require('mongoose')
const { getIdByUsername, userExists } = require('../utils/users.utils')

beforeAll((done) => {
   done()
})

afterAll((done) => {
   // Closing the connection to exit successfully.
   mongoose.connection.close()
   done()
})

describe('Users Utils', () => {
   describe('getIdByUsername', () => {
      test('should return a user ID when given a username', async () => {
         const id = await getIdByUsername("Steve")
         expect(id).toBe("620fb8208aa0f467bc6e63f5");
      })
   });
   describe('userExists', () => {
      test('should return true or false', async () => {
         const id = await userExists("Steve")
         const noId = await userExists("craig")
         expect(id).toBe(true);
         expect(noId).toBe(false);
      })
   });
})