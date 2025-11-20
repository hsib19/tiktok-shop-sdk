import { createHighlighter } from 'shiki';
import type { Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Highlight code with Shiki
 * @param code - source code
 * @param lang - language, default "bash"
 * @param theme - theme name, default "nord"
 * @returns HTML string
 */
export async function highlight(code: string, lang = 'bash', theme = 'nord') {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [theme],
			langs: [lang]
		});
	}

	const highlighter = await highlighterPromise;

	return highlighter.codeToHtml(code, { lang, theme });
}
