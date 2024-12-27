export interface PlayerState {
  clickLevel: number
  clickMultiUpgradeCount: number
  dotLevel: number
  dotMultiUpgradeCount: number
  gold: number
  plasma: number
  plasmaSpent: number

  hasInitClickMulti1: boolean
  hasInitClickMulti2: boolean
  hasInitClickMulti3: boolean

  hasInitDotPane: boolean
  hasInitDotMulti1: boolean
  hasInitDotMulti2: boolean
  hasInitDotMulti3: boolean

  startDate: number
  pDamageUpgradeCount: number
  pHealthUpgradeCount: number
}
