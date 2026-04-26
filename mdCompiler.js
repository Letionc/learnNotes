function compileMdToHtml(markdown) {
    // Split markdown into lines
    let lines = markdown.split('\n');
    let html = '';
    let inList = false;
    let paragraph = '';

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line === '') {
            // End paragraph or list
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            continue;
        }

        // Headers
        if (line.startsWith('# ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += '<h1 class="preview-theme--custom">' + line.substring(2) + '</h1>\n';
        } else if (line.startsWith('## ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += '<h2 class="preview-theme--custom">' + line.substring(3) + '</h2>\n';
        } else if (line.startsWith('### ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += '<h3 class="preview-theme--custom">' + line.substring(4) + '</h3>\n';
        }
        // Lists
        else if (line.startsWith('- ')) {
            if (paragraph) {
                html += '<p class="preview-theme--custom">' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (!inList) {
                html += '<ul class="preview-theme--custom">\n';
                inList = true;
            }
            html += '<li class="preview-theme--custom">' + line.substring(2) + '</li>\n';
        }
        // Paragraph
        else {
            if (inList) {
                html += '</ul>\n';
                inList = false;
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
    if (inList) {
        html += '</ul>\n';
    }

    // Inline formatting
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="preview-theme--custom">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="preview-theme--custom">$1</em>');
    html = html.replace(/`(.*?)`/g, '<code class="preview-theme--custom">$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="preview-theme--custom">$1</a>');

    return html;
}
