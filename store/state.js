export default () => ({
  apolloFilters: {
    city: '4'
  },
  activePlaceID: '',
  shwActivePlace: false,
  filters: {
    city: [
      {
        name: 'Warszawa',
        term_id: '2',
        child: [
          {
            name: 'Białołęka',
            term_id: '3'
          },
          {
            name: 'Centrum',
            term_id: '4'
          },
          {
            name: 'Mokotów',
            term_id: '6'
          },
          {
            name: 'Śródmieście',
            term_id: '5'
          },
        ]
      }
    ]
  }
})