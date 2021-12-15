async function fetchGet(path: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_KONTENBASE_API_URL}/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json
}


export async function getPostBySlug(slug: string) {
  const posts: any[] = await fetchGet(`blogs?slug=${slug}`)

  if (posts?.length > 0) {
    return posts[0]
  } else {
    return {}
  } 
}

export async function getAllPosts(fields: string[] = []) {
  const posts: any[] = await fetchGet('blogs')

  if (posts) {
    return posts
  } else {
    return []
  } 
}
