const paginate = (range, defaultSkip = 0, defaultLimit = 10) => {
  let start, end, limit;

  if (!range) {
    start = defaultSkip;
    limit = defaultLimit;
    end = start + limit - 1;
  } else {
    const match = range.match(/\[([0-9]+),([0-9]+)\]/); // extract skip and limit from this format: api/posts?range=[0,10]
    start = parseInt(match[1]);
    end = parseInt(match[2]);
    limit = end + 1;
  }

  return [start, end, limit];
};

const getFilter = query => {
  const { q } = JSON.parse(query);

  if (!q) {
    return {};
  }

  return { $text: { $search: q } };
};

module.exports = {
  paginate,
  getFilter,
};
