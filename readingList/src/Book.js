function readingStatusCounts() {
  var result = Book.evaluate({
    projection: 'readingStatus, count(id)',
    group: 'readingStatus'
  });

  var rows = [];
  for (var i = 0; i < result.count; i++) {
    var cells = result.tuples[i].cells;
    rows.push({
      readingStatus: cells[0].str,
      count: cells[1].number
    });
  }

  return rows;
}
