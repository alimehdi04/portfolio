import {defineField, defineType} from 'sanity'

const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
      }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
            {   name: 'company', type: 'string', title: 'Company'},
            {   name: 'role', type: 'string', title: 'Role'},
            {   name: 'description', type: 'text', title: 'Description'},
            {   name: 'startDate', type: 'date', title: 'Start Date'},
            {
                name: 'endDate',
                title: 'End Date',
                type: 'object',
                fields: [
                    {
                    name: 'isPresent',
                    title: 'Currently Working Here',
                    type: 'boolean'
                    },
                    {
                    name: 'date',
                    title: 'End Date',
                    type: 'date',
                    hidden: ({parent}) => parent?.isPresent
                    }
                ]
            },
        ]
      }]
    }),
    defineField({
      name: 'roles',
      title: 'Animation Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Roles for type animation (e.g. Full Stack Developer, UI/UX Designer)'
    })
  ]
})

export default profile