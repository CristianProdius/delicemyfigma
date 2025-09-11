// Helper to render Strapi blocks content
export function renderBlocks(blocks: any): string {
  if (!blocks) return '';
  
  // If it's a string, return it directly
  if (typeof blocks === 'string') return blocks;
  
  // If it's an array of blocks
  if (Array.isArray(blocks)) {
    return blocks
      .map(block => {
        if (block.type === 'paragraph') {
          return `<p>${block.children?.map((child: any) => child.text).join('') || ''}</p>`;
        }
        if (block.type === 'heading') {
          const level = block.level || 2;
          const text = block.children?.map((child: any) => child.text).join('') || '';
          return `<h${level}>${text}</h${level}>`;
        }
        if (block.type === 'list') {
          const tag = block.format === 'ordered' ? 'ol' : 'ul';
          const items = block.children?.map((item: any) => 
            `<li>${item.children?.map((child: any) => child.text).join('') || ''}</li>`
          ).join('') || '';
          return `<${tag}>${items}</${tag}>`;
        }
        // Default: try to extract text
        return block.children?.map((child: any) => child.text).join('') || '';
      })
      .join('');
  }
  
  // If it's an object with text property
  if (blocks.text) return blocks.text;
  
  // Try to stringify it for debugging
  return JSON.stringify(blocks);
}