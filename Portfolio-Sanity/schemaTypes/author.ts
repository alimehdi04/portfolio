import {defineField, defineType} from 'sanity'

const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
        name: 'about',
        title: 'About',
        type: 'string',
      }),
    defineField({
        name: 'image',
        type: 'image',
        title: 'Image',
    })
  ],
})

export default author