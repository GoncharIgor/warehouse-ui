import create from 'zustand';
import { Article } from '../models';
import {getAllArticles} from "../services/articles";

interface ArticlesStore {
    articles: Article[];
    isLoading: boolean;
    setIsLoadingArticles: (isLoading: boolean) => void;
    setArticles: (articles: Article[]) => void;
    addArticle: (newArticle: Article) => void;
    getArticleById: (id: string) => any;
    fetchArticlesFromServer: () => void;
    updateArticle: (updatedArticle: Article) => void
    bulkUpdate: (articles: Article[]) => void;
    isFetchingArticlesFromApiErrorOccurred: boolean;
    setIsFetchingArticlesFromApiErrorOccurred: (isOccurred: boolean) => void;
}

export const useArticleStore = create<ArticlesStore>((set, get) => ({
    articles: [],
    isLoading: false,
    setIsLoadingArticles: (isLoading: boolean) => {
        set({ isLoading });
    },
    isFetchingArticlesFromApiErrorOccurred: false,
    setArticles: (articles: Article[]) => {
        set({ articles });
    },
    bulkUpdate: (articles: Article[]) => {
        if(!articles.length) return;

        articles.forEach(article => {
            const updateArticle = get().updateArticle;
            updateArticle(article);
        })
    },
    setIsFetchingArticlesFromApiErrorOccurred: (isOccurred: boolean) => {
        set({ isFetchingArticlesFromApiErrorOccurred: true });
    },
    addArticle: (newArticle: Article) => {
        set((store) => ({ articles: [...store.articles, newArticle] }));
    },
    fetchArticlesFromServer: async () => {
        const response = await getAllArticles();
        set({articles: response})
    },
    getArticleById: (articleId: string) => {
        if (!articleId) return null;

        const retrievedArticles = get().articles;
        return retrievedArticles.find((article) => article.id === articleId);
    },
    updateArticle: (updatedArticle: Article) => {
        const retrievedArticles = JSON.parse(JSON.stringify(get().articles)) as Article[];
        const articleToUpdate = retrievedArticles.findIndex(article => article.id === updatedArticle.id);

        retrievedArticles[articleToUpdate] = updatedArticle;
        set({articles: retrievedArticles});
    }
}));
