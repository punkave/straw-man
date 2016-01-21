module.exports = {
  extend: 'apostrophe-pieces',
  name: 'blogPost',
  label: 'Blog Post',
  addFields: [
    {
      name: 'publicationDate',
      label: 'Publication Date',
      type: 'date'
    },
    {
      name: 'publicationTime',
      label: 'Publication Time',
      type: 'time',
      required: false,
      def: null
    },
    {
      name: 'body',
      label: 'Body',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: [ 'Style', 'Bold', 'Italic', 'Link', 'Anchor', 'Unlink' ]
          },
          'apostrophe-images': { size: 'one-half' }
        }
      }
    }
  ],

  construct: function(self, options) {

    // When a blog post is saved in the editor, update the sorting-friendly
    // publishedAt field based on publicationDate and publicationTime
    self.beforeSave = function(req, doc, callback) {
      if (doc.type !== self.name) {
        return setImmediate(callback);
      }
      if (doc.publicationTime === null) {
        // Make sure we specify midnight, if we leave off the time entirely we get
        // midnight UTC, not midnight local time
        doc.publishedAt = new Date(doc.publicationDate + ' 00:00:00');
      } else {
        doc.publishedAt = new Date(doc.publicationDate + ' ' + doc.publicationTime);
      }
      return setImmediate(callback);
    };

    // Override "find" and set a default sort based on publication date/time, typical for blogs
    var superFind = self.find;
    self.find = function(req, criteria, projection) {
      var cursor = superFind(req, criteria, projection);
      cursor.sort(self.options.sort || { publishedAt: -1 });
      return cursor;
    };

  }
};
