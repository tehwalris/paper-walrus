const matchTypeWeights = {
  exactMatch: 1,
  beginningMatch: 0.5,
  otherMatch: 0.2,
}

function findAllSubstringMatches(fullString, target) {
  const matches = [];
  let fromIndex = 0;
  while(true) {
    const foundIndex = fullString.indexOf(target, fromIndex);
    if(foundIndex === -1)
      break;
    const match = {start: foundIndex, end: foundIndex + target.length - 1};
    matches.push(match);
    fromIndex = match.end + 1;
  }
  return matches;
}

export function rankObjectMatch(candidate, target, fieldWeights = {}) {
  let rank = 0;
  const matches = {};
  _.forEach(target, (value, key) => {
    const fieldWeight = fieldWeights[key] || 1;
    if(!target[key])
      return;
    matches[key] = [];
    if(target[key] === candidate[key]) {
      rank += matchTypeWeights.exactMatch * fieldWeight;
      matches[key].push({start: 0, end: target[key].length - 1});
    } else if(candidate[key].startsWith(target[key])) {
      rank += matchTypeWeights.beginningMatch * fieldWeight;
      matches[key].push({start: 0, end: target[key].length - 1});
    } else {
      findAllSubstringMatches(candidate[key], target[key]).forEach(match => {
        rank += matchTypeWeights.otherMatch * fieldWeight;
        matches[key].push(match);
      });
    }
  });
  return {rank, matches};
}
