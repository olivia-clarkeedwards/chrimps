// @ts-nocheck

export function serialize(classInstance) {
  if (classInstance == null || typeof classInstance !== "object") return classInstance

  if (Array.isArray(classInstance)) return classInstance.map(serialize)

  const serialized = {}

  for (const key of Object.keys(classInstance)) {
    serialized[key] = serialize(classInstance[key])
  }
  return serialized
}
