import {compile} from "@mdx-js/mdx";
export async function compileMdx(rawMdx) {
    try {
        const compiledMdx = await compile(rawMdx, {outputFormat: 'function-body', development: false});
        return String(compiledMdx);
    } catch (error) {
        throw new Error(`Error compiling MDX content: ${error.message}`);
    }
}
