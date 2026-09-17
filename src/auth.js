export const TEAM_GROUPS = {
  영업: ['강북 1팀', '강북 2팀', '강남 1팀', '강남 2팀', '전략 1팀', '전략 2팀', '전략 3팀'],
  SA팀: ['DXI-1팀', 'DXI-2팀', 'BS부 SA팀']
}

export const TITLES = ['사원', '주임', '대리', '과장', '차장', '부장']
export const ALL_TEAMS = Object.values(TEAM_GROUPS).flat()

export function validateSignup({ name = '', email = '', password = '', title = '', team = '' }) {
  const errors = {}
  if (!name.trim()) errors.name = '이름을 입력해주세요.'
  if (!email.trim() || !email.includes('@')) errors.email = '올바른 이메일을 입력해주세요.'
  if (password.length < 8) errors.password = '비밀번호는 8자 이상이어야 합니다.'
  if (!TITLES.includes(title)) errors.title = '직책을 선택해주세요.'
  if (!ALL_TEAMS.includes(team)) errors.team = '소속 팀을 선택해주세요.'
  return { valid: Object.keys(errors).length === 0, errors }
}
