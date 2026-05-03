import { useEffect } from 'react';

interface PageSeoOptions {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
}

const SITE_NAME = 'Isola Vitale';
const BASE_URL = 'https://isolavitale.com';
const DEFAULT_IMAGE = '/og-default.jpg';

export function usePageSeo({ title, description, image, type = 'website' }: PageSeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:image"]', 'content', image || DEFAULT_IMAGE);
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image || DEFAULT_IMAGE);
  }, [title, description, image, type]);
}
