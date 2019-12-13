import jsend from 'jsend'

export const success = (res, status) => entity => {
  if (entity) {
    res.status(status || 200).json(jsend.success(entity))
  }
  return null
}

export const error = (res, { code, message, data }, status = 500) =>
  res.status(status).json(jsend.error({ code, message, data }))

export const badRequest = (res, { code, message, data }) => error(res, { code, message, data }, 400)

export const notFound = res => entity => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}
