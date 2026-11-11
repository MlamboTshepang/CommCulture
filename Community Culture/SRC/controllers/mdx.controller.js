import {getMdxFileBySlug} from "../services/file.service.js";
import { getAllMdxMetadata } from '../services/file.service.js';
import{compileMdx} from "../services/mdx.service.js";
import readingTime from "reading-time";

//get list of all newsletter issues with metadata and excerpts
export async function getNewsletterArchive(req, res) {
    try {
        const articles = await getAllMdxMetadata();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'its not happening blood' });
    }
}

//get articles by slug, compile the mdx and return the metadata, compiled mdx, reading time and word count
export async function getNewsletterIssue(req, res) {
    try{
        const {frontmatter, rawMdx} = await getMdxFileBySlug(req.params.slug);
        const compiledMdx = await compileMdx(rawMdx);
        const readingStats = readingTime(rawMdx);
        res.json({ 
            metadata: frontmatter, compiledMdx,
            readingtime: readingStats.text, 
            wordcount: readingStats.words});
    }
    catch (error) {
        console.error(`Error fetching newsletter issue: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch newsletter issue' });
    }
}

