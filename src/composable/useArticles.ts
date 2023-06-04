import { pageToOffset, api } from 'src/services'
import useArticlesMeta from './useArticlesMeta'
import { ref, watch } from 'vue'
import type { Article } from '@/types/article'
import useAsync from '@/services/use-async'

export function useArticles () {
  const { articlesType, tag, username, metaChanged } = useArticlesMeta()

  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  async function fetchArticles (): Promise<void> {
    articles.value = []
    let responsePromise: null | Promise<{ articles: Article[], articlesCount: number }> = null

    if (articlesType.value === 'my-feed') {
      responsePromise = api.articles.getArticlesFeed(pageToOffset(page.value))
        .then(res => res.data)
    } else if (articlesType.value === 'tag-feed' && tag.value) {
      responsePromise = api.articles.getArticles({ tag: tag.value, ...pageToOffset(page.value) })
        .then(res => res.data)
    } else if (articlesType.value === 'user-feed' && username.value) {
      responsePromise = api.articles.getArticles({ author: username.value, ...pageToOffset(page.value) })
        .then(res => res.data)
    } else if (articlesType.value === 'user-favorites-feed' && username.value) {
      responsePromise = api.articles.getArticles({ favorited: username.value, ...pageToOffset(page.value) })
        .then(res => res.data)
    } else if (articlesType.value === 'global-feed') {
      responsePromise = api.articles.getArticles(pageToOffset(page.value))
        .then(res => res.data)
    }

    if (responsePromise) {
      const response = await responsePromise
      articles.value = response.articles
      articlesCount.value = response.articlesCount
    } else {
      console.error(`Articles type "${articlesType.value}" not supported`)
    }
  }

  const changePage = (value: number): void => {
    page.value = value
  }

  const updateArticle = (index: number, article: Article): void => {
    articles.value[index] = article
  }

  const { active: articlesDownloading, run: runWrappedFetchArticles } = useAsync(fetchArticles)

  watch(metaChanged, async () => {
    if (page.value !== 1) changePage(1)
    else await runWrappedFetchArticles()
  })

  watch(page, runWrappedFetchArticles)

  return {
    fetchArticles: runWrappedFetchArticles,
    articlesDownloading,
    articles,
    articlesCount,
    page,
    changePage,
    updateArticle,
    tag,
    username,
  }
}



