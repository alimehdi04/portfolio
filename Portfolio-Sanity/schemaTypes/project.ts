import {defineField, defineType} from 'sanity'

const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
          }),
          defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
              source: 'title'
            }
          }),
          defineField({
            name: 'description',
            type: 'array',
            title: 'Description',
            of: [{ type: 'block' }]
          }),
          defineField({
            name: 'image',
            type: 'image',
            title: 'Project Image'
          }),
          defineField({
            name: 'projectLink',
            title: 'Project Link',
            type: 'url'
          }),
          defineField({
            name: 'githubLink', 
            title: 'Github Link',
            type: 'url'
          }),
          defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime'
          })
    ],
})

export default project