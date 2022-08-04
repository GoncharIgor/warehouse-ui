import create from 'zustand';
import { Article } from '../models';

interface ArticlesStore {
    articles: Article[];
    isLoading: boolean;
    setIsLoadingArticles: (isLoading: boolean) => void;
    setArticles: (articles: Article[]) => void;
    addArticle: (newArticle: Article) => void;
    isFetchingArticlesFromApiErrorOccurred: boolean;
    setIsFetchingArticlesFromApiErrorOccurred: (isOccurred: boolean) => void;
    // updateArticle: (updatedArticle: Article) => void
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
    setIsFetchingArticlesFromApiErrorOccurred: (isOccurred: boolean) => {
        set({ isFetchingArticlesFromApiErrorOccurred: true });
    },
    addArticle: (newArticle: Article) => {
        set((store) => ({ articles: [...store.articles, newArticle] }));
    },
    findArticleById: (id: string) => {
        const state = get();
        return state.articles.find((article) => article.id === id);
    }

    /*updateArticle: (updatedArticle: Article) => {
        const state = get();
        const articleToUpdate = state.articles.find(article => article.id === updatedArticle.id);


        set({articles: [...store.articles, newArticle]})
    };*/
}));
