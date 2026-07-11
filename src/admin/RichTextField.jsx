// CKEditor 5 wrapper used for rich-text fields in the admin (dev-only code,
// never part of the production bundle). Stores HTML strings in the JSON data.
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  BlockQuote,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import './admin.css'

const config = {
  licenseKey: 'GPL',
  plugins: [Essentials, Paragraph, Heading, Bold, Italic, Underline, Link, List, BlockQuote],
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'link',
    '|',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'undo',
    'redo',
  ],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading3', view: 'h3', title: 'Heading', class: 'ck-heading_heading3' },
    ],
  },
  link: { defaultProtocol: 'https://' },
}

export default function RichTextField({ value, onChange }) {
  return (
    <div className="rich-editor">
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={value || ''}
        onChange={(_, editor) => onChange(editor.getData())}
      />
    </div>
  )
}
