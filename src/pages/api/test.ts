import { getCollection } from 'astro:content';

export async function GET() {
  try {
    // 1. Fetch all posts from your 'blog' content collection
    const posts = await getCollection('post');
    
    // 2. Format the data so you only expose what's necessary (optional but recommended)
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.data.title,
      date: post.data.date,
    }));

    // 3. Return the real posts array as JSON
    return new Response(
      JSON.stringify(formattedPosts), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      } 
    );
  } catch (error) {
    // Return a 500 error if something goes wrong reading the files
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Validate content type
    if (request.headers.get("Content-Type") !== "application/json") {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Parse incoming JSON data
    const body = await request.json();
    const { title, description, content, author } = body;

    // 3. Simple field validation
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title and content are mandatory" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Generate a clean URL slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-\$)+/g, '');

    // 5. Create Markdown Frontmatter structure matching standard blog templates
    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(description || '').replace(/"/g, '\\"')}"
pubDate: ${new Date().toISOString().split('T')[0]}
author: "${(author || 'Anonymous').replace(/"/g, '\\"')}"
---

${content}
`;

        // 6. Define where to save the file inside your project
    const targetDir = path.join(process.cwd(), 'src', 'content', 'blog');
    
    // Auto-build any missing folders dynamically
    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, `${slug}.md`);

    // 7. Write the file to your local workspace using the defined filePath
    await fs.writeFile(filePath, fileContent, 'utf-8');


    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Blog post successfully created as ${slug}.md!`,
        slug 
      }), 
      {
        status: 201,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Server failed to process submission", details: error.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}




