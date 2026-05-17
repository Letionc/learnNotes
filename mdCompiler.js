function compileMdToHtml(markdown) {
    // Split markdown into lines
    let lines = markdown.split('\n');
    let html = '';
    let inList = 0;
    let paragraph = '';

    for (let i = 0; i < lines.length; i++) {
        /**@type {string}*/
        let line_withspace = lines[i];
        let line = line_withspace.trim();
        let line_onlyspace = line_withspace.match(/^\t+/);
        let line_tabcnt = line_onlyspace? (line_onlyspace[0].length + 1): 1;

        if (line === '') {
            // End paragraph or list
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            while (inList) {
                html += '</ul>\n';
                --inList;
            }
            continue;
        }

        // Headers
        if (line.startsWith('# ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            while (inList) {
                html += '</ul>\n';
                --inList;
            }
            html += '<h1 class="preview-theme--custom">' + line.substring(2) + '</h1>\n';
        } else if (line.startsWith('## ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            while (inList) {
                html += '</ul>\n';
                --inList;
            }
            html += '<h2 class="preview-theme--custom">' + line.substring(3) + '</h2>\n';
        } else if (line.startsWith('### ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            while (inList) {
                html += '</ul>\n';
                --inList;
            }
            html += '<h3 class="preview-theme--custom">' + line.substring(4) + '</h3>\n';
        }
        // Lists
        else if (line.startsWith('- ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            while (inList < line_tabcnt) {
                // debugger;
                html += `<ul class="preview-theme--custom">\n`;
                ++inList;
            }
            while (inList > line_tabcnt) {
                html += `</ul>\n`;
                --inList;
            }
            html += '<li class="preview-theme--custom">' + line.substring(2) + '</li>\n';
        }
        // Paragraph
        else {
            while (inList) {
                html += '</ul>\n';
                -- inList;
            }
            if (paragraph) {
                paragraph += ' ' + line;
            } else {
                paragraph = line;
            }
        }
    }

    // Close any open paragraph
    if (paragraph) {
        html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
    }
    while (inList) {
        html += '</ul>\n';
    }

    // Inline formatting
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="preview-theme--custom">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="preview-theme--custom">$1</em>');
    html = html.replace(/`(.*?)`/g, '<code class="preview-theme--custom">$1</code>');
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="preview-theme--custom">$1</a>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="preview-theme--custom">$1</a>');

    return html;
}
