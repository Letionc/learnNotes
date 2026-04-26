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
                html += '<p>' + paragraph.trim() + '</p>\n';
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
                html += '<p>' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += '<h1>' + line.substring(2) + '</h1>\n';
        } else if (line.startsWith('## ')) {
            if (paragraph) {
                html += '<p>' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += '<h2>' + line.substring(3) + '</h2>\n';
        } else if (line.startsWith('### ')) {
            if (paragraph) {
                html += '<p>' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += '<h3>' + line.substring(4) + '</h3>\n';
        }
        // Lists
        else if (line.startsWith('- ')) {
            if (paragraph) {
                html += '<p>' + paragraph.trim() + '</p>\n';
                paragraph = '';
            }
            if (!inList) {
                html += '<ul>\n';
                inList = true;
            }
            html += '<li>' + line.substring(2) + '</li>\n';
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
        html += '<p>' + paragraph.trim() + '</p>\n';
    }
    if (inList) {
        html += '</ul>\n';
    }

    // Inline formatting
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    return html;
}
