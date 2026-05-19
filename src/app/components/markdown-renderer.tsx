import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold font-display text-foreground mt-8 mb-4 pb-3 border-b-2 border-primary/30" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold font-display text-foreground mt-7 mb-3 pb-2 border-b border-border" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-semibold font-display text-foreground mt-6 mb-3" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-base font-semibold font-display text-foreground mt-4 mb-2" {...props} />,
          h5: ({ node, ...props }) => <h5 className="text-sm font-semibold font-display text-foreground mt-3 mb-2" {...props} />,
          h6: ({ node, ...props }) => <h6 className="text-xs font-semibold font-display text-foreground mt-2 mb-1" {...props} />,
          p: ({ node, children, ...props }) => {
            const hasCodeBlock = React.Children.toArray(children).some(
              (child: any) => child?.props?.className?.includes('language-')
            );
            if (hasCodeBlock) return <div className="my-4">{children}</div>;
            return <p className="text-foreground/85 leading-relaxed mb-4 text-[15px]" {...props}>{children}</p>;
          },
          strong: ({ node, ...props }) => <strong className="font-bold text-foreground" {...props} />,
          em: ({ node, ...props }) => <em className="italic text-foreground/80" {...props} />,
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            if (inline) {
              return <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-mono text-sm font-semibold" {...props}>{children}</code>;
            }
            return (
              <div className="my-4 rounded-xl overflow-hidden border-2 border-border shadow-sm">
                <SyntaxHighlighter style={oneDark} language={match ? match[1] : 'text'} PreTag="div" className="!my-0" customStyle={{ margin: 0, padding: '1.25rem', fontSize: '13px', borderRadius: '0.75rem' }} {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          },
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-500/5 pl-4 pr-4 py-3 my-4 italic text-foreground/70 rounded-r-xl" {...props} />,
          ul: ({ node, ...props }) => <ul className="space-y-1.5 my-4 ml-6 list-disc text-foreground/85 marker:text-primary" {...props} />,
          ol: ({ node, ...props }) => <ol className="space-y-1.5 my-4 ml-6 list-decimal text-foreground/85 marker:text-secondary marker:font-bold" {...props} />,
          li: ({ node, ...props }) => <li className="leading-relaxed pl-1" {...props} />,
          a: ({ node, ...props }) => <a className="text-secondary hover:text-secondary/80 underline underline-offset-2 font-semibold" target="_blank" rel="noopener noreferrer" {...props} />,
          hr: ({ node, ...props }) => <hr className="my-8 border-t-2 border-border" {...props} />,
          table: ({ node, ...props }) => (
            <div className="my-6 overflow-x-auto rounded-xl border-2 border-border shadow-sm">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="bg-card divide-y divide-border" {...props} />,
          tr: ({ node, ...props }) => <tr className="border-b border-border last:border-0" {...props} />,
          th: ({ node, ...props }) => <th className="px-4 py-3 text-left font-bold font-display text-foreground text-sm" {...props} />,
          td: ({ node, ...props }) => <td className="px-4 py-3 text-foreground/80 text-sm" {...props} />,
          img: ({ node, ...props }) => <img className="rounded-xl my-4 max-w-full h-auto shadow-md" {...props} />,
          del: ({ node, ...props }) => <del className="line-through text-muted-foreground" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
