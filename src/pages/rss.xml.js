import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('post');
  const publishedPosts = posts.filter(post => !post.data.draft);

  return rss({
    title: 'My Astro Blog',
    description: 'A content-focused website sharing stories and tutorials.',
    site: context.site || 'https://yourdomain.com',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
