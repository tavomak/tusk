import { navItems } from '@/utils';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const sitemapBlog = async (req, res) => {
  const staticEsPages = navItems
    .filter((item) => !item.external)
    .map((item) => ({ url: item.path }));

  const staticEnPages = navItems
    .filter((item) => !item.external)
    .map((item) => ({
      url: `en${item.path}`,
    }));

  const staticPages = [...staticEnPages, ...staticEsPages];

  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });

  const xmlString = await streamToPromise(
    Readable.from(staticPages).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};

export default sitemapBlog;
