import katex from "katex";

export function renderLatexInHtml(html) {
  // block: $$ ... $$
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (m, latex) => {
    try {
      return katex.renderToString(latex.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return m;
    }
  });

  // inline: \( ... \)
  html = html.replace(/\\\(([\s\S]+?)\\\)/g, (m, latex) => {
    try {
      return katex.renderToString(latex.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return m;
    }
  });

  return html;
}
