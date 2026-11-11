import fs from 'fs/promises';
import path from 'path';
import matter from "gray-matter";

const ContentDirectory = path.join(process.cwd(), 'content', 'published');

export async function getAllMdxMetadata() {
    try {
        const files = await fs.readdir(ContentDirectory);
        const mdxFiles = files.filter(file => file.endsWith('.mdx'));

        const articles = await Promise.all(
            mdxFiles.map(async (filename) => {
                const filePath = path.join(ContentDirectory, filename);
                const fileContent = await fs.readFile(filePath, 'utf8');
                const { data, excerpt } = matter(fileContent, {
                    excerpt: true,
                    excerpt_separator: '-- excerpt --'
                });

                return {
                    ...data,
                    slug: filename.replace('.mdx', ''),
                    excerpt: excerpt ? excerpt.trim().replace(/\n/g, ' ') : "Read this issue."
                };
            })
        );

        // Safe sort: handle missing or invalid dates by falling back to 0 (epoch)
        return articles.sort((a, b) => {
            const timeA = a.date ? new Date(a.date).getTime() : 0;
            const timeB = b.date ? new Date(b.date).getTime() : 0;
            return timeB - timeA;
        });

    } catch (error) {
        console.error('Failed to load newsletter archive:', error);
        // Preserve the original error message for easier debugging
        throw new Error(`Failed to load newsletter archive: ${error.message}`);
    }
}

export async function getMdxFileBySlug(slug) {
    try {
        // Sanitize the slug to prevent directory traversal attacks (e.g., '../../')
        const safeSlug = path.basename(slug);
        const filePath = path.join(ContentDirectory, `${safeSlug}.mdx`);

        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return { frontmatter: data, rawMdx: content };
    } catch (error) {
        throw new Error(`Error reading MDX file for slug "${slug}": ${error.message}`);
    }
}