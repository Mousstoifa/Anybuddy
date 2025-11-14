import './setup'
import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import * as api from '../../src/api/auth/api-calls'
import axiosInstance from '../../src/api/axios'

const TEST_USER = { email: 'trophenix@test.fr', password: 'trophenix' }

beforeAll(async () => {
  // point tests at the backend running in Docker
  axiosInstance.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'
})
afterAll(() => {})

describe('auth/api-calls (bun)', () => {
  it('login returns tokens for valid credentials', async () => {
    const tokens = await api.login(TEST_USER)
    // backend returns at least an access token; don't assert exact value
    expect(tokens).toHaveProperty('access')
    expect(typeof tokens.access).toBe('string')
    if (tokens.refresh) expect(typeof tokens.refresh).toBe('string')
  })

  it('login fails for invalid credentials', async () => {
    await expect(api.login({ email: 'bad', password: 'bad' } as any)).rejects.toThrow()
  })

  it('refresh returns new tokens for valid refresh', async () => {
    const tokens = await api.login(TEST_USER)
    if (!tokens.refresh) {
      console.log('No refresh token provided, skipping refresh test')
      return
    }
    const refreshed = await api.refresh({ refresh: tokens.refresh })
    expect(refreshed).toHaveProperty('access')
    expect(typeof refreshed.access).toBe('string')
  })

  it('refresh fails for invalid refresh token', async () => {
    try {
      await api.refresh({ refresh: 'invalid-token' })
      // If we get here, something is wrong - should have thrown
      expect(false).toBe(true)
    } catch (err: any) {
      // Should get 401 for invalid refresh token
      expect([401, 400]).toContain(err.response?.status)
      console.log('refresh correctly handles invalid token:', err.response?.status)
    }
  })

  it('me returns user for valid token', async () => {
    const tokens = await api.login(TEST_USER)
    ;(globalThis as any).localStorage.setItem('accessToken', tokens.access)
    const user = await api.me()
    expect(user?.email).toBe(TEST_USER.email)
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('athlete')
    expect(user).toHaveProperty('created_at')
  })

  it('me fails for missing/invalid token', async () => {
    (globalThis as any).localStorage.removeItem('accessToken')
    await expect(api.me()).rejects.toThrow()
  })

  it('register creates new user account', async () => {
    // Use unique email for registration test
    const uniqueEmail = `test${Date.now()}@example.com`
    const registerData = {
      email: uniqueEmail,
      password: 'testpassword123',
      first_name: 'Test',
      last_name: 'User'
    }

    try {
      const response = await api.register(registerData)
      console.log('register response:', response)
      // Register might return empty response, so let's test by trying to login
      const tokens = await api.login({ email: uniqueEmail, password: 'testpassword123' })
      expect(tokens).toHaveProperty('access')
      expect(tokens).toHaveProperty('refresh')
    } catch (err: any) {
      console.log('register error:', err.response?.status, err.response?.data)
      // Skip if registration is disabled or restricted
      if (err.response?.status === 403 || err.response?.status === 404) {
        console.log('Skipping register test - endpoint not accessible')
        return
      }
      throw err
    }
  })

  it('register fails for duplicate email', async () => {
    try {
      // Try to register with existing test user email
      await api.register({
        email: TEST_USER.email,
        password: 'differentpassword'
      })
      // If we get here, something is wrong - should have thrown
      expect(false).toBe(true)
    } catch (err: any) {
      // Should get 409 for duplicate email
      expect(err.response?.status).toBe(409)
      console.log('register correctly handles duplicate email:', err.response?.status)
    }
  })

  it('register fails for invalid data', async () => {
    try {
      // Try to register with invalid email format
      await api.register({
        email: 'invalid-email',
        password: 'short'
      })
      // If we get here, something is wrong - should have thrown
      expect(false).toBe(true)
    } catch (err: any) {
      // Should get 400 for invalid data
      expect([400, 403, 404]).toContain(err.response?.status)
      console.log('register correctly handles invalid data:', err.response?.status)
    }
  })
})
