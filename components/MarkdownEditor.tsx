import { useState } from 'react';

export default function MarkdownEditor() {
  const [content, setContent] = useState('');

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Markdown Editor</h4>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content in Markdown..."
        rows={10}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
      />
      <div className="text-sm text-gray-600">
        <p className="mb-2">Markdown shortcuts:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>**bold**</strong> for bold text</li>
          <li><em>*italic*</em> for italic text</li>
          <li># Heading for headers</li>
          <li>- List item for bullet lists</li>
        </ul>
      </div>
    </div>
  );
}

