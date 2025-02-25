import { marked } from 'marked';
export function useTools(){
    const toMarkdown = (content) => {
        return marked(content);
    };

    const cleanMarkdown = (text) => {
        let cleaned = text.replace(/^#+ /gm, '');
        cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, '$1');
        cleaned = cleaned.replace(/\*(.+?)\*/g, '$1');
        cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
        cleaned = cleaned.replace(/`(.+?)`/g, '$1');
        cleaned = cleaned.replace(/^[*-] /gm, '');
        cleaned = cleaned.replace(/^\d+\. /gm, '');
        cleaned = cleaned.replace(/\n+/g, ' ').trim();
        return cleaned;
    };


    const formatDate = (timestamp) => {
        return new Date(parseInt(timestamp)).toLocaleDateString();
    };

    return { toMarkdown, cleanMarkdown, formatDate };
}