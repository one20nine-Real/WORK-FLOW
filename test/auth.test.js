import test from 'node:test'
import assert from 'node:assert/strict'
import { TEAM_GROUPS, validateSignup } from '../src/auth.js'

test('signup requires identity, title, password and a valid team', () => {
  const result = validateSignup({
    name: '홍길동', email: 'hong@example.com', password: 'password123', title: '과장', team: '강북 1팀'
  })
  assert.deepEqual(result, { valid: true, errors: {} })
})

test('signup rejects a team outside the approved team list', () => {
  const result = validateSignup({
    name: '홍길동', email: 'hong@example.com', password: 'password123', title: '과장', team: '임의의 팀'
  })
  assert.equal(result.valid, false)
  assert.equal(result.errors.team, '소속 팀을 선택해주세요.')
})

test('team groups contain the requested sales and SA teams', () => {
  assert.deepEqual(TEAM_GROUPS.영업, ['강북 1팀', '강북 2팀', '강남 1팀', '강남 2팀', '전략 1팀', '전략 2팀', '전략 3팀'])
  assert.deepEqual(TEAM_GROUPS.SA팀, ['DXI-1팀', 'DXI-2팀', 'BS부 SA팀'])
})
