import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MenuOnTheLeft from '../components/MenuOnTheLeft'
import { getArticleInfo } from '../api/zeeguuAPI'

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export default function ArticleReader () {
  let query = useQuery()

  const articleID = query.get('id')

  const [articleInfo, setArticleInfo] = useState()

  useEffect(() => {
    console.log('article with id ....' + articleID)
    getArticleInfo(articleID, data => {
      console.log(data)
      setArticleInfo(data)
    })
  }, [])

  if (!articleInfo) {
    return (
      <div>
        <MenuOnTheLeft />
        '...'
      </div>
    )
  }
  return (
    <div>
      <MenuOnTheLeft />
      <h1>{articleInfo.title}</h1>
      <h4>{articleInfo.authors}</h4>
      <h5>{articleInfo.published}</h5>
      <p>{articleInfo.content}</p>
    </div>
  )
}
