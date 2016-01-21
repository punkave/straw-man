var apos = require('apostrophe')({
  shortName: 'straw-man',
  modules: {
    'apostrophe-users': {
      groups: [
        {
          title: 'Guest',
          permissions: [ ]
        },
        {
          title: 'Editor',
          permissions: [ 'edit' ]
        },
        {
          title: 'Admin',
          permissions: [ 'admin' ]
        }
      ]
    },
    'apostrophe-assets': {
      stylesheets: [
        {
          name: 'site'
        }
      ]
    },
    'apostrophe-pages': {
      types: [
        {
          name: 'default',
          label: 'Default'
        },
        {
          name: 'blog-posts-page',
          label: 'Blog'
        },
        {
          name: 'home',
          label: 'Home'
        }
      ]
    },
    'blog-posts': {},
    'blog-posts-pages': {
      extend: 'apostrophe-pieces-pages'
    }
  }
});
