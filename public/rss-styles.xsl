<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://w3.org" xmlns:content="http://purl.org">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="https://jsdelivr.net"/>
        <style>
          body { padding: 3rem 1rem; max-width: 750px; margin: 0 auto; background-color: #f8fafc; font-family: system-ui, sans-serif; }
          .hero { background: linear-gradient(135deg, #4f46e5, #3730a3); color: white; padding: 2.5rem; border-radius: 20px; margin-bottom: 3rem; box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.2); }
          .hero h1 { margin: 0 0 0.5rem 0; color: white; font-size: 2.5rem; font-weight: 800; }
          .hero p { margin: 0; color: #e0e7ff; font-size: 1.1rem; }
          article { background: white; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); transition: transform 0.2s; }
          article:hover { transform: translateY(-2px); }
          .post-link { color: #1e1b4b; text-decoration: none; font-weight: 700; font-size: 1.6rem; }
          .post-link:hover { color: #4f46e5; text-decoration: none; }
          .date { font-size: 0.85rem; color: #94a3b8; font-weight: 500; margin: 0.5rem 0 1rem 0; }
          .desc { color: #475569; line-height: 1.6; margin: 0; }
        </style>
      </head>
      <body>
        <div class="hero">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
        </div>
        <main>
          <xsl:for-each select="/rss/channel/item">
            <article>
              <a class="post-link" href="{link}" target="_blank">
                <xsl:value-of select="title"/>
              </a>
              <div class="date"><xsl:value-of select="pubDate"/></div>
              <p class="desc"><xsl:value-of select="description"/></p>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
