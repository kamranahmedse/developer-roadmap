const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../data.csv');

const results = {};
const pageSummary = {};

fs.createReadStream(csvFilePath)
  .pipe(
    csv({
      separator: ',',
      mapHeaders: ({ header, index }) =>
        header.toLowerCase().replace(/ /g, '_'),
      mapValues: ({ header, index, value }) => {
        if (header === 'page') {
          return (
            value
              .replace(/"/g, '')
              .replace(/'/g, '')
              .replace(/`/g, '')
              .replace(/\?r=/g, '#r#')
              .replace(/\?.+?$/g, '')
              .replace(/#r#/g, '?r=')
              .replace(/\/$/g, '') || '/'
          );
        }

        if (header !== 'month_of_year') {
          return parseInt(value, 10);
        }

        return value;
      },
    })
  )
  .on('data', (data) => {
    const { page, month_of_year, unique_pageviews, users } = data;
    const pageData = results[page] || {};
    const existingPageMonthData = pageData[month_of_year] || {};

    const existingViews = existingPageMonthData.views || 0;
    const existingUsers = existingPageMonthData.users || 0;

    const newViews = existingViews + unique_pageviews;
    const newUsers = existingUsers + users;

    pageData[month_of_year] = {
      views: newViews,
      users: newUsers,
    };

    results[page] = pageData;

    pageSummary[page] = pageSummary[page] || { views: 0, users: 0 };
    pageSummary[page].views += unique_pageviews;
    pageSummary[page].users += users;
  })
  .on('end', () => {
    const csvHeader = [
      'Page',
      'Jan 2022',
      'Feb 2022',
      'Mar 2022',
      'Apr 2022',
      'May 2022',
      'Jun 2022',
      'Jul 2022',
      'Aug 2022',
      'Sep 2022',
      'Oct 2022',
      'Nov 2022',
      'Dec 2022',
      'Jan 2023',
      'Feb 2023',
      'Mar 2023',
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
      'Oct 2023',
      'Nov 2023',
      'Dec 2023',
    ];

    const csvRows = Object.keys(pageSummary)
      .filter(pageUrl => pageSummary[pageUrl].views > 10)
      .filter(pageUrl => !['/upcoming', '/pdfs', '/signup', '/login', '/@'].includes(pageUrl))
      .sort((pageA, pageB) => {
        const aViews = pageSummary[pageA].views;
        const bViews = pageSummary[pageB].views;

        return bViews - aViews;
      })
      .map((pageUrl) => {
        const rawPageResult = results[pageUrl];
        const pageResultCsvRow = [];

        csvHeader.forEach((csvHeaderItem) => {
          if (csvHeaderItem === 'Page') {
            pageResultCsvRow.push(pageUrl);
            return;
          }

          const csvHeaderItemAlt = csvHeaderItem
            .replace(/ /g, '_')
            .toLowerCase();

          const result = rawPageResult[csvHeaderItem || csvHeaderItemAlt] || {};
          const views = result.views || 0;
          const users = result.users || 0;

          pageResultCsvRow.push(users);
        });

        return pageResultCsvRow;
      });

    const finalCsvRows = [csvHeader, ...csvRows];
    const csvRowStrings = finalCsvRows.map((row) => {
      return row.join(',');
    });

    const csvString = csvRowStrings.join('\n');
    fs.writeFileSync(path.join(__dirname, '../data-agg.csv'), csvString);
  });
