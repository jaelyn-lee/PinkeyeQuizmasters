import request from 'superagent'

const rootUrl = '/api/v1/questions'

export async function fetchedQuestions() {
  const res = await request.get(rootUrl)
  return res.body
}
