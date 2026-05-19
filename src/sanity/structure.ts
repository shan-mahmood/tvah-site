import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .id('homePage')
        .child(
          S.document().schemaType('homePage').documentId('homePage').title('Home page')
        ),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings')
        ),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('doctor').title('Doctors'),
      S.documentTypeListItem('review').title('Reviews'),
    ])
