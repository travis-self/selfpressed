import {defineArrayMember, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  type: 'object',
  title: 'Image Gallery',
  fields: [
    {
      name: 'images',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true, // Makes it accessible directly in the image popup
              },
            },
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
})
