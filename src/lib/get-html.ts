import { Config } from './config';
import { getMarkdownIt } from './get-markdown-it-with-highlighter';
import { getMarked } from './get-marked-with-highlighter';

/**
 * Gets a markdown parser based on the configuration
 */
const getMarkdownConverter = (config: Config): ((_: string) => string) => {
	switch (config.markdown_parser) {
		case 'markdown-it': {
			const markdownIt = getMarkdownIt(config.markdown_it_options, config.markdown_it_plugins);
			return markdownIt.render.bind(markdownIt);
		}

		case 'marked':
		default:
			return getMarked(config.marked_options, config.marked_extensions);
	}
};

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 */
export const getHtml = (md: string, config: Config) => `<!DOCTYPE html>
<html>
	<head><title>${config.document_title}</title><meta charset="utf-8"></head>
	<body class="${config.body_class.join(' ')}">
		${getMarkdownConverter(config)(md)}
	</body>
</html>
`;
