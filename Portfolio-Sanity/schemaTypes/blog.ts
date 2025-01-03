import {defineField, defineType} from 'sanity'

const blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, 
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    }),
    defineField({
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [{ type: 'block' }],
    }),
    defineField({
        name: 'createdAt',
        type: 'datetime',
        title: 'Created At',
    }),
    defineField({
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{type: 'author'}]
    })
  ],
})

export default blog