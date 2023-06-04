import { HttpClient, type GenericErrorModel, type RequestParams } from "@/services/api";
import type { Article, NewArticle, UpdateArticle } from "@/types/article";
import type { LoginUser } from "@/types/auth";
import type { NewComment } from "@/types/comment";
import type { NewUser, Profile, UpdateUser, User } from "@/types/user";

export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description Login for existing user
     *
     * @tags User and Authentication
     * @name Login
     * @summary Existing user login
     * @request POST:/users/login
     */
    login: (
      data: {
        user: LoginUser;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          user: User;
        },
        GenericErrorModel
      >({
        path: `/users/login`,
        method: "POST",
        body: data,
        ...params,
      }),

    /**
     * @description Register a new user
     *
     * @tags User and Authentication
     * @name CreateUser
     * @request POST:/users
     */
    createUser: (
      data: {
        user: NewUser;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          user: User;
        },
        GenericErrorModel
      >({
        path: `/users`,
        method: "POST",
        body: data,
        ...params,
      }),
  };
  user = {
    /**
     * @description Gets the currently logged-in user
     *
     * @tags User and Authentication
     * @name GetCurrentUser
     * @summary Get current user
     * @request GET:/user
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<
        {
          user: User;
        },
        GenericErrorModel
      >({
        path: `/user`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Updated user information for current user
     *
     * @tags User and Authentication
     * @name UpdateCurrentUser
     * @summary Update current user
     * @request PUT:/user
     * @secure
     */
    updateCurrentUser: (
      data: {
        user: UpdateUser;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          user: User;
        },
        GenericErrorModel
      >({
        path: `/user`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),
  };
  profiles = {
    /**
     * @description Get a profile of a user of the system. Auth is optional
     *
     * @tags Profile
     * @name GetProfileByUsername
     * @summary Get a profile
     * @request GET:/profiles/{username}
     */
    getProfileByUsername: (username: string, params: RequestParams = {}) =>
      this.request<
        {
          profile: Profile;
        },
        GenericErrorModel
      >({
        path: `/profiles/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Follow a user by username
     *
     * @tags Profile
     * @name FollowUserByUsername
     * @summary Follow a user
     * @request POST:/profiles/{username}/follow
     * @secure
     */
    followUserByUsername: (username: string, params: RequestParams = {}) =>
      this.request<
        {
          profile: Profile;
        },
        GenericErrorModel
      >({
        path: `/profiles/${username}/follow`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Unfollow a user by username
     *
     * @tags Profile
     * @name UnfollowUserByUsername
     * @summary Unfollow a user
     * @request DELETE:/profiles/{username}/follow
     * @secure
     */
    unfollowUserByUsername: (username: string, params: RequestParams = {}) =>
      this.request<
        {
          profile: Profile;
        },
        GenericErrorModel
      >({
        path: `/profiles/${username}/follow`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  articles = {
    /**
     * @description Get most recent articles from users you follow. Use query parameters to limit. Auth is required
     *
     * @tags Articles
     * @name GetArticlesFeed
     * @summary Get recent articles from users you follow
     * @request GET:/articles/feed
     * @secure
     */
    getArticlesFeed: (
      query?: {
        /**
         * The number of items to skip before starting to collect the result set.
         * @min 0
         */
        offset?: number;
        /**
         * The numbers of items to return.
         * @min 1
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          articles: Article[];
          articlesCount: number;
        },
        GenericErrorModel
      >({
        path: `/articles/feed`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Get most recent articles globally. Use query parameters to filter results. Auth is optional
     *
     * @tags Articles
     * @name GetArticles
     * @summary Get recent articles globally
     * @request GET:/articles
     */
    getArticles: (
      query?: {
        /** Filter by tag */
        tag?: string;
        /** Filter by author (username) */
        author?: string;
        /** Filter by favorites of a user (username) */
        favorited?: string;
        /**
         * The number of items to skip before starting to collect the result set.
         * @min 0
         */
        offset?: number;
        /**
         * The numbers of items to return.
         * @min 1
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          articles: Article[];
          articlesCount: number;
        },
        GenericErrorModel
      >({
        path: `/articles`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Create an article. Auth is required
     *
     * @tags Articles
     * @name CreateArticle
     * @summary Create an article
     * @request POST:/articles
     * @secure
     */
    createArticle: (
      data: {
        article: NewArticle;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          article: Article;
        },
        GenericErrorModel
      >({
        path: `/articles`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Get an article. Auth not required
     *
     * @tags Articles
     * @name GetArticle
     * @summary Get an article
     * @request GET:/articles/{slug}
     */
    getArticle: (slug: string, params: RequestParams = {}) =>
      this.request<
        {
          article: Article;
        },
        GenericErrorModel
      >({
        path: `/articles/${slug}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update an article. Auth is required
     *
     * @tags Articles
     * @name UpdateArticle
     * @summary Update an article
     * @request PUT:/articles/{slug}
     * @secure
     */
    updateArticle: (
      slug: string,
      data: {
        article: UpdateArticle;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          article: Article;
        },
        GenericErrorModel
      >({
        path: `/articles/${slug}`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete an article. Auth is required
     *
     * @tags Articles
     * @name DeleteArticle
     * @summary Delete an article
     * @request DELETE:/articles/{slug}
     * @secure
     */
    deleteArticle: (slug: string, params: RequestParams = {}) =>
      this.request<any, GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get the comments for an article. Auth is optional
     *
     * @tags Comments
     * @name GetArticleComments
     * @summary Get comments for an article
     * @request GET:/articles/{slug}/comments
     */
    getArticleComments: (slug: string, params: RequestParams = {}) =>
      this.request<
        {
          comments: Comment[];
        },
        GenericErrorModel
      >({
        path: `/articles/${slug}/comments`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Create a comment for an article. Auth is required
     *
     * @tags Comments
     * @name CreateArticleComment
     * @summary Create a comment for an article
     * @request POST:/articles/{slug}/comments
     * @secure
     */
    createArticleComment: (
      slug: string,
      data: {
        comment: NewComment;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          comment: Comment;
        },
        GenericErrorModel
      >({
        path: `/articles/${slug}/comments`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete a comment for an article. Auth is required
     *
     * @tags Comments
     * @name DeleteArticleComment
     * @summary Delete a comment for an article
     * @request DELETE:/articles/{slug}/comments/{id}
     * @secure
     */
    deleteArticleComment: (slug: string, id: number, params: RequestParams = {}) =>
      this.request<any, GenericErrorModel>({
        path: `/articles/${slug}/comments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Favorite an article. Auth is required
     *
     * @tags Favorites
     * @name CreateArticleFavorite
     * @summary Favorite an article
     * @request POST:/articles/{slug}/favorite
     * @secure
     */
    createArticleFavorite: (slug: string, params: RequestParams = {}) =>
      this.request<
        {
          article: Article;
        },
        GenericErrorModel
      >({
        path: `/articles/${slug}/favorite`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Unfavorite an article. Auth is required
     *
     * @tags Favorites
     * @name DeleteArticleFavorite
     * @summary Unfavorite an article
     * @request DELETE:/articles/{slug}/favorite
     * @secure
     */
    deleteArticleFavorite: (slug: string, params: RequestParams = {}) =>
      this.request<
        {
          article: Article;
        },
        GenericErrorModel
      >({
        path: `/articles/${slug}/favorite`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  tags = {
    /**
     * @description Get tags. Auth not required
     *
     * @tags Tags
     * @name GetTags
     * @summary Get tags
     * @request GET:/tags
     */
    getTags: (params: RequestParams = {}) =>
      this.request<
        {
          tags: string[];
        },
        GenericErrorModel
      >({
        path: `/tags`,
        method: "GET",
        ...params,
      }),
  };
}
