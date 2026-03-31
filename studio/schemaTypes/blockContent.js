import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'external',
                type: 'url',
                title: 'URL',
                hidden: ({parent, value}) => !value && parent?.internal,
              },
              {
                name: 'internal',
                type: 'reference',
                to: [{type: 'post'}],
                hidden: ({parent, value}) => !value && parent?.external,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true, // Makes it accessible directly in the image popup
          },
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineArrayMember({
      name: 'gallery',
      type: 'gallery',
    }),
  ],
})
