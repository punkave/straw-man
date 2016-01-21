var moment = require('moment');

module.exports = {
  construct: function(self, options) {
    // Build a prettier URL for a blog post by incorporating the publication date. Slugs are
    // unique but this is nicer
    self.buildUrl = function(page, piece) {
      if (!page) {
        return false;
      }

      var url = page._url + '/' + moment(page.publishedAt).format('YYYY/MM/DD') + '/' + piece.slug;
      return url;
    };

    // Allow year/month/day in URLs to work. It's just window dressing; you can
    // also hit a blog post with just the slug, via the self.dispatch call made
    // in the apostrophe-pieces-pages module
    self.dispatch('/:year/:month/:day/:slug', self.showPage);
  }
};
